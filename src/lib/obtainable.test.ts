import {test} from 'uvu';
import * as assert from 'uvu/assert';

import {create_obtainable} from './obtainable.js';
import {noop} from './function.js';

test('unobtain out of order', async () => {
	let thing: symbol | undefined;
	let unobtained = false;
	const obtain_thing = create_obtainable(
		() => {
			assert.is(thing, undefined);
			thing = Symbol();
			return thing;
		},
		(thing_unobtained) => {
			unobtained = true;
			assert.is(thing_unobtained, thing);
		},
	);

	const [thing1, unobtain1] = obtain_thing();
	assert.is(thing1, thing);
	assert.not.ok(unobtained);

	const [thing2, unobtain2] = obtain_thing();
	assert.is(thing2, thing);
	assert.not.ok(unobtained);
	assert.is.not(unobtain1, unobtain2); // unobtain function refs should not be the same

	const [thing3, unobtain3] = obtain_thing();
	assert.is(thing3, thing);
	assert.not.ok(unobtained);

	unobtain2();
	assert.not.ok(unobtained);

	unobtain3();
	unobtain3(); // call unobtain additional times to make sure it's idempotent
	unobtain3();
	assert.not.ok(unobtained);

	unobtain1();
	assert.ok(unobtained);

	const original_thing = thing;
	thing = undefined;
	unobtained = false;
	const [thing4, unobtain4] = obtain_thing();
	assert.ok(thing4);
	assert.is(thing4, thing);
	assert.is.not(thing4, original_thing);
	assert.not.ok(unobtained);
	unobtain4();
	assert.ok(unobtained);
});

test('cannot obtain undefined', () => {
	const obtain_thing = create_obtainable(() => undefined, noop);
	assert.throws(() => obtain_thing());
});

test.run();
