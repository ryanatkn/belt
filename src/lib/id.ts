import type {Flavored} from '$lib/types.ts';
import {create_counter} from '$lib/counter.ts';

export type Uuid = Flavored<string, 'Uuid'>;

/**
 * Loosely validates a UUID string.
 */
export const is_uuid = (str: string): str is Uuid => UUID_MATCHER.test(str);

/**
 * Postgres doesn't support the namespace prefix, so neither does Felt.
 * For more see the UUID RFC - https://tools.ietf.org/html/rfc4122
 * The Ajv validator does support the namespace, hence this custom implementation.
 */
export const UUID_MATCHER = /^[0-9a-f]{8}-(?:[0-9a-f]{4}-){3}[0-9a-f]{12}$/iu;

export type Client_Id_Creator = () => string;

/**
 * Creates a string id generator function, outputting `${name}_${count}` by default.
 */
export const create_client_id_creator = (
	name: string,
	count?: number,
	separator = '_',
): Client_Id_Creator => {
	const counter = create_counter(count);
	return () => `${name}${separator}${counter()}`;
};
