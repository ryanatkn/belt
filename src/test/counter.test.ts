import {test, assert} from 'vitest';

import {create_counter} from '$lib/counter.js';

test('basic behavior', () => {
	const counter = create_counter();
	assert.strictEqual(counter(), 0);
	assert.strictEqual(counter(), 1);
	assert.strictEqual(counter(), 2);
});

test('custom count', () => {
	const counter = create_counter(1);
	assert.strictEqual(counter(), 1);
	assert.strictEqual(counter(), 2);
	assert.strictEqual(counter(), 3);
});
