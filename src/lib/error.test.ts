import {test} from 'uvu';
import * as assert from 'uvu/assert';

import {Unreachable_Error, unreachable} from '$lib/error.js';

const custom_message = 'Custom message';

test('Unreachable_Error is an Error', () => {
	const error = new Unreachable_Error('test' as never);
	assert.instance(error, Error);
	assert.instance(error, Unreachable_Error);
});

test('Unreachable_Error accepts custom message', () => {
	const error = new Unreachable_Error('test' as never, custom_message);
	assert.is(error.message, custom_message);
});

test('Unreachable_Error requires never type parameter', () => {
	// @ts-expect-error
	new Unreachable_Error('test'); // eslint-disable-line no-new
});

test('unreachable helper throws Unreachable_Error', () => {
	try {
		unreachable('test' as never);
		assert.unreachable('Should have thrown');
	} catch (error) {
		assert.instance(error, Unreachable_Error);
	}
});

test('unreachable helper with custom message', () => {
	try {
		unreachable('test' as never, custom_message);
		assert.unreachable('Should have thrown');
	} catch (error) {
		assert.instance(error, Unreachable_Error);
		assert.is(error.message, custom_message);
	}
});

test('unreachable helper requires never type parameter', () => {
	assert.throws(() => {
		// @ts-expect-error
		unreachable('test');
	});
});

test.run();
