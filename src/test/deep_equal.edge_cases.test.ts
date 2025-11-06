import {test, assert} from 'vitest';
import {deep_equal} from '$lib/deep_equal.js';
import {test_equal_values, test_unequal_values} from './deep_equal_test_helpers.js';

// objects with different prototypes
class ClassA {
	x = 1;
}
class ClassB {
	x = 1;
}

test('objects with different prototypes but same properties', () => {
	// Constructor check prevents type confusion (security)
	// Even with same properties, different classes are not equal
	assert.ok(!deep_equal(new ClassA(), new ClassB()));
});

test('class instance vs plain object', () => {
	// Constructor check prevents type confusion (security)
	// Class instance ≠ plain object, even with same properties
	assert.ok(!deep_equal(new ClassA(), {x: 1}));
});

// inherited properties (not compared by Object.keys)
test('objects with inherited properties', () => {
	const proto = {inherited: 'value'};
	const a = Object.create(proto);
	a.own = 'property';
	const b = Object.create(proto);
	b.own = 'property';
	// only own properties compared
	assert.ok(deep_equal(a, b));
});

test('object with inherited vs without', () => {
	const proto = {inherited: 'value'};
	const a = Object.create(proto);
	a.own = 'property';
	const b = {own: 'property'};
	// same own properties, inheritance ignored
	assert.ok(deep_equal(a, b));
});

// non-enumerable properties
test('objects with non-enumerable properties', () => {
	const a = {visible: 1};
	Object.defineProperty(a, 'hidden', {value: 2, enumerable: false});

	const b = {visible: 1};
	Object.defineProperty(b, 'hidden', {value: 999, enumerable: false});

	// non-enumerable properties ignored
	assert.ok(deep_equal(a, b));
});

test('object with non-enumerable vs without', () => {
	const a = {visible: 1};
	Object.defineProperty(a, 'hidden', {value: 2, enumerable: false});

	const b = {visible: 1};

	assert.ok(deep_equal(a, b));
});

// getters and setters
test('objects with getters', () => {
	let counter = 0;
	const a = {
		get value() {
			return counter++;
		},
	};

	// getter called twice during comparison, but Object.is on same reference is checked first
	assert.ok(deep_equal(a, a));

	// different objects with stateful getters
	const b = {
		get value() {
			return counter++;
		},
	};
	// these would be unequal because getter returns different values on each call
	assert.ok(!deep_equal(a, b));
});

test('objects with same getter implementations', () => {
	const a = {
		get value() {
			return 42;
		},
	};
	const b = {
		get value() {
			return 42;
		},
	};

	// compares the returned values, not the getter functions
	assert.ok(deep_equal(a, b));
});

// frozen, sealed, and non-extensible objects
test_equal_values([
	['frozen objects', Object.freeze({a: 1}), Object.freeze({a: 1})],
	['sealed objects', Object.seal({a: 1}), Object.seal({a: 1})],
	['non-extensible objects', Object.preventExtensions({a: 1}), Object.preventExtensions({a: 1})],
	['frozen vs non-frozen', Object.freeze({a: 1}), {a: 1}],
]);

// objects with property descriptors
test('objects with different property descriptors but same values', () => {
	const a = {};
	Object.defineProperty(a, 'prop', {value: 1, writable: true, enumerable: true});

	const b = {};
	Object.defineProperty(b, 'prop', {value: 1, writable: false, enumerable: true});

	// descriptor attributes ignored, only values compared
	assert.ok(deep_equal(a, b));
});

// objects with Symbol.toStringTag
test('objects with custom toString tags', () => {
	const a = {[Symbol.toStringTag]: 'CustomA', value: 1};
	const b = {[Symbol.toStringTag]: 'CustomB', value: 1};

	// symbol keys ignored
	assert.ok(deep_equal(a, b));
});

