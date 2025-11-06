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
				const len = a.length;
				if ((b as any).length !== len) return false;
				for (let i = 0; i < len; i++) {
					if (!deep_equal(a[i], (b as any)[i])) return false;
				}
				return true;
			}

			// Use cached constructor for type checks (faster than instanceof - avoids prototype chain walk)
			if (a_ctor === Set) {
				const a_set = a as Set<unknown>;
				const b_set = b as Set<unknown>;
				if (a_set.size !== b_set.size) return false;
				for (const a_value of a_set) {
					if (!b_set.has(a_value)) return false;
				}
				return true;
			}
			if (a_ctor === Map) {
				const a_map = a as Map<unknown, unknown>;
				const b_map = b as Map<unknown, unknown>;
				if (a_map.size !== b_map.size) return false;
				for (const [key, a_value] of a_map) {
					if (!b_map.has(key) || !deep_equal(a_value, b_map.get(key))) return false;
				}
				return true;
			}
			if (a_ctor === RegExp) {
				const a_re = a as RegExp;
				const b_re = b as RegExp;
				return a_re.source === b_re.source && a_re.flags === b_re.flags;
			}

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

			// Plain objects: compare enumerable own properties
			const a_keys = Object.keys(a);
			if (a_keys.length !== Object.keys(b).length) return false;
			for (const key of a_keys) {
				if (!(key in b)) return false;
				if (!deep_equal((a as any)[key], (b as any)[key])) return false;
			}
			return true;
		}
		default:
			throw new Unreachable_Error(a_type);
	}
};
