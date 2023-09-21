import {suite} from 'uvu';
import * as assert from 'uvu/assert';

import {
	plural,
	truncate,
	strip_start,
	strip_end,
	strip_after,
	strip_before,
	ensure_start,
	ensure_end,
	deindent,
	to_grapheme_count,
} from './string.js';

/* test__truncate */
const test__truncate = suite('truncate');

test__truncate('basic behavior', () => {
	assert.is(truncate('foobarbaz', 5), 'fo...');
});

test__truncate('no truncation needed', () => {
	assert.is(truncate('foobarbaz', 9), 'foobarbaz');
});

test__truncate('custom suffix', () => {
	assert.is(truncate('foobarbaz', 5, '-'), 'foob-');
});

test__truncate('no suffix', () => {
	assert.is(truncate('foobarbaz', 5, ''), 'fooba');
});

test__truncate('zero length', () => {
	assert.is(truncate('foobarbaz', 0), '');
});

test__truncate('zero length and no suffix', () => {
	assert.is(truncate('foobarbaz', 0, ''), '');
});

test__truncate('negative length', () => {
	assert.is(truncate('foobarbaz', -5), '');
});

test__truncate('length equal to suffix', () => {
	assert.is(truncate('foobarbaz', 2, '..'), '..');
});

test__truncate('length shorter than suffix returns empty string', () => {
	assert.is(truncate('foobarbaz', 2, '...'), '');
});

test__truncate.run();
/* test__truncate */

/* test__strip_start */
const test__strip_start = suite('strip_start');

test__strip_start('basic behavior', () => {
	assert.is(strip_start('foobar', 'foo'), 'bar');
});

test__strip_start('single character', () => {
	assert.is(strip_start('foobar', 'f'), 'oobar');
});

test__strip_start('single character of multiple', () => {
	assert.is(strip_start('ffoobar', 'f'), 'foobar');
});

test__strip_start('noop for partial match', () => {
	assert.is(strip_start('foobar', 'fob'), 'foobar');
});

test__strip_start('noop for matching end but not start', () => {
	assert.is(strip_start('foobar', 'bar'), 'foobar');
});

test__strip_start('noop for empty string', () => {
	assert.is(strip_start('foobar', ''), 'foobar');
});

test__strip_start.run();
/* test__strip_start */

/* test__strip_end */
const test__strip_end = suite('strip_end');

test__strip_end('basic behavior', () => {
	assert.is(strip_end('foobar', 'bar'), 'foo');
});

test__strip_end('single character', () => {
	assert.is(strip_end('foobar', 'r'), 'fooba');
});

test__strip_end('single character of multiple', () => {
	assert.is(strip_end('foobarr', 'r'), 'foobar');
});

test__strip_end('noop for partial match', () => {
	assert.is(strip_end('foobar', 'oar'), 'foobar');
});

test__strip_end('noop for matching start but not end', () => {
	assert.is(strip_end('foobar', 'foo'), 'foobar');
});

test__strip_end('noop for empty string', () => {
	assert.is(strip_end('foobar', ''), 'foobar');
});

test__strip_end.run();
/* test__strip_end */

/* test__strip_after */
const test__strip_after = suite('strip_after');

test__strip_after('basic behavior', () => {
	assert.is(strip_after('foobar', 'oo'), 'f');
});

test__strip_after('starting characters', () => {
	assert.is(strip_after('foobar', 'foo'), '');
});

test__strip_after('ending characters', () => {
	assert.is(strip_after('foobar', 'bar'), 'foo');
});

test__strip_after('single character', () => {
	assert.is(strip_after('foobar', 'b'), 'foo');
});

test__strip_after('first of many characters', () => {
	assert.is(strip_after('foobar', 'o'), 'f');
});

test__strip_after('strips after first character', () => {
	assert.is(strip_after('foobar', 'f'), '');
});

test__strip_after('strips last character', () => {
	assert.is(strip_after('foobar', 'r'), 'fooba');
});

test__strip_after('noop for missing character', () => {
	assert.is(strip_after('foobar', 'x'), 'foobar');
});

test__strip_after('noop for partial match', () => {
	assert.is(strip_after('foobar', 'bo'), 'foobar');
});

test__strip_after('empty string', () => {
	assert.is(strip_after('foobar', ''), 'foobar');
});

test__strip_after.run();
/* test__strip_after */

/* test__strip_before */
const test__strip_before = suite('strip_before');

test__strip_before('basic behavior', () => {
	assert.is(strip_before('foobar', 'oo'), 'bar');
});

test__strip_before('starting characters', () => {
	assert.is(strip_before('foobar', 'foo'), 'bar');
});

test__strip_before('ending characters', () => {
	assert.is(strip_before('foobar', 'bar'), '');
});

test__strip_before('single character', () => {
	assert.is(strip_before('foobar', 'b'), 'ar');
});

test__strip_before('first of many characters', () => {
	assert.is(strip_before('foobar', 'o'), 'obar');
});

