/**
 * Performs a depth-first traversal of an object's enumerable properties,
 * calling `cb` for every key and value with the current `obj` context.
 * @param obj - any object with enumerable properties
 * @param cb - receives the key, value, and `obj` for every enumerable property on `obj` and its descendents
 */
export const traverse = (
	obj: any,
	cb: (key: string | number | null, value: any, obj: any) => void,
): void => {
	if (!obj || typeof obj !== 'object') return;
	if ('length' in obj) {
		for (let i = 0, length = obj.length; i < length; i++) {
			const o = obj[i];
			cb(i, o, obj);
			traverse(o, cb);
		}
	} else if (Symbol.iterator in obj) {
		for (const k of obj) {
			const v = obj[k];
			cb(k, v, obj);
			traverse(v, cb);
		}
	} else {
		for (const k in obj) {
			const v = obj[k];
			cb(k, v, obj);
			traverse(v, cb);
		}
	}
};
