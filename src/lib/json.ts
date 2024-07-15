import {is_plain_object} from '$lib/object.js';

export type Json = string | number | boolean | null | {[prop: string]: Json} | Json[];

export type Json_Type = 'string' | 'number' | 'boolean' | 'null' | 'object' | 'array';

export const to_json_type = (value: Json): Json_Type | undefined => {
	const type = typeof value;
	switch (type) {
		case 'string':
		case 'number':
		case 'boolean':
			return type;
		case 'object': {
			return value === null ? 'null' : Array.isArray(value) ? 'array' : 'object';
		}
		default: {
			// "undefined" | "function" | "bigint" | "symbol"
			return undefined;
		}
	}
};

/**
 * Converts `value` to a best-effort canonicalized version, so objects have their keys sorted.
 * Expected to be JSON and may fail for other datatypes.
 */
export const canonicalize = <T extends Json>(value: T): T => {
	if (!value || !is_plain_object(value)) {
		return value;
	}
	return Object.fromEntries(
		Object.entries(value)
			.sort((a, b) => (a[0] > b[0] ? 1 : -1))
			.map(([k, v]) => [k, canonicalize(v)]),
	) as any;
};

/**
 * Embeds `data` as a JSON string, escaping single quotes.
 * Useful for optimizing JSON in JS because it parses faster.
 */
export const embed_json = <T>(data: T, stringify: (data: T) => string = JSON.stringify): string =>
	`JSON.parse('${stringify(data).replaceAll("'", "\\'").replaceAll('\\n', '\\\n')}')`;
