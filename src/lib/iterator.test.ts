import {test} from 'uvu';
import * as assert from 'uvu/assert';

import {count_iterator} from '$lib/iterator.js';

test('count_iterator', () => {
	assert.is(count_iterator('test'), 4);
	assert.is(count_iterator([1, '2', false]), 3);
	assert.is(count_iterator(new Intl.Segmenter().segment('abcde')), 5);
});
