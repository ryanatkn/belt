import {suite} from 'uvu';
import * as assert from 'uvu/assert';

import {to_array} from './array.js';

/* test__to_array */
const test__to_array = suite('to_array');

test__to_array('basic behavior', () => {
	const array = [1, 2, 3];
	assert.is(array, to_array(array));
	assert.equal([1], to_array(1));
	assert.equal([{a: 1}], to_array({a: 1}));
});

test__to_array.run();
/* test__to_array */
