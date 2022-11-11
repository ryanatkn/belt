export type Json = string | number | boolean | null | {[prop: string]: Json} | Json[];

export type JsonType = 'string' | 'number' | 'boolean' | 'null' | 'object' | 'array';

export const getJsonType = (value: Json): JsonType | undefined => {
	const valueType = typeof value;
	switch (valueType) {
		case 'string':
		case 'number':
		case 'boolean':
			return valueType;
		case 'object': {
			return value === null ? 'null' : Array.isArray(value) ? 'array' : 'object';
		}
		default: {
			// "undefined" | "function" | "bigint" | "symbol"
			return undefined;
		}
	}
};
