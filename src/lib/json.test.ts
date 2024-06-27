import {test} from 'uvu';
import * as assert from 'uvu/assert';

import {to_json_type} from '$lib/json.js';
import {noop} from '$lib/function.js';

test('basic behavior', () => {
	assert.is(to_json_type(''), 'string');
	assert.is(to_json_type('1'), 'string');
	assert.is(to_json_type(1), 'number');
	assert.is(to_json_type(NaN), 'number');
	assert.is(to_json_type(Infinity), 'number');
	assert.is(to_json_type(false), 'boolean');
	assert.is(to_json_type({}), 'object');
	assert.is(to_json_type(null), 'null');
	assert.is(to_json_type([]), 'array');
	assert.is(to_json_type(undefined as any), undefined);
	assert.is(to_json_type(noop as any), undefined);
	assert.is(to_json_type(BigInt(9000) as any), undefined);
	assert.is(to_json_type(Symbol() as any), undefined);
});

test.run();
