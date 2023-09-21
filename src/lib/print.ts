import {gray, white, green, yellow, blue, cyan, magenta} from 'kleur/colors';

import {round} from './maths.js';
import type {Timings} from './timings.js';
import type {Logger} from './log.js';

export const print_key_value = (key: string, val: string | number): string =>
	gray(`${key}(`) + val + gray(')');

export const print_ms = (ms: number, decimals?: number | undefined): string => {
	const decimalCount = decimals ?? (ms >= 10 ? 0 : ms < 0.1 ? 2 : 1);
	return white(round(ms, decimalCount).toFixed(decimalCount)) + gray('ms');
};

export const print_causes = (solutions: string[]): string =>
	'\n	Possible causes:' + solutions.map((s) => `\n		$• ${s}`).join('');

export const print_string = (v: string): string => green(`'${v}'`);
export const print_number = (v: number): string => cyan(v);
export const print_boolean = (v: boolean): string => yellow(v);

export const print_value = (value: unknown): string => {
	switch (typeof value) {
		case 'string':
			return print_string(value);
		case 'number':
			return print_number(value);
		case 'boolean':
			return print_boolean(value);
		case 'object':
			return value === null ? blue('null') : magenta(JSON.stringify(value));
		default:
			return blue(value + '');
	}
};

// Because throwing errors and rejecting promises isn't typesafe,
// don't assume the arg is an `Error` and try to return something useful.
export const print_error = (err: Error): string =>
	yellow(
		(err && (err.stack || (err.message && `Error: ${err.message}`))) ||
			`Unknown error: ${err as any}`,
	);

export const print_timing = (key: string | number, timing: number): string =>
	`${print_ms(timing)} ${gray('←')} ${gray(key)}`;

export const print_timings = (timings: Timings, log: Logger): void => {
	for (const [key, timing] of timings.entries()) {
		log.debug(print_timing(key, timing));
	}
};
