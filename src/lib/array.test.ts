import {suite} from 'uvu';
import * as assert from 'uvu/assert';

import {toArray} from './array.js';

/* test__toArray */
const test__toArray = suite('toArray');

test__toArray('basic behavior', () => {
	const array = [1, 2, 3];
	assert.is(array, toArray(array));
	assert.equal([1], toArray(1));
	assert.equal([{a: 1}], toArray({a: 1}));
});

test__toArray.run();
/* test__toArray */
