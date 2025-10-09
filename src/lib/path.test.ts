import {test, assert} from 'vitest';

import {
	parse_path_parts,
	parse_path_pieces,
	parse_path_segments,
	slugify,
	to_file_path,
} from '$lib/path.js';

test('to_file_path', () => {
	assert.strictEqual(to_file_path('/foo/bar/baz.ts'), '/foo/bar/baz.ts');
	assert.strictEqual(to_file_path('./foo/bar.ts'), './foo/bar.ts');
	assert.strictEqual(to_file_path('foo.ts'), 'foo.ts');
	assert.strictEqual(to_file_path(new URL('file:///foo/bar/baz.ts')), '/foo/bar/baz.ts');
});

test('parse_path_parts', () => {
	assert.deepEqual(parse_path_parts('/foo/bar/baz/'), ['/foo', '/foo/bar', '/foo/bar/baz']);
	assert.deepEqual(parse_path_parts('./foo/bar/baz.ts'), ['foo', 'foo/bar', 'foo/bar/baz.ts']);
	assert.deepEqual(parse_path_parts('foo/bar/baz.ts'), ['foo', 'foo/bar', 'foo/bar/baz.ts']);
	assert.deepEqual(parse_path_parts('foo/bar/baz/'), ['foo', 'foo/bar', 'foo/bar/baz']);
});

test('parse_path_segments', () => {
	assert.deepEqual(parse_path_segments('/foo/bar/baz.ts'), ['foo', 'bar', 'baz.ts']);
	assert.deepEqual(parse_path_segments('./foo/bar/baz.ts'), ['foo', 'bar', 'baz.ts']);
	assert.deepEqual(parse_path_segments('foo/bar/baz.ts'), ['foo', 'bar', 'baz.ts']);
	assert.deepEqual(parse_path_segments('foo/bar/baz/'), ['foo', 'bar', 'baz']);
});

test('parse_path_pieces', () => {
	assert.deepEqual(parse_path_pieces('/foo/bar/baz/'), [
		{type: 'separator', path: '/'},
		{type: 'piece', name: 'foo', path: '/foo'},
		{type: 'separator', path: '/foo'},
		{type: 'piece', name: 'bar', path: '/foo/bar'},
		{type: 'separator', path: '/foo/bar'},
		{type: 'piece', name: 'baz', path: '/foo/bar/baz'},
	]);
	assert.deepEqual(parse_path_pieces('./foo'), [
		{type: 'separator', path: '/'},
		{type: 'piece', name: 'foo', path: '/foo'},
	]);
	assert.deepEqual(parse_path_pieces('foo'), [
		{type: 'separator', path: '/'},
		{type: 'piece', name: 'foo', path: '/foo'},
	]);
});

test('slugify', () => {
	assert.strictEqual(slugify('AB'), 'ab');
	assert.strictEqual(slugify('A B'), 'a-b');
	assert.strictEqual(slugify('a, b!'), 'a-b');
	assert.strictEqual(slugify("a's b"), 'as-b');
	assert.strictEqual(slugify('a--b'), 'a-b');
	assert.strictEqual(slugify('-a-----b-'), 'a-b');
	assert.strictEqual(slugify('a_b'), 'a_b');
	assert.strictEqual(slugify('a_ b'), 'a_-b');
	assert.strictEqual(slugify('a _ b'), 'a-_-b');
	assert.strictEqual(slugify('   a b    c   '), 'a-b-c');
	assert.strictEqual(
		slugify(
			'ÁÄÂÀÃÅÆÞČÇĆĎĐÉĚËÈÊẼĔȆĞÍÌÎÏİŇÑÓÖÒÔÕØŘŔŠŞŤÚŮÜÙÛÝŸŽáäâàãåþčçćďđéěëèêẽĕȇğíìîïıňñóöòôõøðřŕšşßťúůüùûýÿž',
		),
		'aaaaaabcccddeeeeeeeegiiiiinnoooooorrsstuuuuuyyzaaaaaabcccddeeeeeeeegiiiiinnooooooorrssstuuuuuyyz',
	);
});
