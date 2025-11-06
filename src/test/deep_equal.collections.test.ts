import {test_equal_values, test_unequal_values} from './deep_equal_test_helpers.js';

// equal sets
test_equal_values([
	// basic sets
	['empty sets', new Set(), new Set()],
	['sets with numbers', new Set([1, 2, 3]), new Set([1, 2, 3])],
	[
		'sets with strings',
		new Set(['apple', 'banana', 'cherry']),
		new Set(['apple', 'banana', 'cherry']),
	],
	[
		'sets with mixed types',
		new Set(['a', 'b', null, Array, 1, 2, 3]),
		new Set(['a', 'b', null, Array, 1, 2, 3]),
	],
	[
		'sets with shuffled order',
		new Set(['a', 'b', null, Array, 1, 2, 3]),
		new Set(['b', 'a', null, 3, 2, 1, Array]),
	],
]);

// unequal sets
test_unequal_values([
	// basic differences
	['sets with different values', new Set(['a', 'b', null, 1]), new Set(['a', 'b', null, '1'])],
	['sets with different sizes', new Set([1, 2, 3]), new Set([1, 2])],
	['empty set and non-empty', new Set(), new Set([1])],
	['sets with equivalent arrays', new Set(['a', 'b', 'c', 'd']), ['a', 'b', 'c', 'd']],
	['set and object', new Set([1, 2]), {0: 1, 1: 2}],
	['set and null', new Set(), null],

	// note: sets compare by reference for object values
	['sets with deeply equal objects but different refs', new Set([{a: 1}]), new Set([{a: 1}])],
]);

// equal maps
test_equal_values([
	// basic maps
	['empty maps', new Map(), new Map()],
	[
		'maps with string keys',
		new Map<string, any>([
			['name', 'alice'],
			['role', 'admin'],
		]),
		new Map<string, any>([
			['name', 'alice'],
			['role', 'admin'],
		]),
	],
	[
		'maps with number keys',
		new Map([
			[1, 'one'],
			[2, 'two'],
		]),
		new Map([
			[1, 'one'],
			[2, 'two'],
		]),
	],
	[
		'maps with nested values',
		new Map<string, any>([
			['a', 1],
			['b', 2],
			['c', [1, [2, 3]]],
		]),
		new Map<string, any>([
			['a', 1],
			['b', 2],
			['c', [1, [2, 3]]],
		]),
	],
	[
		'maps with object values',
		new Map([
			['user1', {name: 'alice'}],
			['user2', {name: 'bob'}],
		]),
		new Map([
			['user1', {name: 'alice'}],
			['user2', {name: 'bob'}],
		]),
	],
]);

// unequal maps
test_unequal_values([
	// basic differences
	[
		'maps with different values',
		new Map([
			['a', 1],
			['b', 2],
			['c', 3],
		]),
		new Map([
			['a', 1],
			['b', 2],
			['c', 4],
		]),
	],
	[
		'maps with different keys',
		new Map([
			['a', 1],
			['b', 2],
			['c', 3],
		]),
		new Map([
			['a', 1],
			['b', 2],
			['d', 3],
		]),
	],
	[
		'maps with fewer pairs',
		new Map([
			['a', 1],
			['b', 2],
			['c', 3],
		]),
		new Map([
			['a', 1],
			['b', 2],
		]),
	],
	[
		'maps with equivalent objects',
		new Map([
			['a', 1],
			['b', 2],
			['c', 3],
		]),
		{a: 1, b: 2, c: 3},
	],
	['empty map and non-empty', new Map(), new Map([['a', 1]])],
	['map and null', new Map(), null],

	// note: maps compare keys by reference
	[
		'maps with deeply equal object keys but different refs',
		new Map([[{a: 1}, 'value']]),
		new Map([[{a: 1}, 'value']]),
	],
]);

// regexps
test_equal_values([
	['simple regexps', /a/, /a/],
	['regexps with flags', /test/gi, /test/gi],
	['regexps with special chars', /[a-z]+/, /[a-z]+/],
	['regexps with quantifiers', /a{2,4}/, /a{2,4}/],
]);

test_unequal_values([
	['regexps with different sources', /a/, /b/],
	['regexps with different flags', /a/, /a/g],
	['regexps case sensitivity flags', /test/i, /test/],
	['regexp and string', /test/, 'test'],
]);
