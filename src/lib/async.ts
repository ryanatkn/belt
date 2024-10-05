export type Async_Status = 'initial' | 'pending' | 'success' | 'failure';

export const wait = (duration = 0): Promise<void> =>
	new Promise((resolve) => setTimeout(resolve, duration));

export const is_promise = (value: any): value is Promise<any> =>
	value && typeof value.then === 'function';

export interface Deferred<T> {
	promise: Promise<T>;
	resolve: (value: T) => void;
	reject: (reason: any) => void;
}

export const create_deferred = <T>(): Deferred<T> => {
	let resolve!: (value: T) => void;
	let reject!: (reason: any) => void;
	const promise: Promise<T> = new Promise((res, rej) => {
		resolve = res;
		reject = rej;
	});
	return {promise, resolve, reject};
};
