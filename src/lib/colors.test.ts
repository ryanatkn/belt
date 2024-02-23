import {test} from 'uvu';
import * as assert from 'uvu/assert';

import {
	hex_to_rgb,
	rgb_to_hex,
	hex_string_to_rgb,
	rgb_to_hex_string,
	parse_hsl_string,
	type Hsl,
	hsl_to_hex,
	hsl_to_hex_string,
	hsl_to_rgb,
	hsl_to_string,
	rgb_to_hsl,
	hex_string_to_hsl,
} from '$lib/colors.js';

test('hex_to_rgb and rgb_to_hex', () => {
	const rgb = [157, 100, 50] as const;
	const hex = rgb_to_hex(...rgb);
	const rgb2 = hex_to_rgb(hex);
	assert.equal(rgb, rgb2);
});

test('rgb_to_hex_string and hex_string_to_rgb', () => {
	const rgb = [157, 100, 50] as const;
	const hex = rgb_to_hex_string(...rgb);
	const rgb2 = hex_string_to_rgb(hex);
	assert.equal(rgb, rgb2);
});

test('parse_hsl_string', () => {
	const parsed = [210 / 360, 0.55, 0.62];
	assert.equal(parse_hsl_string('hsl(210, 55%, 62%)'), parsed);
	assert.equal(parse_hsl_string('hsl(210,55%,62%)'), parsed);
	assert.equal(parse_hsl_string('hsl(210,    55%,  62%)'), parsed);
});

test('conversions between hsl, rgb, and hex', () => {
	const hsl: Hsl = [210 / 360, 0.55, 0.62];
	assert.is(hsl_to_string(...hsl), 'hsl(210, 55%, 62%)');
	const hex_string = hsl_to_hex_string(...hsl);
	assert.is(hex_string, '#699ed3');
	const hex = hsl_to_hex(...hsl);
	const rgb = hex_to_rgb(hex);
	assert.is(rgb_to_hex_string(...rgb), hex_string);
	assert.is(rgb_to_hex(...rgb), hex);
	assert.equal(rgb, [105, 158, 211]);
	assert.equal(rgb, hsl_to_rgb(...hsl));
	assert.equal(hex_string_to_rgb(hex_string), rgb);
	assert.equal(hex_string_to_hsl(hex_string), hsl);
	assert.equal(rgb_to_hsl(...rgb), hsl);
});

test.run();
