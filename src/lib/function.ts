export const noop: (...args: any[]) => void = () => {}; // eslint-disable-line @typescript-eslint/no-empty-function

export const identity = <T>(t: T): T => t;

export interface Lazy<T> {
	(): T;
}

export const lazy = <T>(value: T | Lazy<T>): T =>
	typeof value === 'function' ? (value as any)() : value;
