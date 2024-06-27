import {test} from 'uvu';
import * as assert from 'uvu/assert';

import {print_ms, disabled_colors, set_colors} from '$lib/print.js';

set_colors(disabled_colors);

test('print_ms', () => {
	assert.is(print_ms(1), '1.0ms');
	assert.is(print_ms(1.1), '1.1ms');
	assert.is(print_ms(1.11), '1.1ms');
	assert.is(print_ms(1.19), '1.2ms');
	assert.is(print_ms(20), '20ms');
	assert.is(print_ms(20.1), '20ms');
	assert.is(print_ms(20.9), '21ms');
	assert.is(print_ms(300), '300ms');
	assert.is(print_ms(300.1), '300ms');
	assert.is(print_ms(300.9), '301ms');
	assert.is(print_ms(4000), '4_000ms');
	assert.is(print_ms(4000.1), '4_000ms');
	assert.is(print_ms(4000.9), '4_001ms');
	assert.is(print_ms(50000), '50_000ms');
	assert.is(print_ms(50000.1), '50_000ms');
	assert.is(print_ms(50000.9), '50_001ms');
	assert.is(print_ms(600000), '600_000ms');
	assert.is(print_ms(600000.1), '600_000ms');
	assert.is(print_ms(600000.9), '600_001ms');
	assert.is(print_ms(7000000), '7_000_000ms');
	assert.is(print_ms(7000000.1), '7_000_000ms');
	assert.is(print_ms(7000000.9), '7_000_001ms');
});

test.run();
