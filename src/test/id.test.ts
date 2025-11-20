import {describe, test, assert} from 'vitest';
import {randomUUID} from 'node:crypto';

import {is_uuid, create_client_id_creator} from '$lib/id.ts';

describe('is_uuid', () => {
	test('basic behavior', () => {
		assert.ok(is_uuid(randomUUID()));
		assert.ok(is_uuid('f81d4fae-7dec-11d0-a765-00a0c91e6bf6'));
		assert.strictEqual(is_uuid('g81d4fae-7dec-11d0-a765-00a0c91e6bf6'), false);
		assert.strictEqual(is_uuid(''), false);
		assert.strictEqual(is_uuid(null!), false);
		assert.strictEqual(is_uuid(undefined!), false);

		// See the implementation's comments for why the namespace syntax is not supported.
		assert.strictEqual(is_uuid('urn:uuid:f81d4fae-7dec-11d0-a765-00a0c91e6bf6'), false);
	});
});

describe('create_client_id_creator', () => {
	test('basic behavior', () => {
		const toClientId = create_client_id_creator('abc');
		assert.strictEqual(toClientId(), 'abc_0');
		assert.strictEqual(toClientId(), 'abc_1');
		assert.strictEqual(toClientId(), 'abc_2');
	});

	test('custom count', () => {
		const toClientId = create_client_id_creator('abc', 1);
		assert.strictEqual(toClientId(), 'abc_1');
		assert.strictEqual(toClientId(), 'abc_2');
		assert.strictEqual(toClientId(), 'abc_3');
	});

	test('custom separator', () => {
		const toClientId = create_client_id_creator('abc', undefined, '');
		assert.strictEqual(toClientId(), 'abc0');
		assert.strictEqual(toClientId(), 'abc1');
		assert.strictEqual(toClientId(), 'abc2');
	});
});
