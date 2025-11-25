/**
 * Error for asserting unreachable code paths in TypeScript.
 * Useful for exhaustive matching.
 */
export class UnreachableError extends Error {
	constructor(value: never, message = `Unreachable case: ${value}`, options?: ErrorOptions) {
		super(message, options);
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
	throw new UnreachableError(value, message);
};
