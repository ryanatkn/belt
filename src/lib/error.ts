/**
 * Error for asserting unreachable code paths in TypeScript.
 * Useful for exhaustive matching.
 */
export class Unreachable_Error extends Error {
	constructor(value: never, message = `Unreachable case: ${value}`) {
		super(message);
	}
}

/**
 * Beyond terseness, this is useful because `throw` is not an expression,
 * and therefore can't be used in places like Svelte markup without a workaround,
 * at least until this proposal is accepted and widely available:
 * https://github.com/tc39/proposal-throw-expressions
 */
export const unreachable: (value: never, message?: string) => asserts value is never = (
	value,
	message,
) => {
	throw new Unreachable_Error(value, message);
};
