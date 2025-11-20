import {test, assert} from 'vitest';

import {wait} from '$lib/async.ts';

test('basic behavior', async () => {
	await wait();
	await wait(10);
	assert.ok(true);
});
