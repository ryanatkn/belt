import {styleText} from 'node:util';

import type {Timings} from '$lib/timings.js';
import type {Logger} from '$lib/log.js';

let st: typeof styleText = styleText;

export const enable_colors = (): void => {
	st = styleText;
};

export const disable_colors = (): void => {
	st = (_, v) => v;
};

export const print_key_value = (key: string, val: string | number): string =>
	st('gray', `${key}(`) + val + st('gray', ')');

export const print_ms = (ms: number, decimals?: number | undefined, separator?: string): string => {
	const decimal_count = decimals ?? (ms >= 10 ? 0 : ms < 0.1 ? 2 : 1);
	const rounded = ms.toFixed(decimal_count);
	return st('white', print_number_with_separators(rounded, separator)) + st('gray', 'ms');
};

export const print_number_with_separators = (v: string, separator = '_'): string => {
	if (!separator) return v;
	const decimal_index = v.indexOf('.');
	const start_index = (decimal_index === -1 ? v.length : decimal_index) - 1;
	let s = decimal_index === -1 ? '' : v.slice(start_index + 1);
	let count = 0;
	for (let i = start_index; i >= 0; i--) {
		count++;
		if (count > 3 && count % 3 === 1) s = separator + s;
		s = v[i] + s;
	}
	return s;
};

export const print_string = (v: string): string => st('green', `'${v}'`);
export const print_number = (v: number): string => st('cyan', v + '');
export const print_boolean = (v: boolean): string => st('yellow', v + '');

export const print_value = (value: unknown): string => {
	switch (typeof value) {
		case 'string':
			return print_string(value);
		case 'number':
			return print_number(value);
		case 'boolean':
			return print_boolean(value);
		case 'object':
			return value === null ? st('blue', 'null') : st('magenta', JSON.stringify(value));
		default:
			return st('blue', value + '');
	}
};

// Because throwing errors and rejecting promises isn't typesafe,
// don't assume the arg is an `Error` and try to return something useful.
export const print_error = (err: Error): string =>
	st(
		'yellow',
		err.stack ?? ((err.message && `Error: ${err.message}`) || `Unknown error: ${err as any}`),
	);

export const print_timing = (key: string | number, timing: number | undefined): string =>
	`${timing === undefined ? '...' : print_ms(timing, undefined)} ${st('gray', '←')} ${st('gray', key + '')}`;

export const print_timings = (timings: Timings, log: Logger): void => {
	for (const [key, timing] of timings.entries()) {
		log.debug(print_timing(key, timing));
	}
};
