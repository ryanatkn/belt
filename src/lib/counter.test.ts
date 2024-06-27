import {test} from 'uvu';
import * as assert from 'uvu/assert';

import {create_counter} from '$lib/counter.js';

test('basic behavior', () => {
	const counter = create_counter();
	assert.is(counter(), 0);
	assert.is(counter(), 1);
	assert.is(counter(), 2);
});

test('custom count', () => {
	const counter = create_counter(1);
	assert.is(counter(), 1);
	assert.is(counter(), 2);
	assert.is(counter(), 3);
});

test.run();
