import {test} from 'uvu';
import * as assert from 'uvu/assert';

import {parse_path_parts, parse_path_segments, slugify} from '$lib/path.js';

test('parse_path_parts', () => {
	assert.equal(parse_path_parts('/foo/bar/baz/'), ['/foo', '/foo/bar', '/foo/bar/baz']);
	assert.equal(parse_path_parts('./foo/bar/baz.ts'), ['foo', 'foo/bar', 'foo/bar/baz.ts']);
	assert.equal(parse_path_parts('foo/bar/baz.ts'), ['foo', 'foo/bar', 'foo/bar/baz.ts']);
	assert.equal(parse_path_parts('foo/bar/baz/'), ['foo', 'foo/bar', 'foo/bar/baz']);
});

test('parse_path_segments', () => {
	assert.equal(parse_path_segments('/foo/bar/baz.ts'), ['foo', 'bar', 'baz.ts']);
	assert.equal(parse_path_segments('./foo/bar/baz.ts'), ['foo', 'bar', 'baz.ts']);
	assert.equal(parse_path_segments('foo/bar/baz.ts'), ['foo', 'bar', 'baz.ts']);
	assert.equal(parse_path_segments('foo/bar/baz/'), ['foo', 'bar', 'baz']);
});

// /**
//  * Treats all paths as absolute, so the first piece is always a `'/'` with type `'separator'`.
//  * @todo maybe rethink this API, it's a bit weird, but fits the usage in `ui/Breadcrumbs.svelte`
//  */
// export const parse_path_pieces = (raw_path: string): Path_Piece[] => {

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
			'ÁÄÂÀÃÅÆÞČÇĆĎĐÉĚËÈÊẼĔȆĞÍÌÎÏİŇÑÓÖÒÔÕØŘŔŠŞŤÚŮÜÙÛÝŸŽáäâàãåþčçćďđéěëèêẽĕȇğíìîïıňñóöòôõøðřŕšşßťúůüùûýÿž',
		),
		'aaaaaabcccddeeeeeeeegiiiiinnoooooorrsstuuuuuyyzaaaaaabcccddeeeeeeeegiiiiinnooooooorrssstuuuuuyyz',
	);
});

test.run();
