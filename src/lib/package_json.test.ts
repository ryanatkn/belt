import {test, assert} from 'vitest';

import {Package_Json, Package_Json_Exports} from '$lib/package_json.js';

test('Package_Json.parse', () => {
	Package_Json.parse({name: 'abc', version: '123'});
});

test('Package_Json.parse fails with bad data', () => {
	let err;
	try {
		Package_Json.parse({version: '123'});
	} catch (_err) {
		err = _err;
	}
	assert.ok(err);
});

test('`Package_Json_Exports` parses simple string exports', () => {
	const exports = {
		'.': './index.js',
		'./lib': './lib/index.js',
	};
	const parsed = Package_Json_Exports.safeParse(exports);
	assert.ok(parsed.success);
	assert.deepEqual(exports, parsed.data);
});

test('`Package_Json_Exports` parses null exports', () => {
	const exports = {
		'.': './index.js',
		'./internal/*': null,
	};
	const parsed = Package_Json_Exports.safeParse(exports);
	assert.ok(parsed.success);
	assert.deepEqual(exports, parsed.data);
});

test('`Package_Json_Exports` parses basic conditional exports', () => {
	const exports = {
		'.': {
			import: './index.mjs',
			require: './index.cjs',
			default: './index.js',
		},
	};
	const parsed = Package_Json_Exports.safeParse(exports);
	assert.ok(parsed.success);
	assert.deepEqual(exports, parsed.data);
});

test('`Package_Json_Exports` parses nested conditional exports', () => {
	const exports = {
		'./feature': {
			node: {
				import: './feature-node.mjs',
				require: './feature-node.cjs',
			},
			default: './feature.mjs',
		},
	};
	const parsed = Package_Json_Exports.safeParse(exports);
	assert.ok(parsed.success);
	assert.deepEqual(exports, parsed.data);
});

test('`Package_Json_Exports` parses deeply nested conditional exports', () => {
	const exports = {
		'./advanced': {
			node: {
				development: {
					import: './dev-node.mjs',
					require: './dev-node.cjs',
				},
				production: {
					import: './prod-node.mjs',
					require: './prod-node.cjs',
				},
			},
			default: './feature.mjs',
		},
	};
	const parsed = Package_Json_Exports.safeParse(exports);
	assert.ok(parsed.success);
	assert.deepEqual(exports, parsed.data);
});

test('`Package_Json_Exports` parses mixed exports types', () => {
	const exports = {
		'.': './index.js',
		'./lib': {
			node: './lib/node.js',
			default: './lib/index.js',
		},
		'./feature/*': null,
		'./advanced': {
			node: {
				import: './advanced-node.mjs',
				require: './advanced-node.cjs',
			},
		},
	};
	const parsed = Package_Json_Exports.safeParse(exports);
	assert.ok(parsed.success);
	assert.deepEqual(exports, parsed.data);
});

test('rejects invalid exports', () => {
	const invalid_exports = [
		{
			'.': true, // boolean is not a valid export value
		},
		{
			'.': ['/path'], // array is not a valid export value
		},
		{
			'.': {
				default: true, // boolean is not a valid export value in conditions
			},
		},
		{
			'.': {
				node: {
					import: ['/path'], // array is not a valid nested export value
				},
			},
		},
	];

	for (const invalid_export of invalid_exports) {
		const parsed = Package_Json_Exports.safeParse(invalid_export);
		assert.ok(!parsed.success);
	}
});
