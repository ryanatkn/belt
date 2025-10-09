import {describe, test, assert} from 'vitest';

import {map_record, omit, pick_by, omit_undefined, reorder, traverse} from '$lib/object.ts';

describe('map_record', () => {
	test('basic behavior', () => {
		assert.deepStrictEqual(
			map_record({a: 1, b: 2}, (v, k) => v + k),
			{a: '1a', b: '2b'},
		);
		assert.deepStrictEqual(
			map_record({}, (v, k) => v + k),
			{},
		);
	});
});

describe('omit', () => {
	test('basic behavior', () => {
		assert.deepStrictEqual(omit({a: 1, b: 2}, ['b']), {a: 1});
		assert.deepStrictEqual(omit({a: 1, b: 2}, []), {a: 1, b: 2});
		assert.deepStrictEqual(omit({a: 1, b: 2}, ['b', 'a']), {});
	});
});

describe('pick_by', () => {
	test('basic behavior', () => {
		assert.deepStrictEqual(
			pick_by({a: 1, b: 2}, (v) => v === 1),
			{a: 1},
		);
		assert.deepStrictEqual(
			pick_by({a: 1, b: 2}, (_v, k) => k === 'a'),
			{a: 1},
		);
		assert.deepStrictEqual(
			pick_by({a: 1, b: 2}, () => false),
			{},
		);
		assert.deepStrictEqual(
			pick_by({a: 1, b: 2}, () => true),
			{a: 1, b: 2},
		);
	});
});

describe('omit_undefined', () => {
	test('basic behavior', () => {
		assert.deepStrictEqual(omit_undefined({a: 1, b: undefined, c: undefined}), {a: 1});
		assert.deepStrictEqual(omit_undefined({a: undefined, b: 2, c: undefined}), {b: 2});
		assert.deepStrictEqual(omit_undefined({a: 1, b: 2}), {a: 1, b: 2});
		assert.deepStrictEqual(omit_undefined({a: undefined, b: undefined}), {} as any);
		assert.deepStrictEqual(omit_undefined({}), {});
	});
});

describe('reorder', () => {
	test('basic behavior', () => {
		assert.strictEqual(
			JSON.stringify(reorder({a: 1, b: 2, c: 3, d: 4}, ['d', 'b', 'c', 'a'])),
			JSON.stringify({d: 4, b: 2, c: 3, a: 1}),
		);
	});
});

describe('traverse', () => {
	test('basic behavior', () => {
		const results: Array<string> = [];
		const obj = {a: 1, b: {c: 2, d: ['33', undefined]}, e: null};
		traverse(obj, (key, value, obj) => results.push(key, value, obj));
		assert.deepStrictEqual(results, [
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
});
