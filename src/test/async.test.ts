import {test, expect} from 'vitest';

import {wait, create_deferred, map_concurrent, map_concurrent_settled} from '$lib/async.ts';

/* eslint-disable @typescript-eslint/require-await */

test('basic behavior', async () => {
	await wait();
	await wait(10);
});

test('create_deferred - resolves with value', async () => {
	const deferred = create_deferred<number>();
	deferred.resolve(42);
	const result = await deferred.promise;
	expect(result).toBe(42);
});

test('create_deferred - rejects with error', async () => {
	const deferred = create_deferred<number>();
	const error = new Error('test error');
	deferred.reject(error);
	await expect(deferred.promise).rejects.toBe(error);
});

test('create_deferred - promise resolves only once', async () => {
	const deferred = create_deferred<number>();
	deferred.resolve(1);
	deferred.resolve(2); // second resolve is ignored
	const result = await deferred.promise;
	expect(result).toBe(1);
});

test('create_deferred - can be awaited before resolving', async () => {
	const deferred = create_deferred<string>();
	const promise = deferred.promise.then((v) => v + '!');
	setTimeout(() => deferred.resolve('hello'), 10);
	const result = await promise;
	expect(result).toBe('hello!');
});

test('map_concurrent - processes all items', async () => {
	const items = [1, 2, 3, 4, 5];
	const results = await map_concurrent(items, async (x) => x * 2);
	expect(results).toEqual([2, 4, 6, 8, 10]);
});

test('map_concurrent - preserves order with varying delays', async () => {
	const items = [50, 10, 30, 20, 40]; // delays in ms
	const results = await map_concurrent(
		items,
		async (delay, index) => {
			await new Promise((r) => setTimeout(r, delay));
			return index;
		},
		3,
	);
	// Results should be in original order, not completion order
	expect(results).toEqual([0, 1, 2, 3, 4]);
});

test('map_concurrent - respects concurrency limit', async () => {
	let max_concurrent = 0;
	let current_concurrent = 0;

	const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
	await map_concurrent(
		items,
		async (x) => {
			current_concurrent++;
			max_concurrent = Math.max(max_concurrent, current_concurrent);
			await new Promise((r) => setTimeout(r, 10));
			current_concurrent--;
			return x;
		},
		3,
	);

	expect(max_concurrent).toBe(3);
});

test('map_concurrent - handles empty array', async () => {
	const results = await map_concurrent([], async (x: number) => x * 2);
	expect(results).toEqual([]);
});

test('map_concurrent - handles single item', async () => {
	const results = await map_concurrent([42], async (x) => x * 2);
	expect(results).toEqual([84]);
});

test('map_concurrent - fails fast on error', async () => {
	const processed: Array<number> = [];

	await expect(
		map_concurrent(
			[1, 2, 3, 4, 5],
			async (x) => {
				await new Promise((r) => setTimeout(r, 10));
				if (x === 3) throw new Error('test error');
				processed.push(x);
				return x;
			},
			2,
		),
	).rejects.toThrow('test error');

	// Should have processed some items before failing
	// With concurrency 2: items 1,2 start, then 3 starts when one finishes
	expect(processed.length).toBeLessThan(5);
});

test('map_concurrent - throws on invalid concurrency', async () => {
	await expect(map_concurrent([1], async (x) => x, 0)).rejects.toThrow(
		'concurrency must be at least 1',
	);
	await expect(map_concurrent([1], async (x) => x, -1)).rejects.toThrow(
		'concurrency must be at least 1',
	);
});

test('map_concurrent - concurrency 1 is sequential', async () => {
	const order: Array<number> = [];
	const items = [30, 10, 20]; // different delays

	await map_concurrent(
		items,
		async (delay, index) => {
			await new Promise((r) => setTimeout(r, delay));
			order.push(index);
			return index;
		},
		1,
	);

	// With concurrency 1, should process in input order regardless of delay
	expect(order).toEqual([0, 1, 2]);
});

test('map_concurrent - passes index to callback', async () => {
	const items = ['a', 'b', 'c'];
	const results = await map_concurrent(items, async (item, index) => `${item}:${index}`);
	expect(results).toEqual(['a:0', 'b:1', 'c:2']);
});

test('map_concurrent - high concurrency with fewer items', async () => {
	const items = [1, 2, 3];
	const results = await map_concurrent(items, async (x) => x * 2, 100);
	expect(results).toEqual([2, 4, 6]);
});

// map_concurrent_settled tests

test('map_concurrent_settled - collects all results', async () => {
	const items = [1, 2, 3, 4, 5];
	const [results, errors] = await map_concurrent_settled(items, async (x) => x * 2);
	expect(results).toEqual([2, 4, 6, 8, 10]);
	expect(errors).toEqual([]);
});

test('map_concurrent_settled - collects errors without failing', async () => {
	const [results, errors] = await map_concurrent_settled(
		[1, 2, 3, 4, 5],
		async (x) => {
			if (x === 2 || x === 4) throw new Error(`error ${x}`);
			return x * 2;
		},
		2,
	);

	expect(results[0]).toBe(2);
	expect(results[1]).toBeUndefined();
	expect(results[2]).toBe(6);
	expect(results[3]).toBeUndefined();
	expect(results[4]).toBe(10);

	expect(errors).toHaveLength(2);
	expect(errors.map((e) => e.index).sort()).toEqual([1, 3]); // eslint-disable-line @typescript-eslint/require-array-sort-compare
});

