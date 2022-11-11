import {suite} from 'uvu';
import * as assert from 'uvu/assert';

import {toCounter} from '$lib/counter.js';

/* test__toCounter */
const test__toCounter = suite('toCounter');

test__toCounter('basic behavior', () => {
	const counter = toCounter();
	assert.is(counter(), 0);
	assert.is(counter(), 1);
	assert.is(counter(), 2);
});

test__toCounter('custom count', () => {
	const counter = toCounter(1);
	assert.is(counter(), 1);
	assert.is(counter(), 2);
	assert.is(counter(), 3);
});

test__toCounter.run();
/* test__toCounter */
