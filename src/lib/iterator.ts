/**
 * Useful for fast counting when `.length` is not available.
 */
export const count_iterator = (iterator: Iterable<unknown>): number => {
	var count = 0; // eslint-disable-line no-var
	for (var _ of iterator) count++; // eslint-disable-line no-var
	return count;
};
