import {suite} from 'uvu';
import * as assert from 'uvu/assert';

import {
	plural,
	truncate,
	stripStart,
	stripEnd,
	stripAfter,
	stripBefore,
	ensureStart,
	ensureEnd,
	deindent,
	toGraphemeCount,
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

/* test__stripStart */
const test__stripStart = suite('stripStart');

test__stripStart('basic behavior', () => {
	assert.is(stripStart('foobar', 'foo'), 'bar');
});

test__stripStart('single character', () => {
	assert.is(stripStart('foobar', 'f'), 'oobar');
});

test__stripStart('single character of multiple', () => {
	assert.is(stripStart('ffoobar', 'f'), 'foobar');
});

test__stripStart('noop for partial match', () => {
	assert.is(stripStart('foobar', 'fob'), 'foobar');
});

test__stripStart('noop for matching end but not start', () => {
	assert.is(stripStart('foobar', 'bar'), 'foobar');
});

test__stripStart('noop for empty string', () => {
	assert.is(stripStart('foobar', ''), 'foobar');
});

test__stripStart.run();
/* test__stripStart */

/* test__stripEnd */
const test__stripEnd = suite('stripEnd');

test__stripEnd('basic behavior', () => {
	assert.is(stripEnd('foobar', 'bar'), 'foo');
});

test__stripEnd('single character', () => {
	assert.is(stripEnd('foobar', 'r'), 'fooba');
});

test__stripEnd('single character of multiple', () => {
	assert.is(stripEnd('foobarr', 'r'), 'foobar');
});

test__stripEnd('noop for partial match', () => {
	assert.is(stripEnd('foobar', 'oar'), 'foobar');
});

test__stripEnd('noop for matching start but not end', () => {
	assert.is(stripEnd('foobar', 'foo'), 'foobar');
});

test__stripEnd('noop for empty string', () => {
	assert.is(stripEnd('foobar', ''), 'foobar');
});

test__stripEnd.run();
/* test__stripEnd */

/* test__stripAfter */
const test__stripAfter = suite('stripAfter');

test__stripAfter('basic behavior', () => {
	assert.is(stripAfter('foobar', 'oo'), 'f');
});

test__stripAfter('starting characters', () => {
	assert.is(stripAfter('foobar', 'foo'), '');
});

test__stripAfter('ending characters', () => {
	assert.is(stripAfter('foobar', 'bar'), 'foo');
});

test__stripAfter('single character', () => {
	assert.is(stripAfter('foobar', 'b'), 'foo');
});

test__stripAfter('first of many characters', () => {
	assert.is(stripAfter('foobar', 'o'), 'f');
});

test__stripAfter('strips after first character', () => {
	assert.is(stripAfter('foobar', 'f'), '');
});

test__stripAfter('strips last character', () => {
	assert.is(stripAfter('foobar', 'r'), 'fooba');
});

test__stripAfter('noop for missing character', () => {
	assert.is(stripAfter('foobar', 'x'), 'foobar');
});

test__stripAfter('noop for partial match', () => {
	assert.is(stripAfter('foobar', 'bo'), 'foobar');
});

test__stripAfter('empty string', () => {
	assert.is(stripAfter('foobar', ''), 'foobar');
});

test__stripAfter.run();
/* test__stripAfter */

/* test__stripBefore */
const test__stripBefore = suite('stripBefore');

test__stripBefore('basic behavior', () => {
	assert.is(stripBefore('foobar', 'oo'), 'bar');
});

test__stripBefore('starting characters', () => {
	assert.is(stripBefore('foobar', 'foo'), 'bar');
});

test__stripBefore('ending characters', () => {
	assert.is(stripBefore('foobar', 'bar'), '');
});

test__stripBefore('single character', () => {
	assert.is(stripBefore('foobar', 'b'), 'ar');
});

test__stripBefore('first of many characters', () => {
	assert.is(stripBefore('foobar', 'o'), 'obar');
});

test__stripBefore('strips after first character', () => {
	assert.is(stripBefore('foobar', 'f'), 'oobar');
});

test__stripBefore('strips last character', () => {
	assert.is(stripBefore('foobar', 'r'), '');
});

test__stripBefore('noop for missing character', () => {
	assert.is(stripBefore('foobar', 'x'), 'foobar');
});

test__stripBefore('noop for partial match', () => {
	assert.is(stripBefore('foobar', 'bo'), 'foobar');
});

test__stripBefore('empty string', () => {
	assert.is(stripBefore('foobar', ''), 'foobar');
});

test__stripBefore.run();
/* test__stripBefore */

/* test__ensureStart */
const test__ensureStart = suite('ensureStart');

test__ensureStart('basic behavior', () => {
	assert.is(ensureStart('foobar', 'food'), 'foodfoobar');
});

test__ensureStart('existing text', () => {
	assert.is(ensureStart('foobar', 'foo'), 'foobar');
});

test__ensureStart('existing character', () => {
	assert.is(ensureStart('foobar', 'f'), 'foobar');
});

test__ensureStart('second character', () => {
	assert.is(ensureStart('foobar', 'o'), 'ofoobar');
});

test__ensureStart('empty string', () => {
	assert.is(ensureStart('foobar', ''), 'foobar');
});

test__ensureStart('whole string', () => {
	assert.is(ensureStart('foobar', 'foobar'), 'foobar');
});

test__ensureStart('whole string plus a start character', () => {
	assert.is(ensureStart('foobar', 'xfoobar'), 'xfoobarfoobar');
});

test__ensureStart('whole string plus an end character', () => {
	assert.is(ensureStart('foobar', 'foobarx'), 'foobarxfoobar');
});

test__ensureStart('empty strings', () => {
	assert.is(ensureStart('', ''), '');
});

test__ensureStart('empty source string', () => {
	assert.is(ensureStart('', 'foo'), 'foo');
});

test__ensureStart.run();
/* test__ensureStart */

/* test__ensureEnd */
const test__ensureEnd = suite('ensureEnd');

test__ensureEnd('basic behavior', () => {
	assert.is(ensureEnd('foobar', 'abar'), 'foobarabar');
});

test__ensureEnd('existing text', () => {
	assert.is(ensureEnd('foobar', 'bar'), 'foobar');
});

test__ensureEnd('existing character', () => {
	assert.is(ensureEnd('foobar', 'r'), 'foobar');
});

test__ensureEnd('second to last character', () => {
	assert.is(ensureEnd('foobar', 'a'), 'foobara');
});

test__ensureEnd('empty string', () => {
	assert.is(ensureEnd('foobar', ''), 'foobar');
});

test__ensureEnd('whole string', () => {
	assert.is(ensureEnd('foobar', 'foobar'), 'foobar');
});

test__ensureEnd('whole string plus a start character', () => {
	assert.is(ensureEnd('foobar', 'xfoobar'), 'foobarxfoobar');
});

test__ensureEnd('whole string plus an end character', () => {
	assert.is(ensureEnd('foobar', 'foobarx'), 'foobarfoobarx');
});

test__ensureEnd('empty strings', () => {
	assert.is(ensureEnd('', ''), '');
});

test__ensureEnd('empty source string', () => {
	assert.is(ensureEnd('', 'foo'), 'foo');
});

test__ensureEnd.run();
/* test__ensureEnd */

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

/* test__toGraphemeCount */
const test__toGraphemeCount = suite('toGraphemeCount');

test__toGraphemeCount('counts graphemes of a string, where compound emoji are one grapheme', () => {
	assert.is(toGraphemeCount('👩‍👩‍👧‍👦'), 1);
	assert.is(toGraphemeCount('🙋‍♂️'), 1);
	assert.is(toGraphemeCount('👩‍👩‍👧‍👦🙋‍♂️👩‍👩‍👧‍👦'), 3);
	assert.is(toGraphemeCount('a👩‍👩‍👧‍👦5🙋‍♂️👩‍❤️‍💋‍👩~'), 6);
});

test__toGraphemeCount.run();
/* test__toGraphemeCount */
