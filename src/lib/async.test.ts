import {suite} from 'uvu';
import * as assert from 'uvu/assert';

import {wait} from '$lib/async.js';

/* test__wait */
const test__wait = suite('wait');

test__wait('basic behavior', async () => {
	await wait();
	await wait(10);
	assert.ok(true);
});

test__wait.run();
/* test__wait */
