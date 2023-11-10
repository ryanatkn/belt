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

export const ensure_start = (source: string, ensured: string): string => {
	if (source.startsWith(ensured)) return source;
	return ensured + source;
};

export const ensure_end = (source: string, ensured: string): string => {
	if (source.endsWith(ensured)) return source;
	return source + ensured;
};

/**
 * Removes leading and trailing spaces from each line of a string.
 * @param str
 */
export const deindent = (str: string): string =>
	str
		.split('\n')
		.filter(Boolean)
		.map((s) => s.trim())
		.join('\n');

export const plural = (count: number | undefined | null, suffix = 's'): string =>
	count === 1 ? '' : suffix;

/**
 * Returns the count of graphemes in a string, the individually rendered characters.
 * @param str
 */
export const to_grapheme_count = (str: string): number => {
	try {
		return [...new Intl.Segmenter().segment(str)].length;
	} catch (err) {
		// TODO The fallback code here is very broken,
		// and currently returns down to 1/8 the correct number of graphemes.
		// Remove it when Intl.Segmenter is supported in Firefox:
		// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Segmenter
		return Math.ceil([...str].length / 8);
	}
};
