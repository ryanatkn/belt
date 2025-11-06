import {test_equal_values, test_unequal_values} from './deep_equal_test_helpers.js';

// equal objects
test_equal_values([
	// basic objects
	['empty objects', {}, {}],
	['simple objects', {a: 1, b: 2}, {a: 1, b: 2}],
	['objects with shuffled keys', {a: 1, b: 2, c: 3}, {c: 3, a: 1, b: 2}],
	['objects with string values', {name: 'alice', role: 'admin'}, {name: 'alice', role: 'admin'}],
	['objects with mixed types', {num: 1, str: 'hi', bool: true}, {num: 1, str: 'hi', bool: true}],

	// nested objects
	['nested objects', {a: {b: 1}}, {a: {b: 1}}],
	['deeply nested objects', {a: {b: {c: {d: 1}}}}, {a: {b: {c: {d: 1}}}}],
	[
		'complex nested objects',
		{a: 1, b: {c: {d: {e: 1, f: {g: {h1: 1, h2: 2}, i: 1}}}, j: 1}},
		{a: 1, b: {c: {d: {e: 1, f: {g: {h2: 2, h1: 1}, i: 1}}}, j: 1}},
	],

	// objects with null/undefined values
	['objects with null', {a: null}, {a: null}],
	['objects with undefined', {a: undefined}, {a: undefined}],
	['objects with mixed null/undefined', {a: null, b: undefined}, {a: null, b: undefined}],

	// objects with special values
	['objects with NaN', {value: NaN}, {value: NaN}],
	['objects with infinity', {value: Infinity}, {value: Infinity}],
	['objects with arrays', {items: [1, 2, 3]}, {items: [1, 2, 3]}],
]);

// unequal objects
test_unequal_values([
	// basic differences
	['empty object and non-empty', {}, {a: 1}],
	['objects with different values', {a: 1, b: 2}, {a: 1, b: 3}],
	['objects with different key counts', {a: 1}, {a: 1, b: 2}],
	['objects with differently named keys', {a: 1, b: 2}, {a: 1, c: 2}],
	['object and null', {}, null],
	['object and undefined', {}, undefined],
	['object with props and array', {a: 1}, []],

	// nested differences
	['nested objects with different values', {a: {b: 1}}, {a: {b: 2}}],
	['nested objects with different depth', {a: {b: 1}}, {a: {b: {c: 1}}}],
	[
		'complex objects with one difference',
		{a: 1, b: {c: {d: {e: 1, f: {g: {h1: 1, h2: 2}, i: 1}}}, j: 1}},
		{a: 1, b: {c: {d: {e: 1, f: {g: {h2: 3, h1: 1}, i: 1}}}, j: 1}},
	],

	// null/undefined differences
	['null vs undefined in object', {a: null}, {a: undefined}],
	['present key vs missing key', {a: 1, b: 2}, {a: 1}],
	['undefined value vs missing key', {a: undefined}, {}],

	// type mismatches within objects
	['number vs string in object', {value: 1}, {value: '1'}],
	['array vs object', {items: [1, 2]}, {items: {0: 1, 1: 2}}],
]);
