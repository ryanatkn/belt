// Escapes a string for literal matching in a RegExp.
// from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/RegularExpressions
export const escapeRegexp = (str: string): string => str.replace(/[.*+?^${}()|[\]\\]/gu, '\\$&');
