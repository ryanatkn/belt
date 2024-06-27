import {suite} from 'uvu';
import * as assert from 'uvu/assert';

import {clamp, lerp, round} from '$lib/maths.js';

/* test__clamp */
const test__clamp = suite('clamp');

test__clamp('clamps a no-op', () => {
	assert.is(clamp(0, -1, 1), 0);
});

test__clamp('clamps to min', () => {
	assert.is(clamp(-2, -1, 1), -1);
});

test__clamp('clamps to max', () => {
	assert.is(clamp(2, -1, 1), 1);
});

test__clamp.run();
/* test__clamp */

/* test__lerp */
const test__lerp = suite('lerp');

test__lerp('lerps two numbers', () => {
	assert.is(lerp(0, 10, 0.2), 2);
});

test__lerp('finds the midpoint between two numbers', () => {
	assert.is(lerp(1, 3, 0.5), 2);
});

test__lerp('lerps with 0', () => {
	assert.is(lerp(1, 3, 0), 1);
});

test__lerp('lerps with 1', () => {
	assert.is(lerp(1, 3, 1), 3);
});

test__lerp.run();
/* test__lerp */

/* test__round */
const test__round = suite('round');

test__round('rounds a number up to 3 decimals', () => {
	assert.is(round(0.0349, 3), 0.035);
});

test__round('rounds a negative number down to 5 decimals', () => {
	assert.is(round(-1.6180339, 5), -1.61803);
});

test__round.run();
/* test__round */
