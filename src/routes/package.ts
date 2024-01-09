// generated by src/routes/package.gen.ts

import type {Package_Json} from '@grogarden/gro/package_json.js';
import type {Src_Json} from '@grogarden/gro/src_json.js';

export const package_json = {
	name: '@grogarden/util',
	version: '0.19.1',
	description: 'JS utilities to complement the modern web platform',
	icon: '🦕',
	public: true,
	license: 'MIT',
	homepage: 'https://util.grogarden.org/',
	author: {name: 'Felt Co-op', email: 'team@felt.social', url: 'https://www.felt.social/'},
	repository: {type: 'git', url: 'git+https://github.com/grogarden/util.git'},
	bugs: {url: 'https://github.com/grogarden/util/issues', email: 'team@felt.social'},
	type: 'module',
	engines: {node: '>=20.10'},
	scripts: {
		start: 'gro dev',
		dev: 'gro dev',
		build: 'gro build',
		test: 'gro test',
		deploy: 'gro deploy',
	},
	keywords: ['js', 'typescript', 'utilities', 'web'],
	files: ['dist'],
	peerDependencies: {kleur: '^4.0.0'},
	devDependencies: {
		'@changesets/changelog-git': '^0.2.0',
		'@feltjs/eslint-config': '^0.4.1',
		'@fuz.dev/fuz': '^0.81.0',
		'@fuz.dev/fuz_library': '^0.23.0',
		'@grogarden/gro': '^0.109.1',
		'@sveltejs/adapter-static': '^3.0.1',
		'@sveltejs/kit': '^2.0.6',
		'@sveltejs/package': '^2.2.5',
		'@sveltejs/vite-plugin-svelte': '^3.0.1',
		'@types/node': '^20.10.6',
		'@typescript-eslint/eslint-plugin': '^6.17.0',
		'@typescript-eslint/parser': '^6.17.0',
		eslint: '^8.56.0',
		'eslint-plugin-svelte': '^2.35.1',
		kleur: '^4.1.5',
		prettier: '^3.1.1',
		'prettier-plugin-svelte': '^3.1.2',
		svelte: '^4.2.8',
		'svelte-check': '^3.6.2',
		tslib: '^2.6.2',
		typescript: '^5.3.3',
		uvu: '^0.5.6',
	},
	eslintConfig: {root: true, extends: '@feltjs', rules: {'no-console': 1}},
	prettier: {
		plugins: ['prettier-plugin-svelte'],
		useTabs: true,
		printWidth: 100,
		singleQuote: true,
		bracketSpacing: false,
		overrides: [{files: 'package.json', options: {useTabs: false}}],
	},
	exports: {
		'./array.js': {default: './dist/array.js', types: './dist/array.d.ts'},
		'./async.js': {default: './dist/async.js', types: './dist/async.d.ts'},
		'./counter.js': {default: './dist/counter.js', types: './dist/counter.d.ts'},
		'./dom.js': {default: './dist/dom.js', types: './dist/dom.d.ts'},
		'./error.js': {default: './dist/error.js', types: './dist/error.d.ts'},
		'./fetch.js': {default: './dist/fetch.js', types: './dist/fetch.d.ts'},
		'./function.js': {default: './dist/function.js', types: './dist/function.d.ts'},
		'./id.js': {default: './dist/id.js', types: './dist/id.d.ts'},
		'./json.js': {default: './dist/json.js', types: './dist/json.d.ts'},
		'./log.js': {default: './dist/log.js', types: './dist/log.d.ts'},
		'./map.js': {default: './dist/map.js', types: './dist/map.d.ts'},
		'./maths.js': {default: './dist/maths.js', types: './dist/maths.d.ts'},
		'./object.js': {default: './dist/object.js', types: './dist/object.d.ts'},
		'./obtainable.js': {default: './dist/obtainable.js', types: './dist/obtainable.d.ts'},
		'./path.js': {default: './dist/path.js', types: './dist/path.d.ts'},
		'./print.js': {default: './dist/print.js', types: './dist/print.d.ts'},
		'./process.js': {default: './dist/process.js', types: './dist/process.d.ts'},
		'./random_alea.js': {default: './dist/random_alea.js', types: './dist/random_alea.d.ts'},
		'./random.js': {default: './dist/random.js', types: './dist/random.d.ts'},
		'./regexp.js': {default: './dist/regexp.js', types: './dist/regexp.d.ts'},
		'./result.js': {default: './dist/result.js', types: './dist/result.d.ts'},
		'./string.js': {default: './dist/string.js', types: './dist/string.d.ts'},
		'./timings.js': {default: './dist/timings.js', types: './dist/timings.d.ts'},
		'./types.js': {default: './dist/types.js', types: './dist/types.d.ts'},
	},
} satisfies Package_Json;

export const src_json = {
	name: '@grogarden/util',
	version: '0.19.1',
	modules: {
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
			],
		},
		'./counter.js': {
			path: 'counter.ts',
			declarations: [
				{name: 'Counter', kind: 'type'},
				{name: 'create_counter', kind: 'function'},
			],
		},
		'./dom.js': {
			path: 'dom.ts',
			declarations: [
				{name: 'is_editable', kind: 'function'},
				{name: 'swallow', kind: 'function'},
				{name: 'handle_target_value', kind: 'function'},
				{name: 'is_iframed', kind: 'function'},
			],
		},
		'./error.js': {path: 'error.ts', declarations: [{name: 'Unreachable_Error', kind: 'class'}]},
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
				{name: 'uuid_matcher', kind: 'variable'},
				{name: 'Client_Id_Creator', kind: 'type'},
				{name: 'create_client_id_creator', kind: 'function'},
			],
		},
		'./json.js': {
			path: 'json.ts',
			declarations: [
				{name: 'Json', kind: 'type'},
				{name: 'Json_Type', kind: 'type'},
				{name: 'to_json_type', kind: 'function'},
				{name: 'canonicalize', kind: 'function'},
			],
		},
		'./log.js': {
			path: 'log.ts',
			declarations: [
				{name: 'Log_Level', kind: 'type'},
				{name: 'to_log_level_value', kind: 'function'},
				{name: 'configure_log_level', kind: 'function'},
				{name: 'Log', kind: 'type'},
				{name: 'Logger_State', kind: 'type'},
				{name: 'Base_Logger', kind: 'class'},
				{name: 'Logger', kind: 'class'},
				{name: 'System_Logger', kind: 'class'},
				{name: 'print_log_label', kind: 'function'},
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
			],
		},
		'./print.js': {
			path: 'print.ts',
			declarations: [
				{name: 'Colorize', kind: 'type'},
				{name: 'Colors', kind: 'type'},
				{name: 'kleur_colors', kind: 'variable'},
				{name: 'disabled_colors', kind: 'variable'},
				{name: 'get_colors', kind: 'function'},
				{name: 'set_colors', kind: 'function'},
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
				{name: 'to_grapheme_count', kind: 'function'},
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
	},
} satisfies Src_Json;

// generated by src/routes/package.gen.ts
