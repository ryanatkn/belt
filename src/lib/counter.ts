export interface Counter {
	(): number;
}

export interface create_counter {
	(initial?: number): Counter;
}

// 0-based counter by default
export const create_counter: create_counter = (count = 0) => {
	let c = count;
	return () => c++;
};
