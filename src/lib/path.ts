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
 * @param path
 * @returns
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
