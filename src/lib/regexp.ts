/**
 * Escapes a string for literal matching in a RegExp.
 * @source https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/RegularExpressions
 */
export const escape_regexp = (str: string): string => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

/**
 * Reset a RegExp's lastIndex to 0 for global and sticky patterns.
 * Ensures consistent behavior by clearing state that affects subsequent matches.
 */
export const reset_regexp = (regexp: RegExp): void => {
	if (regexp.global || regexp.sticky) {
		regexp.lastIndex = 0;
	}
};
