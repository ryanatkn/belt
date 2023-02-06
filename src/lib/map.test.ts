import {suite} from 'uvu';
import * as assert from 'uvu/assert';

import {sortMap} from './map.js';

/* test__sortMap */
const test__sortMap = suite('sortMap');

test__sortMap('basic behavior', () => {
	assert.equal(
		Array.from(
			sortMap(
				new Map([
					['A', 1],
					['B', 1],
					['C', 1],
					['d', 1],
					['a', 1],
					['c', 1],
					['b', 1],
				]),
			).keys(),
		),
		Array.from(
			new Map([
				['a', 1],
				['A', 1],
				['b', 1],
				['B', 1],
				['c', 1],
				['C', 1],
				['d', 1],
			]).keys(),
		),
	);
});

test__sortMap('custom comparator', () => {
	assert.equal(
		sortMap(
			new Map([
				['d', 1],
				['a', 1],
				['c', 1],
				['b', 1],
			]),
			(a, b) => (a[0] > b[0] ? -1 : 1),
		),
		new Map([
			['d', 1],
			['c', 1],
			['b', 1],
			['a', 1],
		]),
	);
});

test__sortMap.run();
/* test__sortMap */
