import {Unreachable_Error} from '@ryanatkn/belt/error.js';

/**
 * Deep equality comparison that checks both structure and type.
 *
 * Key behaviors:
 * - Compares by constructor to prevent type confusion (security: `{}` ≠ `[]`, `{}` ≠ `new Map()`)
 * - Prevents asymmetry bugs: `deep_equal(a, b)` always equals `deep_equal(b, a)`
 * - Compares only enumerable own properties (ignores prototypes, symbols, non-enumerable)
 * - Special handling for: Date (timestamp), Number/Boolean (boxed primitives), Error (message/name)
 * - Promises always return false (cannot be meaningfully compared)
 * - Maps/Sets compare by reference for object keys/values
 *
 * @param a - First value to compare
 * @param b - Second value to compare
 * @returns true if deeply equal, false otherwise
 */
export const deep_equal = (a: unknown, b: unknown): boolean => {
	if (Object.is(a, b)) return true;

	const a_type = typeof a;
	const b_type = typeof b;

	if (a_type !== b_type) return false;

	switch (a_type) {
		case 'string':
		case 'number':
		case 'bigint':
		case 'boolean':
		case 'symbol':
		case 'undefined':
		case 'function':
			return false;
		case 'object': {
			if (a === null) return b === null;
			if (b === null) return false;

			// Constructor equality check prevents type confusion and ensures symmetry
			// This means: {} ≠ [], {} ≠ new Map(), new ClassA() ≠ new ClassB()
			// Security: prevents structural type confusion in equality checks
			// Cache constructor for reuse in subsequent checks (avoids repeated property access)
			const a_ctor = (a as any).constructor;
			if (a_ctor !== (b as any).constructor) return false;

			// TypedArrays: specialized fast path (no recursion needed - elements are always primitives)
			// ArrayBuffer.isView() catches Uint8Array, Int32Array, Float64Array, etc.
			if (ArrayBuffer.isView(a)) {
				const len = a.length;
				if ((b as any).length !== len) return false;
				// Direct !== comparison - TypedArrays can only contain numbers
				for (let i = 0; i < len; i++) {
					if (a[i] !== (b as any)[i]) return false;
				}
				return true;
			}

			// Regular arrays: inline length check before function call (fast-fail for mismatched lengths)
			// Use Array.isArray() instead of instanceof Array (JIT-optimized, works cross-realm)
			if (Array.isArray(a)) {
				if (a.length !== (b as any).length) return false;
				return deep_equal_arrays(a, b as any);
			}

			// Use cached constructor for type checks (faster than instanceof - avoids prototype chain walk)
			if (a_ctor === Set) return deep_equal_sets(a as Set<unknown>, b as Set<unknown>);
			if (a_ctor === Map) {
				return deep_equal_maps(a as Map<unknown, unknown>, b as Map<unknown, unknown>);
			}
			if (a_ctor === RegExp) return deep_equal_regexps(a as RegExp, b as RegExp);

			// Date objects: compare by timestamp value
			if (a_ctor === Date) {
				// Using Object.is to handle NaN correctly (invalid dates)
				return Object.is((a as Date).getTime(), (b as Date).getTime());
			}

			// Boxed Number objects: compare by primitive value
			if (a_ctor === Number) {
				return Object.is(a!.valueOf(), (b as number).valueOf());
			}

			// Boxed Boolean objects: compare by primitive value
			if (a_ctor === Boolean) {
				return a!.valueOf() === (b as boolean).valueOf();
			}

			// Error objects: compare by message and name
			if (a_ctor === Error) {
				return (
					(a as Error).message === (b as Error).message && (a as Error).name === (b as Error).name
				);
			}

			// Promise objects: cannot be meaningfully compared for deep equality
			if (a_ctor === Promise) {
				return false;
			}

			return deep_equal_objects(a as object, b as object);
		}
		default:
			throw new Unreachable_Error(a_type);
	}
};

export const deep_equal_objects = (a: object, b: object): boolean => {
	const a_keys = Object.keys(a);
	if (a_keys.length !== Object.keys(b).length) return false;
	for (const key of a_keys) {
		if (!(key in b)) return false;
		if (!deep_equal((a as any)[key], (b as any)[key])) return false;
	}
	return true;
};

export const deep_equal_arrays = (a: Array<unknown>, b: Array<unknown>): boolean => {
	if (a.length !== b.length) return false;
	for (let i = 0; i < a.length; i++) {
		if (!deep_equal(a[i], b[i])) return false;
	}
	return true;
};

// Two maps containing deeply equal object keys, but different references,
// are considered not equal to each other.
export const deep_equal_maps = (a: Map<unknown, unknown>, b: Map<unknown, unknown>): boolean => {
	if (a.size !== b.size) return false;
	for (const [key, a_value] of a) {
		if (!b.has(key) || !deep_equal(a_value, b.get(key))) return false;
	}
	return true;
};

// Two sets containing deeply equal objects, but different references,
// are considered not equal to each other.
export const deep_equal_sets = (a: Set<unknown>, b: Set<unknown>): boolean => {
	if (a.size !== b.size) return false;
	for (const a_value of a) {
		if (!b.has(a_value)) return false;
	}
	return true;
};

export const deep_equal_regexps = (a: RegExp, b: RegExp): boolean =>
	a.source === b.source && a.flags === b.flags;
