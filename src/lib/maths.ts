export const clamp = (n: number, min: number, max: number): number =>
	Math.min(Math.max(n, min), max);

export const lerp = (a: number, b: number, amount: number): number => (1 - amount) * a + amount * b;

export const round = (n: number, decimals: number): number => {
	const mult = 10 ** decimals;
	return Math.round(n * mult) / mult;
};

// golden ratio constants, useful for scaling: https://wikipedia.org/wiki/Golden_ratio
export const GR = 1.618033988749895;
export const GRi = 0.6180339887498948;
export const GR2 = 2.618033988749895;
export const GR2i = 0.38196601125010515;
export const GR3 = 4.23606797749979;
export const GR3i = 0.2360679774997897;
export const GR4 = 6.854101966249686;
export const GR4i = 0.14589803375031543;
export const GR5 = 11.090169943749476;
export const GR5i = 0.09016994374947422;
export const GR6 = 17.944271909999163;
export const GR6i = 0.0557280900008412;
export const GR7 = 29.03444185374864;
export const GR7i = 0.03444185374863302;
export const GR8 = 46.978713763747805;
export const GR8i = 0.02128623625220818;
export const GR9 = 76.01315561749645;
export const GR9i = 0.013155617496424835;
