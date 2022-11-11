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
	assert.is(getJsonType(undefined as any), undefined);
	assert.is(getJsonType(noop as any), undefined);
	assert.is(getJsonType(BigInt(9000) as any), undefined);
	assert.is(getJsonType(Symbol() as any), undefined);
});

test__getJsonType.run();
/* test__getJsonType */
