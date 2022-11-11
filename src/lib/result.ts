/**
 * An alternative pattern to throwing and catching errors.
 * Uses the type system to strongly type error return values when desired.
 * Catching errors is then reserved for unexpected situations.
 */
export type Result<TValue = object, TError = object> =
	| ({ok: true} & TValue)
	| ({ok: false} & TError);

export const OK = Object.freeze({ok: true} as const);
export const NOT_OK = Object.freeze({ok: false} as const);

/**
 * A helper that says,
 * "hey I know this is wrapped in a `Result`, but I expect it to be `ok`,
 * so if it's not, I understand it will throw an error that wraps the result".
 * @param result Some `Result` object.
 * @param message Optional custom error message.
 * @returns The wrapped value.
 */
export const unwrap = <TValue extends {value?: unknown}, TError extends {message?: string}>(
	result: Result<TValue, TError>,
	message?: string,
): TValue['value'] => {
	if (!result.ok) throw new ResultError(result, message);
	return result.value;
};

/**
 * A custom error class that's thrown by `unwrap`.
 * Wraps a failed `Result` with an optional message,
 * and also accepts an optional message that overrides the result's.
 * Useful for generic handling of unwrapped results
 * to forward custom messages and other failed result data.
 */
export class ResultError extends Error {
	static DEFAULT_MESSAGE = 'unknown error';

	constructor(public readonly result: {ok: false; message?: string}, message?: string) {
		super(message || result.message || ResultError.DEFAULT_MESSAGE);
	}
}

/**
 * A helper that does the opposite of `unwrap`, throwing if the `Result` is ok.
 * Note that while `unwrap` returns the wrapped `value`, `unwrapError` returns the entire result.
 * @param result Some `Result` object.
 * @param message Optional custom error message.
 * @returns The type-narrowed result.
 */
export const unwrapError = <TError extends object>(
	result: Result<object, TError>,
	message = 'Failed to unwrap result error',
): {ok: false} & TError => {
	if (result.ok) throw Error(message);
	return result;
};
