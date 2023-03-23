import {gray, white, green, yellow, blue, cyan, magenta} from 'kleur/colors';

import {round} from './maths.js';
import type {Timings} from './timings.js';
import type {Logger} from './log.js';

export const printKeyValue = (key: string, val: string | number): string =>
	gray(`${key}(`) + val + gray(')');

export const printMs = (ms: number, decimals?: number | undefined): string => {
	const decimalCount = decimals ?? (ms >= 10 ? 0 : ms < 0.1 ? 2 : 1);
	return white(round(ms, decimalCount).toFixed(decimalCount)) + gray('ms');
};

export const printCauses = (solutions: string[]): string =>
	'\n	Possible causes:' + solutions.map((s) => `\n		$• ${s}`).join('');

export const printString = (v: string): string => green(`'${v}'`);
export const printNumber = (v: number): string => cyan(v);
export const printBoolean = (v: boolean): string => yellow(v);

export const printValue = (value: unknown): string => {
	switch (typeof value) {
		case 'string':
			return printString(value);
		case 'number':
			return printNumber(value);
		case 'boolean':
			return printBoolean(value);
		case 'object':
			return value === null ? blue('null') : magenta(JSON.stringify(value));
		default:
			return blue(value + '');
	}
};

// Because throwing errors and rejecting promises isn't typesafe,
// don't assume the arg is an `Error` and try to return something useful.
export const printError = (err: Error): string =>
	yellow(
		(err && (err.stack || (err.message && `Error: ${err.message}`))) ||
			`Unknown error: ${err as any}`,
	);

export const printTiming = (key: string | number, timing: number): string =>
	`${printMs(timing)} ${gray('←')} ${gray(key)}`;

export const printTimings = (timings: Timings, log: Logger): void => {
	for (const [key, timing] of timings.getAll()) {
		log.debug(printTiming(key, timing));
	}
};
