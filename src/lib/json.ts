import {is_plain_object} from '$lib/object.js';

export type Json = Json_Primitive | Json_Object | Json_Array;

export type Json_Primitive = string | number | boolean | null;

export interface Json_Object extends Record<string, Json> {} // eslint-disable-line @typescript-eslint/no-empty-object-type

export interface Json_Array extends Array<Json> {} // eslint-disable-line @typescript-eslint/no-empty-object-type

/**
 * Like `typeof json`, but includes arrays. Excludes `'undefined'` because it's not valid JSON.
 */
export type Json_Type = 'string' | 'number' | 'boolean' | 'null' | 'object' | 'array';

/**
 * Converts `value` to a `Json_Type`, which is like `typeof json`
 * but includes `'arrays'` and omits `'undefined'`.
 */
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
	`JSON.parse('${stringify(data).replaceAll("'", "\\'").replaceAll('\n', '\\\n')}')`;

// 	const jsonString = stringify(data)
// 		.replace(/\\/g, '\\\\')
// 		.replace(/'/g, "\\'")
// 		.replace(/\n/g, '\\n')
// 		.replace(/\r/g, '\\r')
// 		.replace(/\t/g, '\\t');

// 	return `JSON.parse('${jsonString}')`;
// };
