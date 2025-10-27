import {z} from 'zod';

import type {Flavored} from '$lib/types.js';
import type {Logger} from '$lib/log.js';
import {EMPTY_OBJECT} from '$lib/object.js';
import type {Result} from '$lib/result.js';
import {json_stringify_deterministic} from '$lib/json.js';

const DEFAULT_GITHUB_API_ACCEPT_HEADER = 'application/vnd.github+json';
const DEFAULT_GITHUB_API_VERSION_HEADER = '2022-11-28';

export interface Fetch_Value_Options<T_Value, T_Params = undefined> {
	/**
	 * The `request.headers` take precedence over the headers computed from other options.
	 */
	request?: RequestInit;
	params?: T_Params;
	parse?: (v: any) => T_Value;
	token?: string | null;
	cache?: Fetch_Value_Cache | null;
	return_early_from_cache?: boolean; // TODO name?
	log?: Logger;
	fetch?: typeof globalThis.fetch;
}

/**
 * Specializes `fetch` with some slightly different behavior and additional features:
 *
 * - throws on ratelimit errors to mitigate unintentional abuse
 * - optional `parse` function called on the return value
 * - optional cache (different from the browser cache,
 * 	 the caller can serialize it so e.g. dev setups can avoid hitting the network)
 * - optional simplified API for authorization and data types
 *   (you can still provide headers directly)
 *
 * Unlike `fetch`, this throws on ratelimits (status code 429)
 * to halt whatever is happpening in its tracks to avoid accidental abuse,
 * but returns a `Result` in all other cases.
 * Handling ratelimit headers with more sophistication gets tricky because behavior
 * differs across services.
 * (e.g. Mastodon returns an ISO string for `x-ratelimit-reset`,
 * but GitHub returns `Date.now()/1000`,
 * and other services may do whatever, or even use a different header)
 *
 * It's also stateless to avoid the complexity and bugs,
 * so we don't try to track `x-ratelimit-remaining` per domain.
 *
 * If the `value` is cached, only the cached safe subset of the `headers` are returned.
 * (currently just `etag` and `last-modified`)
 * Otherwise the full `res.headers` are included.
 */
export const fetch_value = async <T_Value = any, T_Params = undefined>(
	url: string | URL,
	options?: Fetch_Value_Options<T_Value, T_Params>,
): Promise<Result<{value: T_Value; headers: Headers}, {status: number; message: string}>> => {
	const {
		request,
		params,
		parse,
		token,
		cache,
		return_early_from_cache,
		log,
		fetch = globalThis.fetch,
	} = options ?? EMPTY_OBJECT;

	const url_obj = typeof url === 'string' ? new URL(url) : url;
	const url_str = url_obj.href;

	const method = request?.method ?? (params ? 'POST' : 'GET');

	// local cache?
	let cached;
	let key;
	if (cache) {
		key = to_fetch_value_cache_key(url_str, params, method);
		cached = cache.get(key);
		if (return_early_from_cache && cached) {
			log?.info('[fetch_value] cached locally and returning early', url_str);
			log?.debug('[fetch_value] cached value', cached);
			return {ok: true, value: cached.value, headers: to_cached_headers(cached)};
		}
	}

	const body =
		request?.body ?? (method === 'GET' || method === 'HEAD' ? null : JSON.stringify(params ?? {}));

	const headers = new Headers(request?.headers);
	if (!headers.has('accept')) {
		headers.set(
			'accept',
			url_obj.hostname === 'api.github.com' ? DEFAULT_GITHUB_API_ACCEPT_HEADER : 'application/json',
		);
	}
	if (
		headers.get('accept') === DEFAULT_GITHUB_API_ACCEPT_HEADER &&
		!headers.has('x-github-api-version')
	) {
		headers.set('x-github-api-version', DEFAULT_GITHUB_API_VERSION_HEADER);
	}
	if (body && !headers.has('content-type')) {
		headers.set('content-type', 'application/json');
	}
	if (token && !headers.has('authorization')) {
		headers.set('authorization', 'Bearer ' + token);
	}
	const etag = cached?.etag;
	if (etag && !headers.has('if-none-match')) {
		headers.set('if-none-match', etag);
	} else {
		// fall back to last-modified, ignoring if there's an etag
		const last_modified = cached?.last_modified;
		if (last_modified && !headers.has('if-modified-since')) {
			headers.set('if-modified-since', last_modified);
		}
	}

	const req = new Request(url_obj, {...request, headers, method, body});

	log?.info('[fetch_value] fetching url with headers', url);
	log?.debug('[fetch_value] fetching with headers', print_headers(headers));
	const res = await fetch(req); // don't catch network errors
	log?.info('[fetch_value] fetched', url, res.status, print_ratelimit_headers(res.headers));
	log?.debug('[fetch_value] fetched', Object.fromEntries(res.headers.entries()));

	// throw on ratelimit
	if (res.status === 429) {
		throw Error('ratelimited exceeded fetching url ' + url);
	}

	// return from cache if it hits
	if (res.status === 304) {
		if (!cached) throw Error('unexpected 304 status without a cached value');
		log?.info('[fetch_value] cache hit', url);
		return {ok: true, value: cached.value, headers: to_cached_headers(cached)};
	}

	if (!res.ok) {
		return {ok: false, status: res.status, message: res.statusText};
	}

	const content_type = res.headers.get('content-type');

	const fetched = await (!content_type || content_type.includes('json') ? res.json() : res.text()); // TODO hacky

	const parsed = parse ? parse(fetched) : fetched;
	log?.debug('[fetch_value] fetched json', url, parsed);

	if (key) {
		const result: Fetch_Value_Cache_Item = {
			key,
			url: url_str,
			params,
			value: parsed,
			etag: res.headers.get('etag'),
			last_modified: res.headers.get('etag') ? null : res.headers.get('last-modified'), // fall back to last-modified, ignoring if there's an etag
		};
		cache!.set(key, result);
	}

	return {ok: true, value: parsed, headers: res.headers};
};

