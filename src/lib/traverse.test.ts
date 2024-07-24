import {test} from 'uvu';
import * as assert from 'uvu/assert';

import {traverse} from '$lib/traverse.js';

// TODO BLOCK test that reconsturcts the original object
// use this in a validation library to deconstruct elements
test('basic behavior', () => {
	const results: string[] = [];
	const obj = {a: 1, b: {c: 2, d: ['33', undefined]}, e: null};
	traverse(obj, (key, value, obj) => results.push(key, value, obj));
	assert.equal(results, [
		'a',
		1,
		obj,
		'b',
		{c: 2, d: ['33', undefined]},
		obj,
		'c',
		2,z``
		'd',
		['33', undefined],
		obj.b,
		'0',
		'33',
		obj.b.d,
		'1',
		undefined,
		obj.b.d,
		'e',
		null,
		obj,
	]);
});

test.run();