test__strip_before('strips after first character', () => {
	assert.is(strip_before('foobar', 'f'), 'oobar');
});

test__strip_before('strips last character', () => {
	assert.is(strip_before('foobar', 'r'), '');
});

test__strip_before('noop for missing character', () => {
	assert.is(strip_before('foobar', 'x'), 'foobar');
});

test__strip_before('noop for partial match', () => {
	assert.is(strip_before('foobar', 'bo'), 'foobar');
});

test__strip_before('empty string', () => {
	assert.is(strip_before('foobar', ''), 'foobar');
});

test__strip_before.run();
/* test__strip_before */

/* test__ensure_start */
const test__ensure_start = suite('ensure_start');

test__ensure_start('basic behavior', () => {
	assert.is(ensure_start('foobar', 'food'), 'foodfoobar');
});

test__ensure_start('existing text', () => {
	assert.is(ensure_start('foobar', 'foo'), 'foobar');
});

test__ensure_start('existing character', () => {
	assert.is(ensure_start('foobar', 'f'), 'foobar');
});

test__ensure_start('second character', () => {
	assert.is(ensure_start('foobar', 'o'), 'ofoobar');
});

test__ensure_start('empty string', () => {
	assert.is(ensure_start('foobar', ''), 'foobar');
});

test__ensure_start('whole string', () => {
	assert.is(ensure_start('foobar', 'foobar'), 'foobar');
});

test__ensure_start('whole string plus a start character', () => {
	assert.is(ensure_start('foobar', 'xfoobar'), 'xfoobarfoobar');
});

test__ensure_start('whole string plus an end character', () => {
	assert.is(ensure_start('foobar', 'foobarx'), 'foobarxfoobar');
});

test__ensure_start('empty strings', () => {
	assert.is(ensure_start('', ''), '');
});

test__ensure_start('empty source string', () => {
	assert.is(ensure_start('', 'foo'), 'foo');
});

test__ensure_start.run();
/* test__ensure_start */

/* test__ensure_end */
const test__ensure_end = suite('ensure_end');

test__ensure_end('basic behavior', () => {
	assert.is(ensure_end('foobar', 'abar'), 'foobarabar');
});

test__ensure_end('existing text', () => {
	assert.is(ensure_end('foobar', 'bar'), 'foobar');
});

test__ensure_end('existing character', () => {
	assert.is(ensure_end('foobar', 'r'), 'foobar');
});

test__ensure_end('second to last character', () => {
	assert.is(ensure_end('foobar', 'a'), 'foobara');
});

test__ensure_end('empty string', () => {
	assert.is(ensure_end('foobar', ''), 'foobar');
});

test__ensure_end('whole string', () => {
	assert.is(ensure_end('foobar', 'foobar'), 'foobar');
});

test__ensure_end('whole string plus a start character', () => {
	assert.is(ensure_end('foobar', 'xfoobar'), 'foobarxfoobar');
});

test__ensure_end('whole string plus an end character', () => {
	assert.is(ensure_end('foobar', 'foobarx'), 'foobarfoobarx');
});

test__ensure_end('empty strings', () => {
	assert.is(ensure_end('', ''), '');
});

test__ensure_end('empty source string', () => {
	assert.is(ensure_end('', 'foo'), 'foo');
});

test__ensure_end.run();
/* test__ensure_end */

/* test__deindent */
const test__deindent = suite('deindent');

test__deindent('basic behavior', () => {
	assert.is(
		deindent(`
			hello
			world
				- nested
					- more
				- less
	`),
		`hello
world
- nested
- more
- less
`,
	);
});

test__deindent('single line', () => {
	assert.is(deindent('  hey'), 'hey');
});

test__deindent('strips trailing spaces', () => {
	assert.is(deindent('  hey  '), 'hey');
});

test__deindent.run();
/* test__deindent */

/* test__plural */
const test__plural = suite('plural');

test__plural('pluralizes 0', () => {
	assert.is(plural(0), 's');
});

test__plural('pluralizes a positive float', () => {
	assert.is(plural(45.8), 's');
});

test__plural('pluralizes a negative number', () => {
	assert.is(plural(-3), 's');
});

test__plural('does not pluralize 1', () => {
	assert.is(plural(1), '');
});

test__plural.run();
/* test__plural */

/* test__to_grapheme_count */
const test__to_grapheme_count = suite('to_grapheme_count');

test__to_grapheme_count(
	'counts graphemes of a string, where compound emoji are one grapheme',
	() => {
		assert.is(to_grapheme_count('👩‍👩‍👧‍👦'), 1);
		assert.is(to_grapheme_count('🙋‍♂️'), 1);
		assert.is(to_grapheme_count('👩‍👩‍👧‍👦🙋‍♂️👩‍👩‍👧‍👦'), 3);
		assert.is(to_grapheme_count('a👩‍👩‍👧‍👦5🙋‍♂️👩‍❤️‍💋‍👩~'), 6);
	},
);

test__to_grapheme_count.run();
/* test__to_grapheme_count */
