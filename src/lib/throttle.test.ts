import {test} from 'uvu';
import * as assert from 'uvu/assert';

import {throttle} from '$lib/throttle.js';
import {wait} from '$lib/async.js';

test('throttles calls to a function', async () => {
	const results: Array<string> = [];
	const fn = throttle(async (name: string) => {
		results.push(name + '_run');
		await wait();
		results.push(name + '_done');
	});

	const promise_a = fn('a'); // called immediately
	const promise_b = fn('b'); // discarded
	const promise_c = fn('c'); // discarded
	const promise_d = fn('d'); // called at trailing edge

	assert.ok(promise_a !== promise_b);
	assert.is(promise_b, promise_c);
	assert.is(promise_b, promise_d);

	assert.equal(results, ['a_run']); // called immediately

	await promise_a;

	assert.equal(results, ['a_run', 'a_done']);

	await wait();

	assert.equal(results, ['a_run', 'a_done', 'd_run']);

	await promise_b;

	assert.equal(results, ['a_run', 'a_done', 'd_run', 'd_done']);
});

test('calls functions in sequence', async () => {
	const results: Array<string> = [];
	const fn = throttle(async (name: string) => {
		results.push(name + '_run');
		await wait();
		results.push(name + '_done');
	});

	const promise_a = fn('a'); // called immediately

	assert.equal(results, ['a_run']); // called immediately

	await promise_a;

	assert.equal(results, ['a_run', 'a_done']);

	const promise_b = fn('b'); // called immediately

	assert.equal(results, ['a_run', 'a_done', 'b_run']); // called immediately

	assert.ok(promise_a !== promise_b);

	await promise_b;

	assert.equal(results, ['a_run', 'a_done', 'b_run', 'b_done']);
});

test("throttles calls to a function with when='trailing'", async () => {
	const results: Array<string> = [];
	const fn = throttle(
		async (name: string) => {
			results.push(name + '_run');
			await wait();
			results.push(name + '_done');
		},
		{when: 'trailing'},
	);

	const promise_a = fn('a'); // discarded
	const promise_b = fn('b'); // discarded
	const promise_c = fn('c'); // discarded
	const promise_d = fn('d'); // called at trailing edge

	assert.is(promise_a, promise_b);
	assert.is(promise_a, promise_c);
	assert.is(promise_a, promise_d);

	assert.equal(results, []); // no immediate call

	await wait();

	assert.equal(results, ['d_run']);

	await promise_a;

	assert.equal(results, ['d_run', 'd_done']);

	const promise_e = fn('e'); // called at trailing edge

	assert.ok(promise_a !== promise_e);
	assert.equal(results, ['d_run', 'd_done']);

	await wait();

	assert.equal(results, ['d_run', 'd_done', 'e_run']);

	await promise_e;

	assert.equal(results, ['d_run', 'd_done', 'e_run', 'e_done']);

	const promise_f = fn('f'); // discarded
	const promise_g = fn('g'); // called at trailing edge

	assert.ok(promise_e !== promise_f);
	assert.ok(promise_f === promise_g);
	assert.equal(results, ['d_run', 'd_done', 'e_run', 'e_done']);

	await wait();

	assert.equal(results, ['d_run', 'd_done', 'e_run', 'e_done', 'g_run']);

	await promise_g;

	assert.equal(results, ['d_run', 'd_done', 'e_run', 'e_done', 'g_run', 'g_done']);
});

test("throttles calls to a function with when='leading'", async () => {
	const results: Array<string> = [];
	const fn = throttle(
		async (name: string) => {
			results.push(name + '_run');
			await wait();
			results.push(name + '_done');
		},
		{when: 'leading'},
	);

	const promise_a = fn('a'); // called immediately
	const promise_b = fn('b'); // discarded
	const promise_c = fn('c'); // discarded
	const promise_d = fn('d'); // discarded

	assert.is(promise_a, promise_b);
	assert.is(promise_a, promise_c);
	assert.is(promise_a, promise_d);

	assert.equal(results, ['a_run']); // called immediately

	await promise_a;

	assert.equal(results, ['a_run', 'a_done']);

	const promise_e = fn('e'); // called immediately

	assert.ok(promise_a !== promise_e);

	assert.equal(results, ['a_run', 'a_done', 'e_run']); // called immediately

	await promise_e;

	assert.equal(results, ['a_run', 'a_done', 'e_run', 'e_done']);

	const promise_f = fn('f'); // called immediately
	const promise_g = fn('g'); // discarded

	assert.ok(promise_e !== promise_f);
	assert.ok(promise_f === promise_g);

	assert.equal(results, ['a_run', 'a_done', 'e_run', 'e_done', 'f_run']); // called immediately

	await promise_g;

	assert.equal(results, ['a_run', 'a_done', 'e_run', 'e_done', 'f_run', 'f_done']);
});

test.run();
