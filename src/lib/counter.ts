export type Counter = () => number;

export type CreateCounter = (initial?: number) => Counter;

/**
 * Creates a counter constructor function, starting at `0`.
 */
export const create_counter: CreateCounter = (count = 0) => {
	let c = count;
	return () => c++;
};
