import {Bench} from 'tinybench';

import {slugify} from '$lib/path.js';

/* eslint-disable no-console */

/*

This implementation from Stackoverflow is slower than Belt's.
It also doesn't quite pass our tests because of leading/trailing `-` and underscore handling,
and conforming would only make it slower.

┌─────────┬───────────────────┬───────────┬────────────────────┬──────────┬─────────┐
│ (index) │ Task Name         │ ops/sec   │ Average Time (ns)  │ Margin   │ Samples │
├─────────┼───────────────────┼───────────┼────────────────────┼──────────┼─────────┤
│ 0       │ 'slugify current' │ '312,547' │ 3199.514706889348  │ '±0.39%' │ 3125474 │
│ 1       │ 'slugify slower'  │ '265,941' │ 3760.2206429301086 │ '±1.03%' │ 2659419 │
└─────────┴───────────────────┴───────────┴────────────────────┴──────────┴─────────┘

*/
/**
 * @see https://stackoverflow.com/questions/1053902/how-to-convert-a-title-to-a-url-slug-in-jquery/5782563#5782563
 */
const slugify_slower = (str: string): string => {
	let s = str.toLowerCase();
	for (const mapper of get_special_char_mappers()) {
		s = mapper(s);
	}
	return s
		.replace(/[^a-z0-9 -]/g, '')
		.replace(/\s+/g, '-')
		.replace(/-+/g, '-');
};
const special_char_from = 'áäâàãåÆþčçćďđéěëèêẽĕȇğíìîïıňñóöòôõøðřŕšşßťúůüùûýÿž';
const special_char_to = 'aaaaaaabcccddeeeeeeeegiiiiinnooooooorrssstuuuuuyyz';
let special_char_mappers: Array<(s: string) => string> | undefined;
const get_special_char_mappers = (): Array<(s: string) => string> => {
	if (special_char_mappers) return special_char_mappers;
	special_char_mappers = [];
	for (let i = 0, j = special_char_from.length; i < j; i++) {
		special_char_mappers.push((s) =>
			s.replaceAll(special_char_from.charAt(i), special_char_to.charAt(i)),
		);
	}
	return special_char_mappers;
};

const bench = new Bench({time: 5000, warmup: true});

const title = 'this Is a Test of Things to Do';

const results1 = [];
const results2 = [];

bench
	.add('slugify current', () => {
		results1.push(slugify(title));
	})
	.add('slugify current without special characters', () => {
		results2.push(slugify(title, false));
	})
	.add('slugify slower', () => {
		results2.push(slugify_slower(title));
	});
// .todo('unimplemented bench');

await bench.run();

console.table(bench.table());

console.log(`results1.length`, results1.length);
console.log(`results2.length`, results2.length);
