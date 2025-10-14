import {describe, test, assert} from 'vitest';

import {clamp, lerp, round} from '$lib/maths.ts';

describe('clamp', () => {
	test('clamps a no-op', () => {
		assert.strictEqual(clamp(0, -1, 1), 0);
	});

	test('clamps to min', () => {
		assert.strictEqual(clamp(-2, -1, 1), -1);
	});

	test('clamps to max', () => {
		assert.strictEqual(clamp(2, -1, 1), 1);
	});
});

describe('lerp', () => {
	test('lerps two numbers', () => {
		assert.strictEqual(lerp(0, 10, 0.2), 2);
	});

	test('finds the midpoint between two numbers', () => {
		assert.strictEqual(lerp(1, 3, 0.5), 2);
	});

	test('lerps with 0', () => {
		assert.strictEqual(lerp(1, 3, 0), 1);
	});

	test('lerps with 1', () => {
		assert.strictEqual(lerp(1, 3, 1), 3);
	});
});

describe('round', () => {
	test('rounds a number up to 3 decimals', () => {
		assert.strictEqual(round(0.0349, 3), 0.035);
	});

	test('rounds a negative number down to 5 decimals', () => {
		assert.strictEqual(round(-1.6180339, 5), -1.61803);
	});
});
