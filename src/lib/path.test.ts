import {test} from 'uvu';
import * as assert from 'uvu/assert';

import {parse_path_parts, parse_path_pieces, parse_path_segments, slugify} from '$lib/path.js';

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

test('parse_path_pieces', () => {
	assert.equal(parse_path_pieces('/foo/bar/baz/'), [
		{type: 'separator', path: '/'},
		{type: 'piece', name: 'foo', path: '/foo'},
		{type: 'separator', path: '/foo'},
		{type: 'piece', name: 'bar', path: '/foo/bar'},
		{type: 'separator', path: '/foo/bar'},
		{type: 'piece', name: 'baz', path: '/foo/bar/baz'},
	]);
	assert.equal(parse_path_pieces('./foo'), [
		{type: 'separator', path: '/'},
		{type: 'piece', name: 'foo', path: '/foo'},
	]);
	assert.equal(parse_path_pieces('foo'), [
		{type: 'separator', path: '/'},
		{type: 'piece', name: 'foo', path: '/foo'},
	]);
});

test('slugify', () => {
	assert.is(slugify('AB'), 'ab');
	assert.is(slugify('A B'), 'a-b');
	assert.is(slugify('a, b!'), 'a-b');
	assert.is(slugify("a's b"), 'as-b');
	assert.is(slugify('a--b'), 'a-b');
	assert.is(slugify('-a-----b-'), 'a-b');
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
