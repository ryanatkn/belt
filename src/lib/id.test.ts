import {suite} from 'uvu';
import * as assert from 'uvu/assert';

import {toUuid, isUuid, toToClientId} from '$lib/id.js';

/* test__toUuid */
const test__toUuid = suite('toUuid');

test__toUuid('basic behavior', () => {
	assert.ok(toUuid());
	assert.is(toUuid().length, 36);
});

test__toUuid.run();
/* test__toUuid */

/* test__isUuid */
const test__isUuid = suite('isUuid');

test__isUuid('basic behavior', () => {
	assert.ok(isUuid(toUuid()));
	assert.ok(isUuid('f81d4fae-7dec-11d0-a765-00a0c91e6bf6'));
	assert.not.ok(isUuid('g81d4fae-7dec-11d0-a765-00a0c91e6bf6'));
	assert.not.ok(isUuid(''));
	assert.not.ok(isUuid(null!));
	assert.not.ok(isUuid(undefined!));

	// See the implementation's comments for why the namespace syntax is not supported.
	assert.not.ok(isUuid('urn:uuid:f81d4fae-7dec-11d0-a765-00a0c91e6bf6'));
});

test__isUuid.run();
/* test__isUuid */

/* test__toToClientId */
const test__toToClientId = suite('toToClientId');

test__toToClientId('basic behavior', () => {
	const toClientId = toToClientId('abc');
	assert.is(toClientId(), 'abc_0');
	assert.is(toClientId(), 'abc_1');
	assert.is(toClientId(), 'abc_2');
});

test__toToClientId('custom count', () => {
	const toClientId = toToClientId('abc', 1);
	assert.is(toClientId(), 'abc_1');
	assert.is(toClientId(), 'abc_2');
	assert.is(toClientId(), 'abc_3');
});

test__toToClientId('custom separator', () => {
	const toClientId = toToClientId('abc', undefined, '');
	assert.is(toClientId(), 'abc0');
	assert.is(toClientId(), 'abc1');
	assert.is(toClientId(), 'abc2');
});

test__toToClientId.run();
/* test__toToClientId */
