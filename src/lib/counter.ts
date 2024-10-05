export type Counter = () => number;

export type Create_Counter = (initial?: number) => Counter;

/**
 * Creates a counter constructor function, starting at `0`.
 */
export const create_counter: Create_Counter = (count = 0) => {
	let c = count;
	return () => c++;
};
