export const EMPTY_ARRAY: any[] = Object.freeze([]) as any;

export const to_array = <T>(value: T | T[]): T[] => (Array.isArray(value) ? value : [value]);

export const remove_unordered = (array: any[], index: number): void => {
	array[index] = array[array.length - 1];
	array.pop();
};

/**
 * Returns a function that returns the next item in the `array`
 * in a linear sequence, looping back to index 0 when it reaches the end.
 */
export const to_next = <T>(array: T[]): (() => T) => {
	let i = -1;
	return () => {
		i++;
		if (i >= array.length) i = 0;
		return array[i];
	};
};
