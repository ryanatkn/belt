export const noop: (...args: any[]) => any = () => {}; // eslint-disable-line @typescript-eslint/no-empty-function

export const noop_async: (...args: any[]) => Promise<any> = () => resolved;

export const resolved = Promise.resolve();

export const identity = <T>(t: T): T => t;

export type Lazy<T> = () => T;

export const lazy = <T>(value: T | Lazy<T>): T =>
	typeof value === 'function' ? (value as any)() : value;
