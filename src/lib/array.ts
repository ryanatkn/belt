export const EMPTY_ARRAY: any[] = Object.freeze([]) as any;

export const toArray = <T>(value: T | T[]): T[] => (Array.isArray(value) ? value : [value]);

export const removeUnordered = (array: any[], index: number): void => {
	array[index] = array[array.length - 1];
	array.pop();
};
