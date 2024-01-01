import {gray, white, green, yellow, blue, cyan, magenta} from 'kleur/colors';

import {round} from './maths.js';
import type {Timings} from './timings.js';
import type {Logger} from './log.js';
import {identity} from './function.js';

export interface Colorize {
	(value: string | number | boolean): string;
	(input: undefined): undefined;
	(input: null): null;
}

export interface Colors {
	gray: Colorize;
	white: Colorize;
	green: Colorize;
	yellow: Colorize;
	blue: Colorize;
	cyan: Colorize;
	magenta: Colorize;
}

export const kleur_colors: Colors = {gray, white, green, yellow, blue, cyan, magenta};

export const disabled_colors: Colors = {
	gray: identity,
	white: identity,
	green: identity,
	yellow: identity,
	blue: identity,
	cyan: identity,
	magenta: identity,
};

let colors: Colors = kleur_colors;
export const get_colors = (): Colors => colors;
export const set_colors = (value: Colors): Colors => (colors = value);

export const print_key_value = (key: string, val: string | number, c = colors): string =>
	c.gray(`${key}(`) + val + c.gray(')');

export const print_ms = (
	ms: number,
	decimals?: number | undefined,
	c = colors,
	separator?: string,
): string => {
	const decimal_count = decimals ?? (ms >= 10 ? 0 : ms < 0.1 ? 2 : 1);
	const rounded = round(ms, decimal_count).toFixed(decimal_count);
	return c.white(print_number_with_separators(rounded, separator)) + c.gray('ms');
};

export const print_number_with_separators = (v: string, separator = ','): string => {
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

export const print_string = (v: string, c = colors): string => c.green(`'${v}'`);
export const print_number = (v: number, c = colors): string => c.cyan(v);
export const print_boolean = (v: boolean, c = colors): string => c.yellow(v);

export const print_value = (value: unknown, c = colors): string => {
	switch (typeof value) {
		case 'string':
			return print_string(value, c);
		case 'number':
			return print_number(value, c);
		case 'boolean':
			return print_boolean(value, c);
		case 'object':
			return value === null ? c.blue('null') : c.magenta(JSON.stringify(value));
		default:
			return c.blue(value + '');
	}
};

// Because throwing errors and rejecting promises isn't typesafe,
// don't assume the arg is an `Error` and try to return something useful.
export const print_error = (err: Error, c = colors): string =>
	c.yellow(
		(err && (err.stack || (err.message && `Error: ${err.message}`))) ||
			`Unknown error: ${err as any}`,
	);

export const print_timing = (key: string | number, timing: number, c = colors): string =>
	`${print_ms(timing, undefined, c)} ${c.gray('←')} ${c.gray(key)}`;

export const print_timings = (timings: Timings, log: Logger, c = colors): void => {
	for (const [key, timing] of timings.entries()) {
		log.debug(print_timing(key, timing, c));
	}
};
