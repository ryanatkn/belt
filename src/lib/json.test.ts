import {test, assert} from 'vitest';

import {to_json_type, embed_json} from '$lib/json.js';
import {noop} from '$lib/function.js';

test('to_json_type', () => {
	assert.strictEqual(to_json_type(''), 'string');
	assert.strictEqual(to_json_type('1'), 'string');
	assert.strictEqual(to_json_type(1), 'number');
	assert.strictEqual(to_json_type(NaN), 'number');
	assert.strictEqual(to_json_type(Infinity), 'number');
	assert.strictEqual(to_json_type(false), 'boolean');
	assert.strictEqual(to_json_type({}), 'object');
	assert.strictEqual(to_json_type(null), 'null');
	assert.strictEqual(to_json_type([]), 'array');
	assert.strictEqual(to_json_type(undefined as any), undefined);
	assert.strictEqual(to_json_type(noop as any), undefined);
	assert.strictEqual(to_json_type(BigInt(9000) as any), undefined);
	assert.strictEqual(to_json_type(Symbol() as any), undefined);
});

test('embed_json', () => {
	assert.strictEqual(embed_json('hello"world'), `JSON.parse('"hello\\"world"')`);
	assert.strictEqual(embed_json("hello'world"), `JSON.parse('"hello\\'world"')`);
	assert.strictEqual(
		embed_json("'hello'w''or'''ld'"),
		`JSON.parse('"\\'hello\\'w\\'\\'or\\'\\'\\'ld\\'"')`,
	);
	assert.strictEqual(
		embed_json({a: 1, b: 2}, (d) => JSON.stringify(d, null, '\t')),
		`JSON.parse('{\\
	"a": 1,\\
	"b": 2\\
}')`,
	);
});
