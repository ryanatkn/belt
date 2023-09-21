import {suite} from 'uvu';
import * as assert from 'uvu/assert';

import {create_counter} from './counter.js';

/* test__create_counter */
const test__create_counter = suite('create_counter');

test__create_counter('basic behavior', () => {
	const counter = create_counter();
	assert.is(counter(), 0);
	assert.is(counter(), 1);
	assert.is(counter(), 2);
});

test__create_counter('custom count', () => {
	const counter = create_counter(1);
	assert.is(counter(), 1);
	assert.is(counter(), 2);
	assert.is(counter(), 3);
});

test__create_counter.run();
/* test__create_counter */
