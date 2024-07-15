// TODO BLOCK test these

/**
 * @example parse_path_parts('./foo/bar/baz.ts') => ['foo', 'foo/bar', 'foo/bar/baz.ts']
 */
export const parse_path_parts = (path: string): string[] => {
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
export const parse_path_segments = (path: string): string[] =>
	path.split('/').filter((s) => s && s !== '.' && s !== '..');

/**
 * Treats all paths as absolute, so the first piece is always a `'/'` with type `'separator'`.
 * @todo maybe rethink this API, it's a bit weird, but fits the usage in `ui/Breadcrumbs.svelte`
 */
export const parse_path_pieces = (raw_path: string): Path_Piece[] => {
	const pieces: Path_Piece[] = [];
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

export type Path_Piece =
	| {
			type: 'piece';
			path: string;
			name: string;
	  }
	| {
			type: 'separator';
			path: string;
	  };

export const slugify = (str: string): string => {
	let s = str.toLowerCase();
	for (const mapper of get_special_char_mappers()) {
		s = mapper(s);
	}
	return s
		.split(/\s+/g) // collapse whitespace
		.map((s) => s.replace(/\W/g, '')) // remove all non-word characters
		.filter(Boolean)
		.join('-'); // remove all `''`
};
export const slugify2 = (str: string): string => {
	let s = str.trim().toLowerCase();
	for (const mapper of get_special_char_mappers()) {
		s = mapper(s);
	}
	return s
		.replace(/[^a-z0-9 _-]/g, '') // remove invalid chars
		.replace(/\s+/g, '-') // collapse whitespace and replace by -
		.replace(/-+/g, '-'); // collapse dashes
};

// @see https://stackoverflow.com/questions/1053902/how-to-convert-a-title-to-a-url-slug-in-jquery/5782563#5782563
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
			s.replace(new RegExp(special_char_from.charAt(i), 'g'), special_char_to.charAt(i)),
		);
	}
	return special_char_mappers;
};
