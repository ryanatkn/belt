import {count_iterator} from './iterator.js';

/**
 * Truncates a string to a maximum length, adding a suffix if needed that defaults to `...`.
 */
export const truncate = (str: string, maxLength: number, suffix = '...'): string => {
	if (maxLength < suffix.length) return '';
	if (str.length > maxLength) {
		return str.substring(0, maxLength - suffix.length) + suffix;
	}
	return str;
};

/**
 * Removes characters inclusive of `stripped`.
 */
export const strip_start = (source: string, stripped: string): string => {
	if (!stripped || !source.startsWith(stripped)) return source;
	return source.substring(stripped.length);
};

/**
 * Removes characters inclusive of `stripped`.
 */
export const strip_end = (source: string, stripped: string): string => {
	if (!stripped || !source.endsWith(stripped)) return source;
	return source.substring(0, source.length - stripped.length);
};

/**
 * Removes characters inclusive of `stripped`.
 */
export const strip_after = (source: string, stripped: string): string => {
	if (!stripped) return source;
	const idx = source.indexOf(stripped);
	if (idx === -1) return source;
	return source.substring(0, idx);
};

/**
 * Removes characters inclusive of `stripped`.
 */
export const strip_before = (source: string, stripped: string): string => {
	if (!stripped) return source;
	const idx = source.indexOf(stripped);
	if (idx === -1) return source;
	return source.substring(idx + stripped.length);
};

/**
 * Adds the substring `ensured` to the start of the `source` string if it's not already present.
 */
export const ensure_start = (source: string, ensured: string): string => {
	if (source.startsWith(ensured)) return source;
	return ensured + source;
};

/**
 * Adds the substring `ensured` to the end of the `source` string if it's not already present.
 */
export const ensure_end = (source: string, ensured: string): string => {
	if (source.endsWith(ensured)) return source;
	return source + ensured;
};

/**
 * Removes leading and trailing spaces from each line of a string.
 */
export const deindent = (str: string): string =>
	str
		.split('\n')
		.filter(Boolean)
		.map((s) => s.trim())
		.join('\n');

/**
 * Returns a plural suffix based on a count.
 */
export const plural = (count: number | undefined | null, suffix = 's'): string =>
	count === 1 ? '' : suffix;

/**
 * Returns the count of graphemes in a string, the individually rendered characters.
 */
export const count_graphemes = (str: string): number =>
	count_iterator(new Intl.Segmenter().segment(str));

/**
 * Strips ANSI escape sequences from a string
 */
export const strip_ansi = (str: string): string => str.replaceAll(/\x1B\[[0-9;]*[a-zA-Z]/g, ''); // eslint-disable-line no-control-regex

/**
 * Stringifies a value like `JSON.stringify` but with some corner cases handled better.
 *
 * @source https://2ality.com/2025/04/stringification-javascript.html
 */
export const stringify = (value: unknown): string =>
	typeof value === 'bigint' ? value + 'n' : (JSON.stringify(value) ?? String(value)); // eslint-disable-line @typescript-eslint/no-unnecessary-condition
