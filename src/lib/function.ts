/**
 * Does nothing when called.
 */
export const noop: (...args: any[]) => any = () => {}; // eslint-disable-line @typescript-eslint/no-empty-function

/**
 * Async function that returns a resolved promise.
 */
export const noop_async: (...args: any[]) => Promise<any> = () => resolved;

/**
 * A singleton resolved `Promise`.
 */
export const resolved = Promise.resolve();

/**
 * Returns the first arg.
 */
export const identity = <T>(t: T): T => t;

export type Lazy<T> = () => T;

/**
 * Returns the result of calling `value` if it's a function,
 * otherwise it's like the `identity` function and passes it through.
 */
export const lazy = <T>(value: T | Lazy<T>): T =>
	typeof value === 'function' ? (value as any)() : value; // TODO rename? `call_if_function` something?
