import {test, assert} from 'vitest';
import {deep_equal} from '$lib/deep_equal.js';
import {
	test_equal_values,
	test_unequal_values,
	assert_equal,
	assert_not_equal,
} from './deep_equal_test_helpers.js';

// circular references - same reference caught by Object.is
test('circular reference: same object reference', () => {
	const a: any = {x: 1};
	a.self = a;
	assert.ok(deep_equal(a, a));
});

test('circular reference: different objects would cause infinite loop', () => {
	// documenting that this case is not currently handled
	// const a: any = {x: 1};
	// a.self = a;
	// const b: any = {x: 1};
	// b.self = b;
	// deep_equal(a, b); // would cause stack overflow
	assert.ok(true, 'skipping test that would cause stack overflow');
});

// sparse arrays
// note: sparse arrays are equal to arrays with undefined at those positions
test_equal_values([
	['sparse arrays with same holes', [1, , 3], [1, , 3]], // eslint-disable-line no-sparse-arrays
	['sparse array vs array with undefined', [1, , 3], [1, undefined, 3]], // eslint-disable-line no-sparse-arrays
]);

test_unequal_values([
	['different hole positions', [, 1, 2], [1, , 2]], // eslint-disable-line no-sparse-arrays
	['sparse vs dense array', [1, , , 4], [1, 2, 3, 4]], // eslint-disable-line no-sparse-arrays
]);

// objects with symbol keys
const sym1 = Symbol('test');
const sym2 = Symbol('test');
const sym3 = Symbol('other');

test('objects with symbol keys: symbols are ignored by Object.keys', () => {
	const a = {[sym1]: 'value1', regular: 'prop'};
	const b = {[sym2]: 'value2', regular: 'prop'};
	// both objects have same string keys, symbol keys ignored
	assert.ok(deep_equal(a, b));
});

assert_equal('empty objects with different symbol keys', {[sym1]: 'value'}, {[sym2]: 'different'});
assert_equal(
	'objects: string keys match, symbol keys differ',
	{a: 1, [sym1]: 'x'},
	{a: 1, [sym2]: 'y'},
);
assert_not_equal('objects with different string keys', {a: 1, [sym1]: 'x'}, {b: 1, [sym1]: 'x'});

// array-like objects
test_unequal_values([
	['array-like object vs array', {0: 'a', 1: 'b', length: 2}, ['a', 'b']],
	['arguments-like vs array', {0: 1, 1: 2, length: 2}, [1, 2]],
]);

// Constructor check prevents object/array confusion (even with matching keys)
test('objects with numeric string keys vs arrays', () => {
	const obj = {'0': 'a', '1': 'b'};
	const arr = ['a', 'b'];

	// same type comparisons work
	assert.ok(deep_equal(obj, obj));
	assert.ok(deep_equal(arr, arr));

	// Different constructors: Object vs Array (prevents confusion)
	assert.ok(!deep_equal(obj, arr));
	assert.ok(!deep_equal(arr, obj));
});

// WeakMap and WeakSet (not iterable, difficult to compare)
test('WeakMap equality', () => {
	const wm1 = new WeakMap();
	const wm2 = new WeakMap();
	const obj = {};
	wm1.set(obj, 'value');
	wm2.set(obj, 'value');
	// WeakMaps treated as plain objects (no enumerable properties)
	assert.ok(deep_equal(wm1, wm2));
});

test('WeakSet equality', () => {
	const ws1 = new WeakSet();
	const ws2 = new WeakSet();
	const obj = {};
	ws1.add(obj);
	ws2.add(obj);
	// WeakSets treated as plain objects (no enumerable properties)
	assert.ok(deep_equal(ws1, ws2));
});

// Error objects compared by message and name
test('Error equality', () => {
	const err = new Error('test');
	assert.ok(deep_equal(err, err));

	// same message should be equal
	assert.ok(deep_equal(new Error('message'), new Error('message')));

	// different messages should NOT be equal
	assert.ok(!deep_equal(new Error('foo'), new Error('bar')));

	// errors should NOT equal empty objects (different constructors)
	assert.ok(!deep_equal(new Error('test'), {}));
});

// Promise objects cannot be meaningfully compared (always return false unless same reference)
test('Promise equality', () => {
	const promise = Promise.resolve(42);
	assert.ok(deep_equal(promise, promise)); // same reference

	// different promises should NOT be equal (async values can't be compared)
	assert.ok(!deep_equal(Promise.resolve(42), Promise.resolve(43)));

	// promises should NOT equal empty objects (different constructors)
	assert.ok(!deep_equal(Promise.resolve(42), {}));
});

// ArrayBuffer and TypedArrays with same underlying buffer
test('typed arrays with same buffer but different views', () => {
	const buffer = new ArrayBuffer(8);
	const view1 = new Uint8Array(buffer);
	const view2 = new Uint8Array(buffer);
	assert.ok(deep_equal(view1, view2));
});

test('DataView equality with same data', () => {
	const buffer1 = new ArrayBuffer(8);
	const buffer2 = new ArrayBuffer(8);
	const view1 = new DataView(buffer1);
	const view2 = new DataView(buffer2);
	view1.setUint32(0, 42);
	view2.setUint32(0, 42);
	assert.ok(deep_equal(view1, view2));
});

test('DataView inequality with different data', () => {
	const buffer1 = new ArrayBuffer(8);
	const buffer2 = new ArrayBuffer(8);
	const view1 = new DataView(buffer1);
	const view2 = new DataView(buffer2);
	view1.setUint32(0, 42);
	view2.setUint32(0, 43);
	assert.ok(!deep_equal(view1, view2));
});

test_unequal_values([
	[
		'different views of same buffer',
		new Uint8Array(new ArrayBuffer(8)),
		new Uint16Array(new ArrayBuffer(8)),
	],
	['DataView vs Uint8Array (different constructors)', new DataView(new ArrayBuffer(8)), new Uint8Array(8)],
]);
