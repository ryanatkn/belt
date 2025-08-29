import {test, assert} from 'vitest';

import {Unreachable_Error, unreachable} from '$lib/error.js';

const custom_message = 'Custom message';

test('Unreachable_Error is an Error', () => {
	const error = new Unreachable_Error('test' as never);
	assert.instanceOf(error, Error);
	assert.instanceOf(error, Unreachable_Error as any);
});

test('Unreachable_Error accepts custom message', () => {
	const error = new Unreachable_Error('test' as never, custom_message);
	assert.strictEqual(error.message, custom_message);
});

test('Unreachable_Error requires never type parameter', () => {
	// @ts-expect-error
	new Unreachable_Error('test'); // eslint-disable-line no-new
});

test('unreachable helper throws Unreachable_Error', () => {
	let caught_error: unknown;

	try {
		unreachable('test' as never);
	} catch (error) {
		caught_error = error;
	}

	assert.instanceOf(caught_error, Unreachable_Error as any);
});

test('unreachable helper with custom message', () => {
	let caught_error: unknown;

	try {
		unreachable('test' as never, custom_message);
	} catch (error) {
		caught_error = error;
	}

	assert.instanceOf(caught_error, Unreachable_Error as any);
	assert.strictEqual((caught_error as Error).message, custom_message);
});

test('unreachable helper requires never type parameter', () => {
	assert.throws(() => {
		// @ts-expect-error
		unreachable('test');
	});
});
