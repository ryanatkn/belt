import {test} from 'uvu';
import * as assert from 'uvu/assert';

import {to_array} from './array.js';

test('basic behavior', () => {
	const array = [1, 2, 3];
	assert.is(array, to_array(array));
	assert.equal([1], to_array(1));
	assert.equal([{a: 1}], to_array({a: 1}));
});

test.run();
