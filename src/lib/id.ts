import type {Flavored} from './types.js';
import {toCounter} from './counter';

export type Uuid = Flavored<string, 'Uuid'>;

export const isUuid = (str: string): str is Uuid => uuidMatcher.test(str);

// Postgres doesn't support the namespace prefix, so neither does Felt.
// For more see the UUID RFC - https://tools.ietf.org/html/rfc4122
// The Ajv validator does support the namespace, hence this custom implementation.
export const uuidMatcher = /^[0-9a-f]{8}-(?:[0-9a-f]{4}-){3}[0-9a-f]{12}$/iu;

export interface ToClientId {
	(): string;
}

// Creates a string id generator function.
// Client ids take the form `${name}_${count}`,
// and they're only safe to persist across page loads by hydrating the initial `count`.
export const toToClientId = (name: string, count?: number, separator = '_'): ToClientId => {
	const counter = toCounter(count);
	return () => `${name}${separator}${counter()}`;
};
