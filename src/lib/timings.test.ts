import {suite} from 'uvu';
import * as assert from 'uvu/assert';

import {createStopwatch, Timings} from './timings.js';

/* test__createStopwatch */
const test__createStopwatch = suite('createStopwatch');

test__createStopwatch('basic behavior', () => {
	const stopwatch = createStopwatch(4);
	const elapsed = stopwatch();
	assert.ok(elapsed.toString().split('.')[1].length <= 4);
});

test__createStopwatch.run();
/* test__createStopwatch */

/* test__Timings */
const test__Timings = suite('Timings');

test__Timings('start and stop', () => {
	const timings = new Timings<'foo' | 'bar'>(4);
	const timing = timings.start('foo');
	assert.throws(() => timings.start('foo'));
	timing();
	assert.throws(() => timing());
	const elapsed = timings.get('foo');
	assert.throws(() => timings.get('bar'));
	assert.ok(elapsed.toString().split('.')[1].length <= 4);

	// we don't want to actually call this - what a better pattern?
	const typechecking = () => {
		// @ts-expect-error
		timings.start('no');
		// @ts-expect-error
		timings.start('nope' as string);
	};
	typechecking; // eslint-disable-line @typescript-eslint/no-unused-expressions
});

test__Timings('start with stop callback', () => {
	const timings = new Timings<'foo'>(4);
	const timing = timings.start('foo');
	const elapsed = timing();
	assert.ok(elapsed.toString().split('.')[1].length <= 4);
	assert.throws(() => timing());
	assert.throws(() => timing());
	assert.is(elapsed, timings.get('foo'));
});

test__Timings('merge timings', () => {
	const a = new Timings(10);
	const b = new Timings(10);
	const timingA = a.start('test');
	const aTiming = timingA();
	assert.ok(aTiming);
	const timingB = b.start('test');
	const bTiming = timingB();
	assert.ok(bTiming);
	a.merge(b);
	assert.is(a.get('test'), aTiming + bTiming);
	assert.is(b.get('test'), bTiming);
});

test__Timings.run();
/* test__Timings */