// objects with Symbol.iterator
test('objects with custom iterators', () => {
	const a = {
		data: [1, 2, 3],
		*[Symbol.iterator]() {
			yield* this.data;
		},
	};
	const b = {
		data: [1, 2, 3],
		*[Symbol.iterator]() {
			yield* this.data;
		},
	};

	// only enumerable string-keyed properties compared
	assert.ok(deep_equal(a, b));
});

// Boxed primitives compared by their primitive values using .valueOf()
test('boxed primitives', () => {
	// same reference should be equal
	const boxed_num = new Number(42);
	const boxed_bool = new Boolean(true);
	assert.ok(deep_equal(boxed_num, boxed_num));
	assert.ok(deep_equal(boxed_bool, boxed_bool));

	// same values should be equal
	assert.ok(deep_equal(new Number(42), new Number(42)));
	assert.ok(deep_equal(new Boolean(true), new Boolean(true)));

	// different values should NOT be equal
	assert.ok(!deep_equal(new Number(1), new Number(2)));
	assert.ok(!deep_equal(new Boolean(true), new Boolean(false)));

	// boxed primitives should NOT equal empty objects (different constructors)
	assert.ok(!deep_equal(new Number(42), {}));
	assert.ok(!deep_equal(new Boolean(true), {}));

	// Strings work correctly (have enumerable character properties)
	assert.ok(!deep_equal(new String('hello'), new String('world')));
	assert.ok(deep_equal(new String('hello'), new String('hello')));
	assert.ok(!deep_equal(new String('hi'), {}));
});

test_unequal_values([
	['boxed number vs primitive', new Number(42), 42],
	['boxed string vs primitive', new String('hello'), 'hello'],
	['boxed boolean vs primitive', new Boolean(true), true],
	['boxed number vs null', new Number(42), null],
]);

// objects with valueOf
test('objects with custom valueOf', () => {
	const a = {
		value: 42,
		valueOf() {
			return this.value;
		},
	};
	const b = {
		value: 42,
		valueOf() {
			return this.value;
		},
	};

	// valueOf not called, objects compared by enumerable properties
	// the valueOf function is an enumerable property, so it's compared by reference
	assert.ok(!deep_equal(a, b));

	// same valueOf reference
	const valueOf_fn = function () {
		return 42;
	};
	const c = {value: 42, valueOf: valueOf_fn};
	const d = {value: 42, valueOf: valueOf_fn};
	assert.ok(deep_equal(c, d));
});

// mixed type edge cases
test_unequal_values([
	['Map vs object with size property', new Map([['a', 1]]), {size: 1}],
	['Set vs object with size property', new Set([1, 2]), {size: 2}],
	['Array vs object with only length property', [1, 2, 3], {length: 3}],
	['RegExp vs object', /test/, {source: 'test', flags: ''}],
]);

// arrays are checked with instanceof, so they're never equal to plain objects
test('array vs object with numeric keys', () => {
	assert.ok(!deep_equal([1, 2, 3], {0: 1, 1: 2, 2: 3}));
	assert.ok(!deep_equal(['a', 'b'], {'0': 'a', '1': 'b'}));
});

// empty-ish values
test('empty values: same types', () => {
	assert.ok(deep_equal({}, {}));
	assert.ok(deep_equal([], []));
	assert.ok(deep_equal('', ''));
	assert.ok(deep_equal(new Map(), new Map()));
	assert.ok(deep_equal(new Set(), new Set()));
});

// Constructor check ensures symmetry: deep_equal(a, b) === deep_equal(b, a)
test('empty values: cross-type (constructor check prevents confusion)', () => {
	// Different constructors are never equal (prevents type confusion)
	assert.ok(!deep_equal({}, []));
	assert.ok(!deep_equal([], {}));

	// Maps/Sets should not equal plain objects
	assert.ok(!deep_equal({}, new Map()));
	assert.ok(!deep_equal({}, new Set()));
	assert.ok(!deep_equal([], new Map()));
	assert.ok(!deep_equal([], new Set()));
	assert.ok(!deep_equal(new Map(), new Set()));
});

test_unequal_values([
	['empty string vs empty array', '', []],
	['empty string vs empty object', '', {}],
]);
