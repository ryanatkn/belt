import {suite} from 'uvu';
import * as assert from 'uvu/assert';

import {random_boolean, random_float, random_int, random_item, shuffle} from './random.js';

/* test__random_float */
const test__random_float = suite('random_float');

test__random_float('-5.5 to 7', () => {
	for (let i = 0; i < 20; i++) {
		const result = random_float(-5.5, 7);
		assert.ok(result >= -5.5);
		assert.ok(result < 7);
	}
});

test__random_float.run();
/* test__random_float */

/* test__random_int */
const test__random_int = suite('random_int');

test__random_int('0 to 1', () => {
	const items = [0, 1];
	const results = [];
	for (let i = 0; i < 20; i++) {
		const result = random_int(0, 1);
		assert.ok(items.includes(result));
		results.push(result);
	}
	for (const item of items) {
		assert.ok(results.includes(item));
	}
});

test__random_int('1 to 5', () => {
	const items = [1, 2, 3, 4, 5];
	const results = [];
	for (let i = 0; i < 100; i++) {
		const result = random_int(1, 5);
		assert.ok(items.includes(result));
		results.push(result);
	}
	for (const item of items) {
		assert.ok(results.includes(item));
	}
});

test__random_int('-3 to 2', () => {
	const items = [-3, -2, -1, 0, 1, 2];
	const results = [];
	for (let i = 0; i < 100; i++) {
		const result = random_int(-3, 2);
		assert.ok(items.includes(result));
		results.push(result);
	}
	for (const item of items) {
		assert.ok(results.includes(item));
	}
});

test__random_int('2 to 2', () => {
	assert.is(random_int(2, 2), 2);
});

test__random_int.run();
/* test__random_int */

/* test__random_boolean */
const test__random_boolean = suite('random_boolean');

test__random_boolean('-5.5 to 7', () => {
	for (let i = 0; i < 20; i++) {
		assert.is(typeof random_boolean(), 'boolean');
	}
});

test__random_boolean.run();
/* test__random_boolean */

/* test__random_item */
const test__random_item = suite('random_item');

test__random_item('a and b', () => {
	const items = ['a', 'b'];
	const results = [];
	for (let i = 0; i < 20; i++) {
		const result = random_item(items)!;
		assert.ok(items.includes(result));
		results.push(result);
	}
	for (const item of items) {
		assert.ok(results.includes(item));
	}
});
test__random_item('1 to 5', () => {
	const items = [1, 2, 3, 4, 5];
	const results = [];
	for (let i = 0; i < 100; i++) {
		const result = random_item(items)!;
		assert.ok(items.includes(result));
		results.push(result);
	}
	for (const item of items) {
		assert.ok(results.includes(item));
	}
});
test__random_item('empty array', () => {
	assert.is(random_item([]), undefined);
});

test__random_item.run();
/* test__random_item */

/* test__shuffle */
const test__shuffle = suite('shuffle');

test__shuffle('shuffles an array', () => {
	const original_items = ['a', 'b', 'c'];
	const items = original_items.slice();
	const shuffled = shuffle(items);
	assert.is(items, shuffled); // mutated not cloned
	assert.is(shuffled.length, 3);
	for (const item of original_items) {
		assert.ok(shuffled.includes(item));
	}
});

test__shuffle.run();
/* test__shuffle */
