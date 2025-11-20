import {test, assert} from 'vitest';

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
	type Rgb,
} from '$lib/colors.ts';

test('hex_to_rgb and rgb_to_hex', () => {
	const rgb: Rgb = [157, 100, 50];
	const hex = rgb_to_hex(...rgb);
	const rgb2 = hex_to_rgb(hex);
	assert.deepEqual(rgb, rgb2);
});

test('rgb_to_hex_string and hex_string_to_rgb', () => {
	const rgb: Rgb = [157, 100, 50];
	const hex = rgb_to_hex_string(...rgb);
	const rgb2 = hex_string_to_rgb(hex);
	assert.deepEqual(rgb, rgb2);
});

test('parse_hsl_string', () => {
	const parsed: Hsl = [210 / 360, 0.55, 0.62];
	assert.deepEqual(parse_hsl_string('hsl(210 55% 62%)'), parsed);
	assert.deepEqual(parse_hsl_string('hsl(210, 55%, 62%)'), parsed); // older form with commas
	assert.deepEqual(parse_hsl_string('hsl(210,55%,62%)'), parsed); // older form with commas
	assert.deepEqual(parse_hsl_string('hsl(210 55% 62%'), parsed);
	assert.deepEqual(parse_hsl_string('hsl(   210    55%  62%)'), parsed);
	assert.deepEqual(parse_hsl_string('hsl(210 55% 62% / 0.5)'), parsed);
	assert.deepEqual(parse_hsl_string('hsl(210 55% 62% / 0.5'), parsed);
	assert.deepEqual(parse_hsl_string('210 55% 62%'), parsed);
	assert.deepEqual(parse_hsl_string('210, 55%, 62%'), parsed); // older form with commas
	assert.deepEqual(parse_hsl_string('210,55%,62%'), parsed); // older form with commas
	assert.deepEqual(parse_hsl_string('210 55% 62%'), parsed);
	assert.deepEqual(parse_hsl_string('   210    55%  62%'), parsed);
	assert.deepEqual(parse_hsl_string('210 55% 62% / 0.5'), parsed);
});

test('conversions between hsl, rgb, and hex', () => {
	const hsl: Hsl = [210 / 360, 0.55, 0.62];
	assert.strictEqual(hsl_to_string(...hsl), 'hsl(210 55% 62%)');
	const hex_string = hsl_to_hex_string(...hsl);
	assert.strictEqual(hex_string, '#699ed3');
	const hex = hsl_to_hex(...hsl);
	const rgb = hex_to_rgb(hex);
	assert.strictEqual(rgb_to_hex_string(...rgb), hex_string);
	assert.strictEqual(rgb_to_hex(...rgb), hex);
	assert.deepEqual(rgb, [105, 158, 211]);
	assert.deepEqual(rgb, hsl_to_rgb(...hsl));
	assert.deepEqual(hex_string_to_rgb(hex_string), rgb);
	assert.deepEqual(hex_string_to_hsl(hex_string), hsl);
	assert.deepEqual(rgb_to_hsl(...rgb), hsl);
});