/**
 * Returns a subset of headers that are safe to store in a `fetch_value` cache.
 */
const to_cached_headers = (cached: Fetch_Value_Cache_Item): Headers => {
	const headers = new Headers();
	if (cached.etag) {
		headers.set('etag', cached.etag);
	}
	if (cached.last_modified) {
		headers.set('last-modified', cached.last_modified);
	}
	return headers;
};

const print_headers = (headers: Headers): Record<string, string> => {
	const h = Object.fromEntries(headers.entries());
	if (h.authorization) h.authorization = '[REDACTED]';
	return h;
};

const print_ratelimit_headers = (headers: Headers): string => {
	const limit = headers.get('x-ratelimit-limit');
	const remaining = headers.get('x-ratelimit-remaining');
	return limit || remaining ? `ratelimit ${remaining} of ${limit}` : '';
};

export const Fetch_Value_Cache_Key = z.string();
export type Fetch_Value_Cache_Key = Flavored<
	z.infer<typeof Fetch_Value_Cache_Key>,
	'Fetch_Value_Cache_Key'
>;

export const Fetch_Value_Cache_Item = z.object({
	key: Fetch_Value_Cache_Key,
	url: z.string(),
	params: z.any(),
	value: z.any(),
	etag: z.string().nullable(),
	last_modified: z.string().nullable(),
});
export type Fetch_Value_Cache_Item = z.infer<typeof Fetch_Value_Cache_Item>;

export const Fetch_Value_Cache = z.map(Fetch_Value_Cache_Key, Fetch_Value_Cache_Item);
export type Fetch_Value_Cache = z.infer<typeof Fetch_Value_Cache>;

const KEY_SEPARATOR = '::';

export const to_fetch_value_cache_key = (
	url: string,
	params: any,
	method: string,
): Fetch_Value_Cache_Key => {
	let key = method + KEY_SEPARATOR + url;
	if (params != null) {
		key += KEY_SEPARATOR + json_stringify_deterministic(params);
	}
	return key;
};

/**
 * Converts `Fetch_Value_Cache` to a JSON string.
 */
export const serialize_cache = (cache: Fetch_Value_Cache): string =>
	JSON.stringify(Array.from(cache.entries()));

/**
 * Converts a serialized cache string to a `Fetch_Value_Cache`.
 */
export const deserialize_cache = (serialized: string): Fetch_Value_Cache =>
	Fetch_Value_Cache.parse(new Map(JSON.parse(serialized)));