test('map_concurrent_settled - preserves order with varying delays', async () => {
	const items = [50, 10, 30, 20, 40];
	const [results] = await map_concurrent_settled(
		items,
		async (delay, index) => {
			await new Promise((r) => setTimeout(r, delay));
			return index;
		},
		3,
	);
	expect(results).toEqual([0, 1, 2, 3, 4]);
});

test('map_concurrent_settled - handles empty array', async () => {
	const [results, errors] = await map_concurrent_settled([], async (x: number) => x);
	expect(results).toEqual([]);
	expect(errors).toEqual([]);
});

test('map_concurrent_settled - throws on invalid concurrency', async () => {
	await expect(map_concurrent_settled([1], async (x) => x, 0)).rejects.toThrow(
		'concurrency must be at least 1',
	);
});

test('map_concurrent_settled - all items fail', async () => {
	const [results, errors] = await map_concurrent_settled(
		[1, 2, 3],
		async (x) => {
			throw new Error(`error ${x}`);
		},
		2,
	);

	expect(results).toEqual([undefined, undefined, undefined]);
	expect(errors).toHaveLength(3);
});

// Additional edge case tests

test('map_concurrent - handles undefined results correctly', async () => {
	const results = await map_concurrent([1, 2, 3], async () => undefined);
	expect(results).toEqual([undefined, undefined, undefined]);
	expect(results).toHaveLength(3);
});

test('map_concurrent - handles null results correctly', async () => {
	const results = await map_concurrent([1, 2, 3], async () => null);
	expect(results).toEqual([null, null, null]);
});

test('map_concurrent - preserves error object', async () => {
	const custom_error = new Error('custom');
	(custom_error as any).code = 'ENOENT';

	try {
		await map_concurrent([1], async () => {
			throw custom_error;
		});
		expect.fail('should have thrown');
	} catch (err) {
		expect(err).toBe(custom_error);
		expect(err.code).toBe('ENOENT');
	}
});

test('map_concurrent - error on first item', async () => {
	const processed: Array<number> = [];

	await expect(
		map_concurrent(
			[1, 2, 3],
			async (x) => {
				if (x === 1) throw new Error('first item error');
				processed.push(x);
				return x;
			},
			1,
		),
	).rejects.toThrow('first item error');

	// With concurrency 1, should not process any items after the first fails
	expect(processed).toEqual([]);
});

test('map_concurrent - error on last item', async () => {
	const processed: Array<number> = [];

	await expect(
		map_concurrent(
			[1, 2, 3],
			async (x) => {
				if (x === 3) throw new Error('last item error');
				processed.push(x);
				return x;
			},
			1,
		),
	).rejects.toThrow('last item error');

	expect(processed).toEqual([1, 2]);
});

test('map_concurrent - items.length equals concurrency', async () => {
	let max_concurrent = 0;
	let current_concurrent = 0;

	const items = [1, 2, 3];
	const results = await map_concurrent(
		items,
		async (x) => {
			current_concurrent++;
			max_concurrent = Math.max(max_concurrent, current_concurrent);
			await new Promise((r) => setTimeout(r, 10));
			current_concurrent--;
			return x * 2;
		},
		3, // same as items.length
	);

	expect(results).toEqual([2, 4, 6]);
	expect(max_concurrent).toBe(3);
});

test('map_concurrent - handles synchronous throw in async function', async () => {
	await expect(
		map_concurrent([1, 2, 3], async (x) => {
			if (x === 2) {
				// Synchronous throw, not a rejection
				throw new Error('sync throw');
			}
			return x;
		}),
	).rejects.toThrow('sync throw');
});

test('map_concurrent_settled - preserves error objects', async () => {
	const custom_error = new Error('custom');
	(custom_error as any).code = 'CUSTOM_CODE';

	const [, errors] = await map_concurrent_settled([1], async () => {
		throw custom_error;
	});

	expect(errors).toHaveLength(1);
	expect(errors[0]!.error).toBe(custom_error);
	expect((errors[0]!.error as any).code).toBe('CUSTOM_CODE');
});

test('map_concurrent_settled - error indices are correct with varying delays', async () => {
	const [, errors] = await map_concurrent_settled(
		[1, 2, 3, 4, 5],
		async (x) => {
			// Items 2 and 4 fail, but 4 completes before 2 due to shorter delay
			if (x === 2) {
				await new Promise((r) => setTimeout(r, 50));
				throw new Error('error 2');
			}
			if (x === 4) {
				await new Promise((r) => setTimeout(r, 10));
				throw new Error('error 4');
			}
			return x;
		},
		5,
	);

	// Error indices should reflect original array positions, not completion order
	const error_indices = errors.map((e) => e.index).sort(); // eslint-disable-line @typescript-eslint/require-array-sort-compare
	expect(error_indices).toEqual([1, 3]); // indices of items 2 and 4
});

test('map_concurrent_settled - respects concurrency limit', async () => {
	let max_concurrent = 0;
	let current_concurrent = 0;

	await map_concurrent_settled(
		[1, 2, 3, 4, 5, 6],
		async () => {
			current_concurrent++;
			max_concurrent = Math.max(max_concurrent, current_concurrent);
			await new Promise((r) => setTimeout(r, 10));
			current_concurrent--;
		},
		2,
	);

	expect(max_concurrent).toBe(2);
});
