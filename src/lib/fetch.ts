import {z} from 'zod';
import {Url} from '@grogarden/gro/paths.js';
import type {Flavored} from '@grogarden/util/types.js';

import type {Logger} from './log.js';
import {EMPTY_OBJECT} from './object.js';
import type {Result} from './result.js';

// TODO BLOCK should we cache the data parsed or raw? I think it's a little more convenient to have it be raw, but at what cost/complexity? means you also need the schema to lookup
// TODO BLOCK replace `fetch_json`, `fetch_quirky`, and `github_fetch_commit_prs`

export interface Fetch_Options<T_Schema extends z.ZodTypeAny | undefined = undefined> {
	/**
	 * The `request.headers` take precedence over the headers computed from other options.
	 */
	request?: RequestInit; // TODO BLOCK or make this a second arg?
	schema?: T_Schema;
	token?: string;
	type?: Fetch_Type;
	cache?: Fetch_Cache_Data; // TODO BLOCK Mastodon_Cache
	log?: Logger;
	fetch?: typeof globalThis.fetch;
}

export type Fetch_Type = 'json' | 'text' | 'html'; // TODO arrayBuffer()/ArrayBuffer, blob()/Blob, formData()/FormData

/*

caching behaviors

- gro: return early by url, update the cache from the result
- orc: always make request, send etag/last_modified, return cached if 304
- fuz_mastodon: return early by url, and don't update the cache, is a caller concern

*/

/**
 * Extends `fetch` with some slightly different behavior and additional features:
 *
 * - optional Zod schema parsing
 * - optional cache (different from the browser cache,
 * 	 the caller can serialize it so e.g. dev setups can avoid hitting the network)
 * - optional simplified API for authorization and data types (you can still provide headers directly)
 * - throws on ratelimit errors to mitigate unintentional abuse
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
 */
export const fetch_quirky = async <T_Schema extends z.ZodTypeAny | undefined = undefined>(
	url: string, // TODO probably want to support `string | Request` like `fetch`, but then does `options.request` need to be ignored? maybe just error if both
	options?: Fetch_Options<T_Schema>,
): Promise<Result<T_Schema, {status: number; message: string}>> => {
	const {
		request,
		schema,
		token,
		type = 'json',
		cache,
		log,
		fetch = globalThis.fetch,
	} = options ?? EMPTY_OBJECT;

	// local cache?
	const cached = cache?.get(url);
	if (cached) {
		log?.info('[fetch_quirky] cached', cached);
		return Promise.resolve(cached.data);
	}

	// TODO BLOCK what's the logic from returning early from the cache? maybe if there's no etag/last_modified?
	// was returned early by `github_fetch_commit_prs`

	// TODO BLOCK add other headers for the GitHub API like the version?

	const headers = new Headers(request?.headers);
	if (!headers.has('accept')) {
		const accept = to_accept_header(url, type);
		if (accept) headers.set('accept', accept);
	}
	if (token && !headers.has('authorization')) {
		headers.set('authorization', 'Bearer ' + token);
	}
	const key = to_fetch_cache_key(url, null);
	const cached = cache?.get(key);
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

	log?.info('[fetch_quirky] fetching url with headers', url, Object.fromEntries(headers.entries())); // TODO BLOCK logs the token - helper?
	const res = await fetch(url, {...request, headers}); // don't catch network errors
	log?.info('[fetch_quirky] fetched res', url, res);

	const h = Object.fromEntries(res.headers.entries());
	log?.info('[fetch_quirky] fetched headers', url, h);

	// throw on ratelimit
	if (res.status === 429) {
		throw Error('ratelimited exceeded fetching url ' + url);
	}

	if (!res.ok) {
		return {ok: false, status: res.status, message: res.statusText};
	}

	if (res.status === 304) {
		return cached.data; // TODO BLOCK how to handle 304s when we don't actually have a cached value?
	}

	const fetched = await (type === 'json' ? res.json() : res.text());
	const parsed = schema ? schema.parse(fetched) : fetched;
	log?.info('[fetch_quirky] fetched json', url, parsed);
	// responses.push({url, data: parsed}); // TODO history

	const result: Fetch_Cache_Item = {
		url,
		params: null, // TODO BLOCK method, body (rename params->body probably)
		key,
		etag: res.headers.get('etag'),
		last_modified: res.headers.get('etag') ? null : res.headers.get('last-modified'), // fall back to last-modified, ignoring if there's an etag
		data: parsed, // TODO BLOCK store raw result, or parsed? currently mismatched
	};
	cache?.set(result.key, result);

	return parsed;
};

const to_accept_header = (url: string, type: Fetch_Type): string | undefined => {
	if (type === 'html') {
		return 'text/html';
	} else if (type === 'text') {
		return 'text/plain';
	} else if (type === 'json') {
		if (new URL(url).hostname === 'api.github.com') {
			return 'application/vnd.github+json';
		} else {
			return 'application/json';
		}
	}
	return undefined;
};

export interface Fetch_Cache {
	name: string;
	data: Fetch_Cache_Data; // TODO probably expose an API for this instead of passing the map directly
	/**
	 * @returns a boolean indicating if anything changed, returns `false` if it was a no-op
	 */
	save: () => Promise<boolean>;
}

export const Fetch_Cache_Key = z.string();
export type Fetch_Cache_Key = Flavored<z.infer<typeof Fetch_Cache_Key>, 'Fetch_Cache_Key'>;

export type Fetch_Cache_Data = Map<Fetch_Cache_Key, Fetch_Cache_Item>;

export const Fetch_Cache_Item = z.object({
	url: Url,
	// TODO BLOCK rename to `body`?
	params: z.any(), // TODO object | null?
	key: Fetch_Cache_Key,
	etag: z.string().nullable(),
	last_modified: z.string().nullable(),
	data: z.any(), // TODO type?
});
// TODO use `z.infer<typeof Fetch_Cache_Item>`, how with generic?
export interface Fetch_Cache_Item<T_Data = any, T_Params = any> {
	url: Url;
	params: T_Params;
	key: Fetch_Cache_Key;
	etag: string | null;
	last_modified: string | null;
	data: T_Data;
}

export const CACHE_KEY_SEPARATOR = '::';

// TODO canonical form to serialize params, start by sorting object keys
export const to_fetch_cache_key = (url: Url, params: any, method = 'get'): Fetch_Cache_Key =>
	method + CACHE_KEY_SEPARATOR + url + CACHE_KEY_SEPARATOR + JSON.stringify(params);

export const serialize_cache = (cache: Fetch_Cache_Data): string =>
	JSON.stringify(Array.from(cache.values()));

// TODO generic serialization, these are just maps
export const deserialize_cache = (serialized: string): Fetch_Cache_Data => {
	// TODO maybe take a `data_schema` param and `Fetch_Cache_Item.extend({data: data_schema}).parse(...)`
	const parsed: Fetch_Cache_Item[] = JSON.parse(serialized).map((v: any) =>
		Fetch_Cache_Item.parse(v),
	);
	return new Map(parsed.map((v) => [v.key, v]));
};
