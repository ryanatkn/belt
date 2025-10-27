export type Json = Json_Primitive | Json_Object | Json_Array;

export type Json_Primitive = string | number | boolean | null;

export interface Json_Object extends Record<string, Json> {} // eslint-disable-line @typescript-eslint/no-empty-object-type

export interface Json_Array extends Array<Json> {} // eslint-disable-line @typescript-eslint/no-empty-object-type

/**
 * Like `typeof json`, but includes arrays. Excludes `'undefined'` because it's not valid JSON.
 */
export type Json_Type = 'string' | 'number' | 'boolean' | 'null' | 'object' | 'array';

/**
 * Returns the `Json_Type` of `value`, which is like `typeof json`
 * but includes `'array'` and omits `'undefined'`.
 */
export const json_type_of = (value: Json): Json_Type | undefined => {
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
 * Embeds `data` as a JSON string, escaping single quotes.
 * Useful for optimizing JSON in JS because it parses faster.
 */
export const json_embed = <T>(data: T, stringify: (data: T) => string = JSON.stringify): string =>
	`JSON.parse('${stringify(data).replaceAll("'", "\\'").replaceAll('\n', '\\\n')}')`;

/**
 * Serializes a value to JSON with deterministic key ordering.
 * Recursively sorts object keys alphabetically for consistent hashing.
 * Arrays and primitives are serialized as-is.
 *
 * @param value Any JSON-serializable value
 * @returns Deterministic JSON string representation
 */
export const json_stringify_deterministic = (value: unknown): string =>
	JSON.stringify(value, (_key, val) => {
		if (val !== null && typeof val === 'object' && !Array.isArray(val)) {
			const sorted: Record<string, unknown> = {};
			const keys = Object.keys(val).sort();
			for (const k of keys) {
				sorted[k] = val[k];
			}
			return sorted;
		}
		return val;
	});
