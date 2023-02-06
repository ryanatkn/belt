import {suite} from 'uvu';
import * as assert from 'uvu/assert';

import {randomFloat, randomInt, randomItem} from './random.js';

/* test__randomFloat */
const test__randomFloat = suite('randomFloat');

test__randomFloat('-5.5 to 7', () => {
	for (let i = 0; i < 20; i++) {
		const result = randomFloat(-5.5, 7);
		assert.ok(result >= -5.5);
		assert.ok(result < 7);
	}
});

test__randomFloat.run();
/* test__randomFloat */

/* test__randomInt */
const test__randomInt = suite('randomInt');

test__randomInt('0 to 1', () => {
	const items = [0, 1];
	const results = [];
	for (let i = 0; i < 20; i++) {
		const result = randomInt(0, 1);
		assert.ok(items.includes(result));
		results.push(result);
	}
	for (const item of items) {
		assert.ok(results.includes(item));
	}
});

test__randomInt('1 to 5', () => {
	const items = [1, 2, 3, 4, 5];
	const results = [];
	for (let i = 0; i < 100; i++) {
		const result = randomInt(1, 5);
		assert.ok(items.includes(result));
		results.push(result);
	}
	for (const item of items) {
		assert.ok(results.includes(item));
	}
});

test__randomInt('-3 to 2', () => {
	const items = [-3, -2, -1, 0, 1, 2];
	const results = [];
	for (let i = 0; i < 100; i++) {
		const result = randomInt(-3, 2);
		assert.ok(items.includes(result));
		results.push(result);
	}
	for (const item of items) {
		assert.ok(results.includes(item));
	}
});

test__randomInt('2 to 2', () => {
	assert.is(randomInt(2, 2), 2);
});

test__randomInt.run();
/* test__randomInt */

/* test__randomItem */
const test__randomItem = suite('randomItem');

test__randomItem('a and b', () => {
	const items = ['a', 'b'];
	const results = [];
	for (let i = 0; i < 20; i++) {
		const result = randomItem(items)!;
		assert.ok(items.includes(result));
		results.push(result);
	}
	for (const item of items) {
		assert.ok(results.includes(item));
	}
});
test__randomItem('1 to 5', () => {
	const items = [1, 2, 3, 4, 5];
	const results = [];
	for (let i = 0; i < 100; i++) {
		const result = randomItem(items)!;
		assert.ok(items.includes(result));
		results.push(result);
	}
	for (const item of items) {
		assert.ok(results.includes(item));
	}
});
test__randomItem('empty array', () => {
	assert.is(randomItem([]), undefined);
});

test__randomItem.run();
/* test__randomItem */
