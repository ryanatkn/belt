import {test} from 'uvu';
import * as assert from 'uvu/assert';

import {format_url} from './url.js';

test('format_url', () => {
	assert.is(format_url('https://www.fuz.dev/'), 'fuz.dev');
	assert.is(format_url('www.fuz.dev/'), 'fuz.dev');
	assert.is(format_url('www.fuz.dev'), 'fuz.dev');
	assert.is(format_url('https://fuz.dev/'), 'fuz.dev');
	assert.is(format_url('https://fuz.dev'), 'fuz.dev');
	assert.is(format_url('fuz.dev'), 'fuz.dev');
	assert.is(format_url('http://fuz.dev'), 'http://fuz.dev');
	assert.is(format_url('/'), '');
});

test.run();
