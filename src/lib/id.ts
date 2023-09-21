import type {Flavored} from './types.js';
import {create_counter} from './counter.js';

export type Uuid = Flavored<string, 'Uuid'>;

export const is_uuid = (str: string): str is Uuid => uuid_matcher.test(str);

/**
 * Postgres doesn't support the namespace prefix, so neither does Felt.
 * For more see the UUID RFC - https://tools.ietf.org/html/rfc4122
 * The Ajv validator does support the namespace, hence this custom implementation.
 */
export const uuid_matcher = /^[0-9a-f]{8}-(?:[0-9a-f]{4}-){3}[0-9a-f]{12}$/iu;

export interface ClientIdCreator {
	(): string;
}

// Creates a string id generator function.
// Client ids take the form `${name}_${count}`,
// and they're only safe to persist across page loads by hydrating the initial `count`.
export const create_client_id_creator = (
	name: string,
	count?: number,
	separator = '_',
): ClientIdCreator => {
	const counter = create_counter(count);
	return () => `${name}${separator}${counter()}`;
};
