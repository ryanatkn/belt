import {suite} from 'uvu';
import * as assert from 'uvu/assert';

import {toObtainable} from './obtainable.js';
import {noop} from './function.js';

/* test__toObtainable */
const test__toObtainable = suite('toObtainable');

test__toObtainable('unobtain out of order', async () => {
	let thing: symbol | undefined;
	let isUnobtained = false;
	const obtainThing = toObtainable(
		() => {
			assert.is(thing, undefined);
			thing = Symbol();
			return thing;
		},
		(thingUnobtained) => {
			isUnobtained = true;
			assert.is(thingUnobtained, thing);
		},
	);

	const [thing1, unobtain1] = obtainThing();
	assert.is(thing1, thing);
	assert.not.ok(isUnobtained);

	const [thing2, unobtain2] = obtainThing();
	assert.is(thing2, thing);
	assert.not.ok(isUnobtained);
	assert.is.not(unobtain1, unobtain2); // unobtain function refs should not be the same

	const [thing3, unobtain3] = obtainThing();
	assert.is(thing3, thing);
	assert.not.ok(isUnobtained);

	unobtain2();
	assert.not.ok(isUnobtained);

	unobtain3();
	unobtain3(); // call unobtain additional times to make sure it's idempotent
	unobtain3();
	assert.not.ok(isUnobtained);

	unobtain1();
	assert.ok(isUnobtained);

	const originalThing = thing;
	thing = undefined;
	isUnobtained = false;
	const [thing4, unobtain4] = obtainThing();
	assert.ok(thing4);
	assert.is(thing4, thing);
	assert.is.not(thing4, originalThing);
	assert.not.ok(isUnobtained);
	unobtain4();
	assert.ok(isUnobtained);
});

test__toObtainable('cannot obtain undefined', () => {
	const obtainThing = toObtainable(() => undefined, noop);
	assert.throws(() => obtainThing());
});

test__toObtainable.run();
/* test__toObtainable */
