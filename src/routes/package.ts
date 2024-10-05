// generated by src/routes/package.gen.ts

import type {Package_Json} from '@ryanatkn/gro/package_json.js';
import type {Src_Json} from '@ryanatkn/gro/src_json.js';

export const package_json = {
	name: '@ryanatkn/belt',
	version: '0.25.3',
	description: 'utility belt for JS',
	glyph: '🦕',
	logo: 'logo.svg',
	logo_alt: 'a green sauropod wearing a brown utility belt',
	motto: 'ancient not extinct',
	public: true,
	license: 'MIT',
	homepage: 'https://belt.ryanatkn.com/',
	author: {name: 'Ryan Atkinson', email: 'mail@ryanatkn.com', url: 'https://www.ryanatkn.com/'},
	repository: {type: 'git', url: 'git+https://github.com/ryanatkn/belt.git'},
	bugs: 'https://github.com/ryanatkn/belt/issues',
	funding: 'https://www.ryanatkn.com/funding',
	scripts: {
		start: 'gro dev',
		dev: 'gro dev',
		build: 'gro build',
		check: 'gro check',
		test: 'gro test',
		preview: 'vite preview',
		deploy: 'gro deploy',
		benchmark: 'gro run src/benchmarks/slugify_benchmark.ts',
	},
	type: 'module',
	engines: {node: '>=20.17'},
	keywords: ['js', 'typescript', 'utilities', 'web'],
	peerDependencies: {'@types/node': '^22.7.4'},
	peerDependenciesMeta: {'@types/node': {optional: true}},
	devDependencies: {
		'@changesets/changelog-git': '^0.2.0',
		'@ryanatkn/eslint-config': '^0.5.5',
		'@ryanatkn/fuz': '^0.129.1',
		'@ryanatkn/gro': '^0.138.2',
		'@ryanatkn/moss': '^0.16.1',
		'@sveltejs/adapter-static': '^3.0.5',
		'@sveltejs/kit': '^2.6.1',
		'@sveltejs/package': '^2.3.5',
		'@sveltejs/vite-plugin-svelte': '^3.1.2',
		'@types/node': '^22.7.4',
		eslint: '^9.12.0',
		'eslint-plugin-svelte': '^2.44.1',
		prettier: '^3.3.3',
		'prettier-plugin-svelte': '^3.2.7',
		svelte: '^5.0.0-next.262',
		'svelte-check': '^4.0.4',
		tinybench: '^2.9.0',
		tslib: '^2.7.0',
		typescript: '^5.6.2',
		'typescript-eslint': '^8.8.0',
		uvu: '^0.5.6',
	},
	prettier: {
		plugins: ['prettier-plugin-svelte'],
		useTabs: true,
		printWidth: 100,
		singleQuote: true,
		bracketSpacing: false,
		overrides: [{files: 'package.json', options: {useTabs: false}}],
	},
	sideEffects: ['**/*.css'],
	files: ['dist', 'src/lib/**/*.ts', '!src/lib/**/*.test.*', '!dist/**/*.test.*'],
	exports: {
		'./package.json': './package.json',
		'./array.js': {types: './dist/array.d.ts', default: './dist/array.js'},
		'./async.js': {types: './dist/async.d.ts', default: './dist/async.js'},
		'./colors.js': {types: './dist/colors.d.ts', default: './dist/colors.js'},
		'./counter.js': {types: './dist/counter.d.ts', default: './dist/counter.js'},
		'./dom.js': {types: './dist/dom.d.ts', default: './dist/dom.js'},
		'./error.js': {types: './dist/error.d.ts', default: './dist/error.js'},
		'./fetch.js': {types: './dist/fetch.d.ts', default: './dist/fetch.js'},
		'./function.js': {types: './dist/function.d.ts', default: './dist/function.js'},
		'./id.js': {types: './dist/id.d.ts', default: './dist/id.js'},
		'./iterator.js': {types: './dist/iterator.d.ts', default: './dist/iterator.js'},
		'./json.js': {types: './dist/json.d.ts', default: './dist/json.js'},
		'./log.js': {types: './dist/log.d.ts', default: './dist/log.js'},
		'./map.js': {types: './dist/map.d.ts', default: './dist/map.js'},
		'./maths.js': {types: './dist/maths.d.ts', default: './dist/maths.js'},
		'./object.js': {types: './dist/object.d.ts', default: './dist/object.js'},
		'./obtainable.js': {types: './dist/obtainable.d.ts', default: './dist/obtainable.js'},
		'./path.js': {types: './dist/path.d.ts', default: './dist/path.js'},
		'./print.js': {types: './dist/print.d.ts', default: './dist/print.js'},
		'./process.js': {types: './dist/process.d.ts', default: './dist/process.js'},
		'./random_alea.js': {types: './dist/random_alea.d.ts', default: './dist/random_alea.js'},
		'./random.js': {types: './dist/random.d.ts', default: './dist/random.js'},
		'./regexp.js': {types: './dist/regexp.d.ts', default: './dist/regexp.js'},
		'./result.js': {types: './dist/result.d.ts', default: './dist/result.js'},
		'./string.js': {types: './dist/string.d.ts', default: './dist/string.js'},
		'./throttle.js': {types: './dist/throttle.d.ts', default: './dist/throttle.js'},
		'./timings.js': {types: './dist/timings.d.ts', default: './dist/timings.js'},
		'./types.js': {types: './dist/types.d.ts', default: './dist/types.js'},
		'./url.js': {types: './dist/url.d.ts', default: './dist/url.js'},
	},
} satisfies Package_Json;

