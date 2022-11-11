import {suite} from 'uvu';
import * as assert from 'uvu/assert';

import {getJsonType} from '$lib/json.js';
import {noop} from '$lib/function.js';

/* test__getJsonType */
const test__getJsonType = suite('getJsonType');

test__getJsonType('basic behavior', () => {
	assert.is(getJsonType(''), 'string');
	assert.is(getJsonType('1'), 'string');
	assert.is(getJsonType(1), 'number');
	assert.is(getJsonType(NaN), 'number');
	assert.is(getJsonType(Infinity), 'number');
	assert.is(getJsonType(false), 'boolean');
	assert.is(getJsonType({}), 'object');
	assert.is(getJsonType(null), 'null');
	assert.is(getJsonType([]), 'array');
	assert.throws(() => getJsonType(undefined as any));
	assert.throws(() => getJsonType(noop as any));
	assert.throws(() => getJsonType(BigInt(9000) as any));
	assert.throws(() => getJsonType(Symbol() as any));
});

test__getJsonType.run();
/* test__getJsonType */
