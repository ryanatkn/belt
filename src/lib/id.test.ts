import {suite} from 'uvu';
import * as assert from 'uvu/assert';
import {randomUUID} from 'node:crypto';

import {is_uuid, create_client_id_creator} from './id.js';

/* test__is_uuid */
const test__is_uuid = suite('is_uuid');

test__is_uuid('basic behavior', () => {
	assert.ok(is_uuid(randomUUID()));
	assert.ok(is_uuid('f81d4fae-7dec-11d0-a765-00a0c91e6bf6'));
	assert.not.ok(is_uuid('g81d4fae-7dec-11d0-a765-00a0c91e6bf6'));
	assert.not.ok(is_uuid(''));
	assert.not.ok(is_uuid(null!));
	assert.not.ok(is_uuid(undefined!));

	// See the implementation's comments for why the namespace syntax is not supported.
	assert.not.ok(is_uuid('urn:uuid:f81d4fae-7dec-11d0-a765-00a0c91e6bf6'));
});

test__is_uuid.run();
/* test__is_uuid */

/* test__create_client_id_creator */
const test__create_client_id_creator = suite('create_client_id_creator');

test__create_client_id_creator('basic behavior', () => {
	const toClientId = create_client_id_creator('abc');
	assert.is(toClientId(), 'abc_0');
	assert.is(toClientId(), 'abc_1');
	assert.is(toClientId(), 'abc_2');
});

test__create_client_id_creator('custom count', () => {
	const toClientId = create_client_id_creator('abc', 1);
	assert.is(toClientId(), 'abc_1');
	assert.is(toClientId(), 'abc_2');
	assert.is(toClientId(), 'abc_3');
});

test__create_client_id_creator('custom separator', () => {
	const toClientId = create_client_id_creator('abc', undefined, '');
	assert.is(toClientId(), 'abc0');
	assert.is(toClientId(), 'abc1');
	assert.is(toClientId(), 'abc2');
});

test__create_client_id_creator.run();
/* test__create_client_id_creator */
