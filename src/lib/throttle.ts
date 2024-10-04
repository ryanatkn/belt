import {create_deferred, type Deferred} from './async.js';

export interface Throttle_Options {
	/**
	 * Delay this many milliseconds between the pending call finishing and the next starting.
	 */
	delay?: number;
	leading?: boolean;
	trailing?: boolean;
}

/**
 * Throttles calls to a callback that returns a void promise.
 * Immediately invokes the callback on the first call unless `leading=false`.
 * If the throttled function is called while the promise is already pending,
 * the call is queued to run after the pending promise completes plus `delay`,
 * and only the last call is invoked.
 * In other words, all calls and their args are discarded
 * during the pending window except for the most recent.
 * Unlike debouncing, this calls the throttled callback
 * both on the leading and trailing edges of the delay window by default,
 * and this can be customized by setting `leading` or `trailing.
 * It also differs from a queue where every call to the throttled callback eventually runs.
 * @returns same as `cb`
 */
export const throttle = <T extends (...args: any[]) => Promise<void>>(
	cb: T,
	options?: Throttle_Options,
): T => {
	const delay = options?.delay ?? 0;
	const leading = options?.leading ?? true;
	const trailing = options?.trailing ?? true;

	let pending_promise: Promise<void> | null = null;
	let next_args: any[] | null = null;
	let next_deferred: Deferred<void> | null = null;

	const defer = (args: any[]): Promise<void> => {
		next_args = args;
		if (!next_deferred) {
			next_deferred = create_deferred<void>();
			setTimeout(flush, delay);
		}
		// TODO BLOCK does it make sense to have `void` be generic?
		return next_deferred.promise;
	};

	// TODO BLOCK test to ensure it calls a single time for a single call (not trailing unless called twice)
	const flush = async (): Promise<void> => {
		if (!next_deferred) return;
		const result = await call(next_args!);
		next_args = null;
		const resolve = next_deferred.resolve;
		next_deferred = null;
		resolve(result); // resolve last to prevent synchronous call issues
	};

	const call = (args: any[]): Promise<any> => {
		pending_promise = cb(...args); // TODO accept non-promise-returning functions?
		void pending_promise.finally(() => {
			pending_promise = null;
		});
		return pending_promise;
	};

	return ((...args) => {
		if (pending_promise || !leading) {
			return defer(args);
		} else {
			return call(args);
		}
	}) as T;
};
