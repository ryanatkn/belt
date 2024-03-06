export type Async_Status = 'initial' | 'pending' | 'success' | 'failure';

export const wait = (duration = 0): Promise<void> =>
	new Promise((resolve) => setTimeout(resolve, duration));

export const is_promise = (value: any): value is Promise<any> =>
	value && typeof value.then === 'function';
