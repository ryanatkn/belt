/**
 * Useful for fast counting when `.length` is not available.
 */
export const count_iterator = (iterator: Iterable<unknown>): number => {
	var count = 0;
	for (var _ of iterator) count++;
	return count;
};
