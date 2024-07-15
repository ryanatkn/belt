import {Bench} from 'tinybench';

import {slugify, slugify2} from '$lib/path.js';

const bench = new Bench({time: 1000});

const title = 'this Is a Test of Things to Do';

const results1 = [];
const results2 = [];

bench
	.add('slugify current', () => {
		results1.push(slugify(title));
	})
	.add('slugify new', () => {
		results2.push(slugify2(title));
	})
	.todo('unimplemented bench');

await bench.warmup(); // make results more reliable, ref: https://github.com/tinylibs/tinybench/pull/50
await bench.run();

console.table(bench.table());

console.log(`results1.length`, results1.length);
console.log(`results2.length`, results2.length);
