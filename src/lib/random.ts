export const randomFloat = (min: number, max: number, random = Math.random): number =>
	random() * (max - min) + min;

export const randomInt = (min: number, max: number, random = Math.random): number =>
	Math.floor(random() * (max - min + 1)) + min;

export const randomBool = (random = Math.random): boolean => random() > 0.5;

export const randomItem = <T>(arr: T[], random = Math.random): T =>
	arr[randomInt(0, arr.length - 1, random)];
