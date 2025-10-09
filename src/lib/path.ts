import {fileURLToPath, type URL} from 'node:url';

import type {Flavored} from './types.js';

/**
 * An absolute path on the filesystem. Named "id" to be consistent with Rollup.
 */
export type Path_Id = Flavored<string, 'Path_Id'>;

/**
 * Basic information about a filesystem path.
 */
export interface Path_Info {
	id: Path_Id;
	is_directory: boolean;
}

/**
 * A resolved path with both the original path string and its absolute id.
 */
export interface Resolved_Path extends Path_Info {
	path: string;
}

/**
 * A filter function for paths, can distinguish between files and directories.
 */
export type Path_Filter = (path: string, is_directory: boolean) => boolean;

/**
 * A filter function for file paths only.
 */
export type File_Filter = (path: string) => boolean;

/**
 * Converts a URL to a file path string, or returns the string as-is.
 */
export const to_file_path = (path_or_url: string | URL): string =>
	typeof path_or_url === 'string' ? path_or_url : fileURLToPath(path_or_url);

/**
 * @example parse_path_parts('./foo/bar/baz.ts') => ['foo', 'foo/bar', 'foo/bar/baz.ts']
 */
export const parse_path_parts = (path: string): Array<string> => {
	const segments = parse_path_segments(path);
	let current_path = path.startsWith('/') ? '/' : '';
	return segments.map((segment) => {
		if (current_path && current_path !== '/') {
			current_path += '/';
		}
		current_path += segment;
		return current_path;
	});
};

/**
 * Gets the individual parts of a path, ignoring dots and separators.
 * @example parse_path_segments('/foo/bar/baz.ts') => ['foo', 'bar', 'baz.ts']
 */
export const parse_path_segments = (path: string): Array<string> =>
	path.split('/').filter((s) => s && s !== '.' && s !== '..');

/**
 * A piece of a parsed path, either a path segment or separator.
 */
export type Path_Piece =
	| {
			type: 'piece';
			path: Path_Id;
			name: string;
	  }
	| {
			type: 'separator';
			path: Path_Id;
	  };

/**
 * Treats all paths as absolute, so the first piece is always a `'/'` with type `'separator'`.
 * @todo maybe rethink this API, it's a bit weird, but fits the usage in `ui/Breadcrumbs.svelte`
 */
export const parse_path_pieces = (raw_path: string): Array<Path_Piece> => {
	const pieces: Array<Path_Piece> = [];
	const path_segments = parse_path_segments(raw_path);
	if (path_segments.length) {
		pieces.push({type: 'separator', path: '/'});
	}
	let path = '';
	for (let i = 0; i < path_segments.length; i++) {
		const path_segment = path_segments[i];
		path += '/' + path_segment;
		pieces.push({type: 'piece', name: path_segment, path});
		if (i !== path_segments.length - 1) {
			pieces.push({type: 'separator', path});
		}
	}
	return pieces;
};

/**
 * Converts a string into a URL-compatible slug.
 * @param str - The string to convert
 * @param map_special_characters - If `true`, characters like `ñ` are converted
 * to their ASCII equivalents. Runs around 5x faster when disabled.
 */
export const slugify = (str: string, map_special_characters = true): string => {
	let s = str.toLowerCase();
	if (map_special_characters) {
		for (const mapper of get_special_char_mappers()) {
			s = mapper(s);
		}
	}
	return s
		.replace(/[^\s\w-]/g, '')
		.split(/[\s-]+/g) // collapse whitespace
		.filter(Boolean)
		.join('-'); // remove all `''`
};

/**
 * @see https://stackoverflow.com/questions/1053902/how-to-convert-a-title-to-a-url-slug-in-jquery/5782563#5782563
 */
const special_char_from = 'áäâàãåÆþčçćďđéěëèêẽĕȇğíìîïıňñóöòôõøðřŕšşßťúůüùûýÿž';
const special_char_to = 'aaaaaaabcccddeeeeeeeegiiiiinnooooooorrssstuuuuuyyz';
let special_char_mappers: Array<(s: string) => string> | undefined;
/**
 * Lazily constructs `special_char_mappers` which
 * converts special characters to their ASCII equivalents.
 */
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
