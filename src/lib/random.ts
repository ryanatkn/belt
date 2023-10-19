export const random_float = (min: number, max: number, random = Math.random): number =>
	random() * (max - min) + min;

export const random_int = (min: number, max: number, random = Math.random): number =>
	Math.floor(random() * (max - min + 1)) + min;

export const random_boolean = (random = Math.random): boolean => random() > 0.5;

export const random_item = <T>(arr: T[], random = Math.random): T =>
	arr[random_int(0, arr.length - 1, random)];

/**
 * Mutates `array` with random ordering.
 */
export const shuffle: <T extends any[]>(array: T, random?: typeof random_int) => T = (
	array,
	random = random_int,
) => {
	const {length} = array;
	const max = length - 1;
	for (let i = 0; i < length; i++) {
		const index = random(0, max);
		if (i === index) continue;
		const item = array[index];
		array[index] = array[i];
		array[i] = item;
	}
	return array;
};
