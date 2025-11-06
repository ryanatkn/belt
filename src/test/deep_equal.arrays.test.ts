import {test, assert} from 'vitest';
import {deep_equal} from '$lib/deep_equal.js';
import {test_equal_values, test_unequal_values} from './deep_equal_test_helpers.js';

// note: arrays are NOT equal to objects (different type check via instanceof)
test('array vs object behavior', () => {
	assert.ok(!deep_equal([1, 2], {0: 1, 1: 2, length: 2}));
	assert.ok(!deep_equal(['a', 'b'], {0: 'a', 1: 'b', length: 2}));
	// even empty arrays are not equal to empty objects (instanceof check)
	assert.ok(!deep_equal([], {}));
});

// equal arrays
test_equal_values([
	// basic arrays
	['empty arrays', [], []],
	['arrays with numbers', [1, 2, 3], [1, 2, 3]],
	['arrays with strings', ['apple', 'banana'], ['apple', 'banana']],
	['arrays with mixed types', [1, 'two', true, null], [1, 'two', true, null]],
	['single element arrays', [42], [42]],

	// nested arrays
	['nested arrays', [1, [2, 3]], [1, [2, 3]]],
	['deeply nested arrays', [1, [[[[1, 'd'], 'c'], 'b'], 'a']], [1, [[[[1, 'd'], 'c'], 'b'], 'a']]],
	['arrays with nested objects', [{a: 1}, {b: 2}], [{a: 1}, {b: 2}]],
	['mixed nesting', [1, {a: [2, 3]}, [4, {b: 5}]], [1, {a: [2, 3]}, [4, {b: 5}]]],

	// typed arrays
	['Uint8Array', new Uint8Array([1, 2, 3]), new Uint8Array([1, 2, 3])],
	['Int8Array', new Int8Array([-1, 0, 1]), new Int8Array([-1, 0, 1])],
	['Uint16Array', new Uint16Array([256, 512]), new Uint16Array([256, 512])],
	['Int16Array', new Int16Array([-256, 256]), new Int16Array([-256, 256])],
	['Uint32Array', new Uint32Array([1000, 2000]), new Uint32Array([1000, 2000])],
	['Int32Array', new Int32Array([-1000, 1000]), new Int32Array([-1000, 1000])],
	['Float32Array', new Float32Array([1.5, 2.5]), new Float32Array([1.5, 2.5])],
	['Float64Array', new Float64Array([1.5, 2.5]), new Float64Array([1.5, 2.5])],

	// special values in arrays
	['arrays with NaN', [NaN, 1, 2], [NaN, 1, 2]],
	['arrays with undefined', [1, undefined, 3], [1, undefined, 3]],
	['arrays with null', [1, null, 3], [1, null, 3]],
]);

// unequal arrays
test_unequal_values([
	// basic differences
	['arrays with different elements', [1, 2], [1, 3]],
	['arrays with different lengths', [1, 2, 3], [1, 2]],
	['empty array and array with undefined', [], [undefined]],
	['arrays with differently sorted elements', [1, 'apple'], ['apple', 1]],
	['arrays with different types', [1, 2, 3], [1, '2', 3]],
	['array and null', [], null],
	['array and undefined', [], undefined],

	// nested differences
	['nested arrays with differences', [1, [2, 3]], [1, [2, 4]]],
	['nested arrays with different depths', [1, [2]], [1, [2, [3]]]],
	['deeply nested arrays', [1, [[[[1, 'd'], 'c'], 'b'], 'a']], [1, [[[[1, 'D'], 'c'], 'b'], 'a']]],

	// typed array differences
	[
		'typed arrays with differently sorted elements',
		new Uint8Array([1, 2, 3]),
		new Uint8Array([1, 3, 2]),
	],
	// note: typed arrays are treated as arrays, so types and values are compared the same way
	// ['different typed array types', new Uint8Array([1, 2, 3]), new Int8Array([1, 2, 3])],
	// ['typed array and regular array', new Uint8Array([1, 2, 3]), [1, 2, 3]],

	// special value differences
	['NaN position differences', [1, NaN, 3], [1, 3, NaN]],
	['null vs undefined in array', [1, null, 3], [1, undefined, 3]],
]);
