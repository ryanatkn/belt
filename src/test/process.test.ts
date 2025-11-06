import {test, assert} from 'vitest';

import {spawn, spawn_out} from '$lib/process.js';

test('spawn', async () => {
	const result = await spawn('echo', ['a', 'b']);
	assert.ok(result.ok);
});

test('spawn_out', async () => {
	const {result, stdout, stderr} = await spawn_out('echo', ['a', 'b']);
	assert.ok(result.ok);
	assert.strictEqual(stdout, 'a b\n');
	assert.strictEqual(stderr, null);
});
