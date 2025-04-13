import {suite} from 'uvu';
import * as assert from 'uvu/assert';

import {map_record, omit, pick_by, omit_undefined, reorder, traverse} from '$lib/object.js';

/* test__map_record */
const test__map_record = suite('map_record');

test__map_record('basic behavior', () => {
	assert.equal(
		map_record({a: 1, b: 2}, (v, k) => v + k),
		{a: '1a', b: '2b'},
	);
	assert.equal(
		map_record({}, (v, k) => v + k),
		{},
	);
});

test__map_record.run();
/* test__map_record */

/* test__omit */
const test__omit = suite('omit');

test__omit('basic behavior', () => {
	assert.equal(omit({a: 1, b: 2}, ['b']), {a: 1});
	assert.equal(omit({a: 1, b: 2}, []), {a: 1, b: 2});
	assert.equal(omit({a: 1, b: 2}, ['b', 'a']), {});
});

test__omit.run();
/* test__omit */

/* test__pick_by */
const test__pick_by = suite('pick_by');

test__pick_by('basic behavior', () => {
	assert.equal(
		pick_by({a: 1, b: 2}, (v) => v === 1),
		{a: 1},
	);
	assert.equal(
		pick_by({a: 1, b: 2}, (_v, k) => k === 'a'),
		{a: 1},
	);
	assert.equal(
		pick_by({a: 1, b: 2}, () => false),
		{},
	);
	assert.equal(
		pick_by({a: 1, b: 2}, () => true),
		{a: 1, b: 2},
	);
});

test__pick_by.run();
/* test__pick_by */

/* test__omit_undefined */
const test__omit_undefined = suite('omit_undefined');

test__omit_undefined('basic behavior', () => {
	assert.equal(omit_undefined({a: 1, b: undefined, c: undefined}), {a: 1});
	assert.equal(omit_undefined({a: undefined, b: 2, c: undefined}), {b: 2});
	assert.equal(omit_undefined({a: 1, b: 2}), {a: 1, b: 2});
	assert.equal(omit_undefined({a: undefined, b: undefined}), {} as any);
	assert.equal(omit_undefined({}), {});
});

test__omit_undefined.run();
/* test__omit_undefined */

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
	const results: Array<string> = [];
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
