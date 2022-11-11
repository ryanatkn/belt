import {suite} from 'uvu';
import * as assert from 'uvu/assert';

import {replaceExtension, toPathStem, toCommonBaseDir} from '$lib/path.js';
import {toPathParts, toPathPieces, toPathSegments} from '$lib/path-parsing.js';

/* test__replaceExtension */
const test__replaceExtension = suite('replaceExtension');

test__replaceExtension('basic behavior', () => {
	assert.is(replaceExtension('foo.ts', '.js'), 'foo.js');
	assert.is(replaceExtension('foo.ts', ''), 'foo');
	assert.is(replaceExtension('foo.ts', 'js'), 'foojs');
	assert.is(replaceExtension('foo', '.js'), 'foo.js');
});

test__replaceExtension.run();
/* test__replaceExtension */

/* test__toPathStem */
const test__toPathStem = suite('toPathStem');

test__toPathStem('basic behavior', () => {
	assert.is(toPathStem('foo.ts'), 'foo');
	assert.is(toPathStem('foo'), 'foo');
	assert.is(toPathStem('/absolute/bar/foo.ts'), 'foo');
	assert.is(toPathStem('./relative/bar/foo.ts'), 'foo');
	assert.is(toPathStem('relative/bar/foo.ts'), 'foo');
});

test__toPathStem.run();
/* test__toPathStem */

/* test__toPathSegments */
const test__toPathSegments = suite('toPathSegments');

test__toPathSegments('basic behavior', () => {
	assert.equal(toPathSegments('foo/bar/baz.ts'), ['foo', 'bar', 'baz.ts']);
});

test__toPathSegments('leading dot', () => {
	assert.equal(toPathSegments('./foo/bar/baz.ts'), ['foo', 'bar', 'baz.ts']);
});

test__toPathSegments('leading two dots', () => {
	assert.equal(toPathSegments('../../foo/bar/baz.ts'), ['foo', 'bar', 'baz.ts']);
});

test__toPathSegments('leading slash', () => {
	assert.equal(toPathSegments('/foo/bar/baz.ts'), ['foo', 'bar', 'baz.ts']);
});

test__toPathSegments('trailing slash', () => {
	assert.equal(toPathSegments('foo/bar/baz/'), ['foo', 'bar', 'baz']);
});

test__toPathSegments.run();
/* test__toPathSegments */

/* test__toPathParts */
const test__toPathParts = suite('toPathParts');

test__toPathParts('basic behavior', () => {
	assert.equal(toPathParts('foo/bar/baz.ts'), ['foo', 'foo/bar', 'foo/bar/baz.ts']);
});

test__toPathParts('leading dot', () => {
	assert.equal(toPathParts('./foo/bar/baz.ts'), ['foo', 'foo/bar', 'foo/bar/baz.ts']);
});

test__toPathParts('leading slash', () => {
	assert.equal(toPathParts('/foo/bar/baz.ts'), ['/foo', '/foo/bar', '/foo/bar/baz.ts']);
});

test__toPathParts('trailing slash', () => {
	assert.equal(toPathParts('foo/bar/baz/'), ['foo', 'foo/bar', 'foo/bar/baz']);
});

test__toPathParts.run();
/* test__toPathParts */

/* test__toPathPieces */
const test__toPathPieces = suite('toPathPieces');

test__toPathPieces('basic behavior', () => {
	assert.equal(toPathPieces('foo/bar/baz.ts'), [
		{type: 'separator', path: '/'},
		{type: 'piece', name: 'foo', path: '/foo'},
		{type: 'separator', path: '/foo'},
		{type: 'piece', name: 'bar', path: '/foo/bar'},
		{type: 'separator', path: '/foo/bar'},
		{type: 'piece', name: 'baz.ts', path: '/foo/bar/baz.ts'},
	]);
});

test__toPathPieces('leading dot', () => {
	assert.equal(toPathPieces('./foo/bar/baz.ts'), [
		{type: 'separator', path: '/'},
		{type: 'piece', name: 'foo', path: '/foo'},
		{type: 'separator', path: '/foo'},
		{type: 'piece', name: 'bar', path: '/foo/bar'},
		{type: 'separator', path: '/foo/bar'},
		{type: 'piece', name: 'baz.ts', path: '/foo/bar/baz.ts'},
	]);
});

test__toPathPieces('leading slash', () => {
	assert.equal(toPathPieces('/foo/bar/baz.ts'), [
		{type: 'separator', path: '/'},
		{type: 'piece', name: 'foo', path: '/foo'},
		{type: 'separator', path: '/foo'},
		{type: 'piece', name: 'bar', path: '/foo/bar'},
		{type: 'separator', path: '/foo/bar'},
		{type: 'piece', name: 'baz.ts', path: '/foo/bar/baz.ts'},
	]);
});

test__toPathPieces('trailing slash', () => {
	assert.equal(toPathPieces('foo/bar/baz/'), [
		{type: 'separator', path: '/'},
		{type: 'piece', name: 'foo', path: '/foo'},
		{type: 'separator', path: '/foo'},
		{type: 'piece', name: 'bar', path: '/foo/bar'},
		{type: 'separator', path: '/foo/bar'},
		{type: 'piece', name: 'baz', path: '/foo/bar/baz'},
	]);
});

test__toPathPieces.run();
/* test__toPathPieces */

/* test__toCommonBaseDir */
const test__toCommonBaseDir = suite('toCommonBaseDir');

test__toCommonBaseDir('basic behavior', () => {
	assert.is(toCommonBaseDir(['a/b/c.ts', 'a/b/c/d.ts', 'a/b/c/e.ts', 'a/b/c/e/f']), 'a/b');
});

test__toCommonBaseDir.run();
/* test__toCommonBaseDir */