export const src_json = {
	name: '@ryanatkn/belt',
	version: '0.25.3',
	modules: {
		'./package.json': {path: 'package.json', declarations: []},
		'./array.js': {
			path: 'array.ts',
			declarations: [
				{name: 'EMPTY_ARRAY', kind: 'variable'},
				{name: 'to_array', kind: 'function'},
				{name: 'remove_unordered', kind: 'function'},
				{name: 'to_next', kind: 'function'},
			],
		},
		'./async.js': {
			path: 'async.ts',
			declarations: [
				{name: 'Async_Status', kind: 'type'},
				{name: 'wait', kind: 'function'},
				{name: 'is_promise', kind: 'function'},
				{name: 'Deferred', kind: 'type'},
				{name: 'create_deferred', kind: 'function'},
			],
		},
		'./colors.js': {
			path: 'colors.ts',
			declarations: [
				{name: 'Hsl', kind: 'type'},
				{name: 'Hue', kind: 'type'},
				{name: 'Saturation', kind: 'type'},
				{name: 'Lightness', kind: 'type'},
				{name: 'Rgb', kind: 'type'},
				{name: 'Red', kind: 'type'},
				{name: 'Green', kind: 'type'},
				{name: 'Blue', kind: 'type'},
				{name: 'rgb_to_hex', kind: 'function'},
				{name: 'hex_to_rgb', kind: 'function'},
				{name: 'hex_string_to_rgb', kind: 'function'},
				{name: 'rgb_to_hex_string', kind: 'function'},
				{name: 'to_hex_component', kind: 'function'},
				{name: 'rgb_to_hsl', kind: 'function'},
				{name: 'hsl_to_rgb', kind: 'function'},
				{name: 'hue_to_rgb_component', kind: 'function'},
				{name: 'hsl_to_hex', kind: 'function'},
				{name: 'hsl_to_hex_string', kind: 'function'},
				{name: 'hsl_to_string', kind: 'function'},
				{name: 'hex_string_to_hsl', kind: 'function'},
				{name: 'parse_hsl_string', kind: 'function'},
			],
		},
		'./counter.js': {
			path: 'counter.ts',
			declarations: [
				{name: 'Counter', kind: 'type'},
				{name: 'Create_Counter', kind: 'type'},
				{name: 'create_counter', kind: 'function'},
			],
		},
		'./dom.js': {
			path: 'dom.ts',
			declarations: [
				{name: 'is_editable', kind: 'function'},
				{name: 'inside_editable', kind: 'function'},
				{name: 'swallow', kind: 'function'},
				{name: 'handle_target_value', kind: 'function'},
				{name: 'is_iframed', kind: 'function'},
			],
		},
		'./error.js': {
			path: 'error.ts',
			declarations: [
				{name: 'Unreachable_Error', kind: 'class'},
				{name: 'unreachable', kind: 'function'},
			],
		},
		'./fetch.js': {
			path: 'fetch.ts',
			declarations: [
				{name: 'Fetch_Value_Options', kind: 'type'},
				{name: 'fetch_value', kind: 'function'},
				{name: 'Fetch_Value_Cache_Key', kind: 'variable'},
				{name: 'Fetch_Value_Cache_Item', kind: 'variable'},
				{name: 'Fetch_Value_Cache', kind: 'variable'},
				{name: 'to_fetch_value_cache_key', kind: 'function'},
				{name: 'serialize_cache', kind: 'function'},
				{name: 'deserialize_cache', kind: 'function'},
			],
		},
		'./function.js': {
			path: 'function.ts',
			declarations: [
				{name: 'noop', kind: 'function'},
				{name: 'noop_async', kind: 'function'},
				{name: 'resolved', kind: 'variable'},
				{name: 'identity', kind: 'function'},
				{name: 'Lazy', kind: 'type'},
				{name: 'lazy', kind: 'function'},
			],
		},
		'./id.js': {
			path: 'id.ts',
			declarations: [
				{name: 'Uuid', kind: 'type'},
				{name: 'is_uuid', kind: 'function'},
				{name: 'UUID_MATCHER', kind: 'variable'},
				{name: 'Client_Id_Creator', kind: 'type'},
				{name: 'create_client_id_creator', kind: 'function'},
			],
		},
		'./iterator.js': {
			path: 'iterator.ts',
			declarations: [{name: 'count_iterator', kind: 'function'}],
		},
		'./json.js': {
			path: 'json.ts',
			declarations: [
				{name: 'Json', kind: 'type'},
				{name: 'Json_Type', kind: 'type'},
				{name: 'to_json_type', kind: 'function'},
				{name: 'canonicalize', kind: 'function'},
				{name: 'embed_json', kind: 'function'},
			],
		},
		'./log.js': {
			path: 'log.ts',
			declarations: [
				{name: 'Log_Level', kind: 'type'},
				{name: 'to_log_level_value', kind: 'function'},
				{name: 'configure_log_level', kind: 'function'},
				{name: 'configure_log_colors', kind: 'function'},
				{name: 'Log', kind: 'type'},
				{name: 'Logger_State', kind: 'type'},
				{name: 'Logger_Prefixes_And_Suffixes_Getter', kind: 'type'},
				{name: 'Base_Logger', kind: 'class'},
				{name: 'Logger', kind: 'class'},
				{name: 'System_Logger', kind: 'class'},
			],
		},
		'./map.js': {
			path: 'map.ts',
			declarations: [
				{name: 'sort_map', kind: 'function'},
				{name: 'compare_simple_map_entries', kind: 'function'},
			],
		},
		'./maths.js': {
			path: 'maths.ts',
			declarations: [
				{name: 'clamp', kind: 'function'},
				{name: 'lerp', kind: 'function'},
				{name: 'round', kind: 'function'},
				{name: 'GR', kind: 'variable'},
				{name: 'GR_i', kind: 'variable'},
				{name: 'GR_2', kind: 'variable'},
				{name: 'GR_2i', kind: 'variable'},
				{name: 'GR_3', kind: 'variable'},
				{name: 'GR_3i', kind: 'variable'},
				{name: 'GR_4', kind: 'variable'},
				{name: 'GR_4i', kind: 'variable'},
				{name: 'GR_5', kind: 'variable'},
				{name: 'GR_5i', kind: 'variable'},
				{name: 'GR_6', kind: 'variable'},
				{name: 'GR_6i', kind: 'variable'},
				{name: 'GR_7', kind: 'variable'},
				{name: 'GR_7i', kind: 'variable'},
				{name: 'GR_8', kind: 'variable'},
				{name: 'GR_8i', kind: 'variable'},
				{name: 'GR_9', kind: 'variable'},
				{name: 'GR_9i', kind: 'variable'},
			],
		},
		'./object.js': {
			path: 'object.ts',
			declarations: [
				{name: 'is_plain_object', kind: 'function'},
				{name: 'map_record', kind: 'function'},
				{name: 'omit', kind: 'function'},
				{name: 'pick_by', kind: 'function'},
				{name: 'omit_undefined', kind: 'function'},
				{name: 'reorder', kind: 'function'},
				{name: 'EMPTY_OBJECT', kind: 'variable'},
				{name: 'traverse', kind: 'function'},
			],
		},
		'./obtainable.js': {
			path: 'obtainable.ts',
			declarations: [
				{name: 'Unobtain', kind: 'type'},
				{name: 'create_obtainable', kind: 'function'},
			],
		},
		'./path.js': {
			path: 'path.ts',
			declarations: [
				{name: 'parse_path_parts', kind: 'function'},
				{name: 'parse_path_segments', kind: 'function'},
				{name: 'parse_path_pieces', kind: 'function'},
				{name: 'Path_Piece', kind: 'type'},
				{name: 'slugify', kind: 'function'},
			],
		},
		'./print.js': {
			path: 'print.ts',
			declarations: [
				{name: 'enable_colors', kind: 'function'},
				{name: 'disable_colors', kind: 'function'},
				{name: 'print_key_value', kind: 'function'},
				{name: 'print_ms', kind: 'function'},
				{name: 'print_number_with_separators', kind: 'function'},
				{name: 'print_string', kind: 'function'},
				{name: 'print_number', kind: 'function'},
				{name: 'print_boolean', kind: 'function'},
				{name: 'print_value', kind: 'function'},
				{name: 'print_error', kind: 'function'},
				{name: 'print_timing', kind: 'function'},
				{name: 'print_timings', kind: 'function'},
				{name: 'print_log_label', kind: 'function'},
			],
		},
		'./process.js': {
			path: 'process.ts',
			declarations: [
				{name: 'Spawned_Process', kind: 'type'},
				{name: 'Spawned', kind: 'type'},
				{name: 'Spawn_Result', kind: 'type'},
				{name: 'spawn', kind: 'function'},
				{name: 'Spawned_Out', kind: 'type'},
				{name: 'spawn_out', kind: 'function'},
				{name: 'spawn_process', kind: 'function'},
				{name: 'print_child_process', kind: 'function'},
				{name: 'global_spawn', kind: 'variable'},
				{name: 'register_global_spawn', kind: 'function'},
				{name: 'despawn', kind: 'function'},
				{name: 'despawn_all', kind: 'function'},
				{name: 'attach_process_error_handlers', kind: 'function'},
				{name: 'print_spawn_result', kind: 'function'},
				{name: 'Restartable_Process', kind: 'type'},
				{name: 'spawn_restartable_process', kind: 'function'},
			],
		},
		'./random_alea.js': {
			path: 'random_alea.ts',
			declarations: [
				{name: 'Alea', kind: 'type'},
				{name: 'create_random_alea', kind: 'function'},
				{name: 'masher', kind: 'function'},
			],
		},
		'./random.js': {
			path: 'random.ts',
			declarations: [
				{name: 'random_float', kind: 'function'},
				{name: 'random_int', kind: 'function'},
				{name: 'random_boolean', kind: 'function'},
				{name: 'random_item', kind: 'function'},
				{name: 'shuffle', kind: 'function'},
			],
		},
		'./regexp.js': {path: 'regexp.ts', declarations: [{name: 'escape_regexp', kind: 'function'}]},
		'./result.js': {
			path: 'result.ts',
			declarations: [
				{name: 'Result', kind: 'type'},
				{name: 'OK', kind: 'variable'},
				{name: 'NOT_OK', kind: 'variable'},
				{name: 'unwrap', kind: 'function'},
				{name: 'Result_Error', kind: 'class'},
				{name: 'unwrap_error', kind: 'function'},
			],
		},
		'./string.js': {
			path: 'string.ts',
			declarations: [
				{name: 'truncate', kind: 'function'},
				{name: 'strip_start', kind: 'function'},
				{name: 'strip_end', kind: 'function'},
				{name: 'strip_after', kind: 'function'},
				{name: 'strip_before', kind: 'function'},
				{name: 'ensure_start', kind: 'function'},
				{name: 'ensure_end', kind: 'function'},
				{name: 'deindent', kind: 'function'},
				{name: 'plural', kind: 'function'},
				{name: 'count_graphemes', kind: 'function'},
			],
		},
		'./throttle.js': {
			path: 'throttle.ts',
			declarations: [
				{name: 'Throttle_Options', kind: 'type'},
				{name: 'throttle', kind: 'function'},
			],
		},
		'./timings.js': {
			path: 'timings.ts',
			declarations: [
				{name: 'Stopwatch', kind: 'type'},
				{name: 'create_stopwatch', kind: 'function'},
				{name: 'Timings_Key', kind: 'type'},
				{name: 'Timings', kind: 'class'},
			],
		},
		'./types.js': {
			path: 'types.ts',
			declarations: [
				{name: 'Omit_Strict', kind: 'type'},
				{name: 'Pick_Union', kind: 'type'},
				{name: 'Keyof_Union', kind: 'type'},
				{name: 'Partial_Except', kind: 'type'},
				{name: 'Partial_Only', kind: 'type'},
				{name: 'Partial_Values', kind: 'type'},
				{name: 'Assignable', kind: 'type'},
				{name: 'Defined', kind: 'type'},
				{name: 'Not_Null', kind: 'type'},
				{name: 'Array_Element', kind: 'type'},
				{name: 'Flavored', kind: 'type'},
				{name: 'Flavor', kind: 'type'},
				{name: 'Branded', kind: 'type'},
				{name: 'Brand', kind: 'type'},
			],
		},
		'./url.js': {path: 'url.ts', declarations: [{name: 'format_url', kind: 'function'}]},
	},
} satisfies Src_Json;

// generated by src/routes/package.gen.ts
