import type {OmitStrict} from './types.js';

// Iterated keys in `for..in` are always returned as strings,
// so to prevent usage errors the key type of `mapper` is always a string.
// Symbols are not enumerable as keys, so they're excluded.
export const mapRecord = <T, K extends string | number, U>(
	obj: Record<K, T>,
	mapper: (value: T, key: string) => U,
): Record<K, U> => {
	const result = {} as Record<K, U>;
	for (const key in obj) {
		result[key] = mapper(obj[key], key);
	}
	return result;
};

export const omit = <T extends Record<K, any>, K extends keyof T>(
	obj: T,
	keys: K[],
): OmitStrict<T, K> => {
	const result = {} as T;
	for (const key in obj) {
		if (!keys.includes(key as any)) {
			result[key] = obj[key];
		}
	}
	return result;
};

export const pickBy = <T extends Record<K, any>, K extends string | number>(
	obj: T,
	shouldPick: (value: any, key: K) => boolean,
): Partial<T> => {
	const result = {} as Partial<T>;
	for (const key in obj) {
		const value = obj[key];
		if (shouldPick(value, key as any)) {
			result[key] = value;
		}
	}
	return result;
};

/**
 * `omitUndefined` is a commonly used form of `pickBy`.
 * See this issue for why it's used so much:
 * https://github.com/Microsoft/TypeScript/issues/13195
 * @param obj
 * @returns `obj` with all `undefined` properties removed
 */
export const omitUndefined = <T extends Record<string | number, any>>(obj: T): T =>
	pickBy(obj, (v) => v !== undefined) as T;

/**
 * A more explicit form of `{putThisFirst: obj.putThisFirst, ...obj}`.
 * @param obj
 * @param keys
 * @returns
 */
export const reorder = <T extends Record<K, any>, K extends string | number>(
	obj: T,
	keys: K[],
): T => {
	const result = {} as T;
	for (const k of keys) result[k] = obj[k];
	// overwriting is probably faster than using
	// a `Set` to track what's already been added
	for (const k in obj) result[k] = obj[k];
	return result;
};

export const EMPTY_OBJECT: Record<string | number | symbol, any> & object = Object.freeze({});

/**
 * Performs a depth-first traversal of an object's enumerable properties,
 * calling `cb` for every key and value with the current `obj` context.
 * @param obj Any object with enumerable properties.
 * @param cb Receives the key, value, and `obj` for every enumerable property on `obj` and its descendents.
 * @returns
 */
export const traverse = (obj: any, cb: (key: string, value: any, obj: any) => void): void => {
	if (!obj || typeof obj !== 'object') return;
	for (const k in obj) {
		const v = obj[k];
		cb(k, v, obj);
		traverse(v, cb);
	}
};
