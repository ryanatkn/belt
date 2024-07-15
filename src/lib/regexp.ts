/**
 * Escapes a string for literal matching in a RegExp.
 * @source https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/RegularExpressions
 */
export const escape_regexp = (str: string): string => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
