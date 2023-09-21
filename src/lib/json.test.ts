import {suite} from 'uvu';
import * as assert from 'uvu/assert';

import {get_json_type} from './json.js';
import {noop} from './function.js';

/* test__get_json_type */
const test__get_json_type = suite('get_json_type');

test__get_json_type('basic behavior', () => {
	assert.is(get_json_type(''), 'string');
	assert.is(get_json_type('1'), 'string');
	assert.is(get_json_type(1), 'number');
	assert.is(get_json_type(NaN), 'number');
	assert.is(get_json_type(Infinity), 'number');
	assert.is(get_json_type(false), 'boolean');
	assert.is(get_json_type({}), 'object');
	assert.is(get_json_type(null), 'null');
	assert.is(get_json_type([]), 'array');
	assert.is(get_json_type(undefined as any), undefined);
	assert.is(get_json_type(noop as any), undefined);
	assert.is(get_json_type(BigInt(9000) as any), undefined);
	assert.is(get_json_type(Symbol() as any), undefined);
});

test__get_json_type.run();
/* test__get_json_type */
