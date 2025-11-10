import {round} from '$lib/maths.js';

export type Stopwatch = (reset?: boolean) => number;

/**
 * Tracks elapsed time in milliseconds.
 */
export const create_stopwatch = (decimals = 2): Stopwatch => {
	let start = performance.now();
	return (reset = false) => {
		const end = performance.now();
		const elapsed = round(Number(end - start), decimals); // eslint-disable-line @typescript-eslint/no-unnecessary-type-conversion
		if (reset) start = end;
		return elapsed;
	};
};

export type Timings_Key = string | number;

/**
 * Tracks and manages multiple timing operations.
 * Allows starting, stopping, and retrieving timings with optional precision.
 */
export class Timings {
	readonly decimals: number | undefined;

	private readonly timings: Map<Timings_Key, number | undefined> = new Map();
	private readonly stopwatches: Map<Timings_Key, Stopwatch> = new Map();

	constructor(decimals?: number) {
		this.decimals = decimals;
	}

	/**
	 * Starts a timing operation for the given key.
	 */
	start(key: Timings_Key, decimals = this.decimals): () => number {
		const final_key = this.next_key(key);
		this.stopwatches.set(final_key, create_stopwatch(decimals));
		this.timings.set(final_key, undefined); // initializing to preserve order
		return () => this.stop(final_key);
	}

	private next_key(key: Timings_Key): Timings_Key {
		if (!this.stopwatches.has(key)) return key;
		let i = 2;
		while (true) {
			const next = key + '_' + i++;
			if (!this.stopwatches.has(next)) return next;
		}
	}

	/**
	 * Stops a timing operation and records the elapsed time.
	 */
	private stop(key: Timings_Key): number {
		const stopwatch = this.stopwatches.get(key);
		if (!stopwatch) return 0; // TODO maybe warn?
		this.stopwatches.delete(key);
		const timing = stopwatch();
		this.timings.set(key, timing);
		return timing;
	}

	get(key: Timings_Key): number {
		const timing = this.timings.get(key);
		if (timing === undefined) return 0; // TODO maybe warn?
		return timing;
	}

	entries(): IterableIterator<[Timings_Key, number | undefined]> {
		return this.timings.entries();
	}

	/**
	 * Merges other timings into this one,
	 * adding together values with identical keys.
	 */
	merge(timings: Timings): void {
		for (const [key, timing] of timings.entries()) {
			this.timings.set(
				key,
				timing === undefined ? undefined : (this.timings.get(key) ?? 0) + timing,
			);
		}
	}

	// clear(): void {
	// 	this.stopwatches.clear();
	// 	this.timings.clear();
	// }
	// toJSON() {} ?????
}
