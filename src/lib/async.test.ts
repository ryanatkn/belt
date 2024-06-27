import {test} from 'uvu';
import * as assert from 'uvu/assert';

import {wait} from '$lib/async.js';

test('basic behavior', async () => {
	await wait();
	await wait(10);
	assert.ok(true);
});

test.run();
