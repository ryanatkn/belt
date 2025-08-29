import {test, assert, beforeAll, afterAll} from 'vitest';

import {print_ms, st, configure_print_colors} from '$lib/print.js';

let original_st: typeof st;

beforeAll(() => {
	original_st = st;
	configure_print_colors(null);
});

afterAll(() => {
	configure_print_colors(original_st);
});

test('print_ms', () => {
	assert.strictEqual(print_ms(1), '1.0ms');
	assert.strictEqual(print_ms(1.1), '1.1ms');
	assert.strictEqual(print_ms(1.11), '1.1ms');
	assert.strictEqual(print_ms(1.19), '1.2ms');
	assert.strictEqual(print_ms(20), '20ms');
	assert.strictEqual(print_ms(20.1), '20ms');
	assert.strictEqual(print_ms(20.9), '21ms');
	assert.strictEqual(print_ms(300), '300ms');
	assert.strictEqual(print_ms(300.1), '300ms');
	assert.strictEqual(print_ms(300.9), '301ms');
	assert.strictEqual(print_ms(4000), '4,000ms');
	assert.strictEqual(print_ms(4000.1), '4,000ms');
	assert.strictEqual(print_ms(4000.9), '4,001ms');
	assert.strictEqual(print_ms(50000), '50,000ms');
	assert.strictEqual(print_ms(50000.1), '50,000ms');
	assert.strictEqual(print_ms(50000.9), '50,001ms');
	assert.strictEqual(print_ms(600000), '600,000ms');
	assert.strictEqual(print_ms(600000.1), '600,000ms');
	assert.strictEqual(print_ms(600000.9), '600,001ms');
	assert.strictEqual(print_ms(7000000), '7,000,000ms');
	assert.strictEqual(print_ms(7000000.1), '7,000,000ms');
	assert.strictEqual(print_ms(7000000.9), '7,000,001ms');
});
