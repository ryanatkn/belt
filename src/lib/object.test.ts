import {suite} from 'uvu';
import * as assert from 'uvu/assert';

import {mapRecord, omit, pickBy, omitUndefined, reorder, traverse} from './object.js';

/* test__mapRecord */
const test__mapRecord = suite('mapRecord');

test__mapRecord('basic behavior', () => {
	assert.equal(
		mapRecord({a: 1, b: 2}, (v, k) => v + k),
		{a: '1a', b: '2b'},
	);
	assert.equal(
		mapRecord({}, (v, k) => v + k),
		{},
	);
});

test__mapRecord.run();
/* test__mapRecord */

/* test__omit */
const test__omit = suite('omit');

test__omit('basic behavior', () => {
	assert.equal(omit({a: 1, b: 2}, ['b']), {a: 1});
	assert.equal(omit({a: 1, b: 2}, []), {a: 1, b: 2});
	assert.equal(omit({a: 1, b: 2}, ['b', 'a']), {});
});

test__omit.run();
/* test__omit */

/* test__pickBy */
const test__pickBy = suite('pickBy');

test__pickBy('basic behavior', () => {
	assert.equal(
		pickBy({a: 1, b: 2}, (v) => v === 1),
		{a: 1},
	);
	assert.equal(
		pickBy({a: 1, b: 2}, (_v, k) => k === 'a'),
		{a: 1},
	);
	assert.equal(
		pickBy({a: 1, b: 2}, () => false),
		{},
	);
	assert.equal(
		pickBy({a: 1, b: 2}, () => true),
		{a: 1, b: 2},
	);
});

test__pickBy.run();
/* test__pickBy */

/* test__omitUndefined */
const test__omitUndefined = suite('omitUndefined');

test__omitUndefined('basic behavior', () => {
	assert.equal(omitUndefined({a: 1, b: undefined, c: undefined}), {a: 1});
	assert.equal(omitUndefined({a: undefined, b: 2, c: undefined}), {b: 2});
	assert.equal(omitUndefined({a: 1, b: 2}), {a: 1, b: 2});
	assert.equal(omitUndefined({a: undefined, b: undefined}), {} as any);
	assert.equal(omitUndefined({}), {});
});

test__omitUndefined.run();
/* test__omitUndefined */

/* test__reorder */
const test__reorder = suite('reorder');

test__reorder('basic behavior', () => {
	assert.is(
		JSON.stringify(reorder({a: 1, b: 2, c: 3, d: 4}, ['d', 'b', 'c', 'a'])),
		JSON.stringify({d: 4, b: 2, c: 3, a: 1}),
	);
});

test__reorder.run();
/* test__reorder */

/* test__traverse */
const test__traverse = suite('traverse');

test__traverse('basic behavior', () => {
	const results: string[] = [];
	const obj = {a: 1, b: {c: 2, d: ['33', undefined]}, e: null};
	traverse(obj, (key, value, obj) => results.push(key, value, obj));
	assert.equal(results, [
		'a',
		1,
		obj,
		'b',
		{c: 2, d: ['33', undefined]},
		obj,
		'c',
		2,
		obj.b,
		'd',
		['33', undefined],
		obj.b,
		'0',
		'33',
		obj.b.d,
		'1',
		undefined,
		obj.b.d,
		'e',
		null,
		obj,
	]);
});

test__traverse.run();
/* test__traverse */
