export type Counter = () => number;

export type Create_Counter = (initial?: number) => Counter;

// 0-based counter by default
export const create_counter: Create_Counter = (count = 0) => {
	let c = count;
	return () => c++;
};
