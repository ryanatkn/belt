import {test} from 'uvu';
import * as assert from 'uvu/assert';

import {spawn, spawn_out} from './process.js';

test('spawn', async () => {
	const result = await spawn('echo', ['a', 'b']);
	assert.ok(result.ok);
});

test('spawn_out', async () => {
	const {result, stdout, stderr} = await spawn_out('echo', ['a', 'b']);
	assert.ok(result.ok);
	assert.is(stdout, 'a b\n');
	assert.is(stderr, null);
});

test.run();
