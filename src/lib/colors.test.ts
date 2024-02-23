import {test} from 'uvu';
import * as assert from 'uvu/assert';

import {hex_to_rgb, rgb_to_hex, hex_string_to_rgb, rgb_to_hex_string} from '$lib/colors.js';

test('hex_to_rgb and rgb_to_hex', async () => {
	const rgb = [157, 100, 50] as const;
	const hex = rgb_to_hex(...rgb);
	const rgb2 = hex_to_rgb(hex);
	assert.equal(rgb, rgb2);
});

test('rgb_to_hex_string and hex_string_to_rgb', async () => {
	const rgb = [157, 100, 50] as const;
	const hex = rgb_to_hex_string(...rgb);
	const rgb2 = hex_string_to_rgb(hex);
	assert.equal(rgb, rgb2);
});

test.run();
