import type {Lazy} from '$lib/function.js';
import {lazy} from '$lib/function.js';

// TODO validation with schemas?

// TODO do we need to drop reliance on process.env?
export const env: Record<string, any> = import.meta.env ?? process.env;

interface ToEnvString {
	(key: string): string | undefined;
	(key: string, fallback: string | Lazy<string>): string;
}

export const toEnvString: ToEnvString = (key: string, fallback?: string | Lazy<string>) => {
	const value = env[key];
	return typeof value === 'string' ? value : lazy(fallback)!;
};

interface ToEnvNumber {
	(key: string): number | undefined;
	(key: string, fallback: number | Lazy<number>): number;
}

export const toEnvNumber: ToEnvNumber = (key: string, fallback?: number | Lazy<number>) => {
	const value = parseInt(env[key] || '', 10);
	return Number.isNaN(value) ? lazy(fallback)! : value;
};
