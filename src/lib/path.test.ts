import {test} from 'uvu';
import * as assert from 'uvu/assert';

import {slugify} from '$lib/path.js';

// TODO test parse_path_parts etc

test('slugify', () => {
	assert.is(slugify('AB'), 'ab');
	assert.is(slugify('A B'), 'a-b');
	assert.is(slugify('a, b!'), 'a-b');
	assert.is(slugify("a's b"), 'as-b');
	assert.is(slugify('a_b'), 'a_b');
	assert.is(slugify('a_ b'), 'a_-b');
	assert.is(slugify('a _ b'), 'a-_-b');
	assert.is(slugify('   a b    c   '), 'a-b-c');
	assert.is(
		slugify(
			'abcÁÄÂÀÃÅČÇĆĎĐÉĚËÈÊẼĔȆĞÍÌÎÏİŇÑÓÖÒÔÕØŘŔŠŞŤÚŮÜÙÛÝŸŽáäâàãåčçćďéěëèêẽĕȇğíìîïıňñóöòôõøðřŕšşťúůüùûýÿžþÞđabc',
		),
		'abcaaaaaacccddeeeeeeeegiiiiinnoooooorrsstuuuuuyyzaaaaaacccdeeeeeeeegiiiiinnooooooorrsstuuuuuyyzbbdabc',
	);
});

test.run();
