export class Unreachable_Error extends Error {
	constructor(value: never, message = `Unreachable case: ${value}`) {
		super(message);
	}
}

/**
 * This is useful because `throw` is not an expression,
 * and therefore can't be used in places like Svelte markup without a workaround.
 * Made obsolete by this proposal: https://github.com/tc39/proposal-throw-expressions
 */
export const unreachable = (value: never, message?: string): any => {
	throw new Unreachable_Error(value, message);
};
