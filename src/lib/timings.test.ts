import {test, assert} from 'vitest';

import {create_stopwatch, Timings} from '$lib/timings.ts';

test('stopwatch', () => {
	const stopwatch = create_stopwatch(4);
	const elapsed = stopwatch();
	assert.ok(elapsed.toString().split('.')[1].length <= 4);
});

test('start and stop multiple overlapping timings', () => {
	const timings = new Timings(4);
	const timing = timings.start('foo');
	const timing2 = timings.start('foo');
	timings.start('foo_3');
	assert.strictEqual(Array.from(timings.entries()).length, 3);
	timing();
	timing();
	timing2();
	timing2();
	const elapsed = timings.get('foo');
	timings.get('bar');
	assert.ok(elapsed.toString().split('.')[1].length <= 4);
	assert.deepEqual(
		Array.from(timings.entries(), (e) => e[0]),
		['foo', 'foo_2', 'foo_3'],
	);
});

test('merge timings', () => {
	const a = new Timings(10);
	const b = new Timings(10);
	const timingA = a.start('test');
	const aTiming = timingA();
	assert.ok(aTiming);
	const timingB = b.start('test');
	const bTiming = timingB();
	assert.ok(bTiming);
	a.merge(b);
	assert.strictEqual(a.get('test'), aTiming + bTiming);
	assert.strictEqual(b.get('test'), bTiming);
});
