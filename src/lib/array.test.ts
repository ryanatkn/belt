import {test, assert} from 'vitest';

import {to_array} from '$lib/array.js';

test('basic behavior', () => {
	const array = [1, 2, 3];
	assert.strictEqual(array, to_array(array));
	assert.deepEqual([1], to_array(1));
	assert.deepEqual([{a: 1}], to_array({a: 1}));
});
