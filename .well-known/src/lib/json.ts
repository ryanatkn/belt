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
