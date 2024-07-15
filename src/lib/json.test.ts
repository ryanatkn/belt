import {test} from 'uvu';
import * as assert from 'uvu/assert';

import {to_json_type, embed_json} from '$lib/json.js';
import {noop} from '$lib/function.js';

test('to_json_type', () => {
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

test('embed_json', () => {
	assert.is(embed_json('hello"world'), `JSON.parse('"hello\\"world"')`);
	assert.is(embed_json("hello'world"), `JSON.parse('"hello\\'world"')`);
	assert.is(embed_json("'hello'w''or'''ld'"), `JSON.parse('"\\'hello\\'w\\'\\'or\\'\\'\\'ld\\'"')`);
	assert.is(
		embed_json(`hello
world
	newline`),
		`JSON.parse('"hello\\\nworld\\\n\\tnewline"')`,
	);
});

test.run();
