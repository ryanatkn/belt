// TODO these probably belong in `./path.ts` but we need to shim Node's `path` for the browser:
// https://www.npmjs.com/package/path-browserify
// until then these are tested in `./path.test.ts`

// Designed for the `cheap-watch` API.
// toPathParts('./foo/bar/baz.ts') => ['foo', 'foo/bar', 'foo/bar/baz.ts']
export const toPathParts = (path: string): string[] => {
	const segments = toPathSegments(path);
	let currentPath = path.startsWith('/') ? '/' : '';
	return segments.map((segment) => {
		if (currentPath && currentPath !== '/') {
			currentPath += '/';
		}
		currentPath += segment;
		return currentPath;
	});
};

// Gets the individual parts of a path, ignoring dots and separators.
// toPathSegments('/foo/bar/baz.ts') => ['foo', 'bar', 'baz.ts']
export const toPathSegments = (path: string): string[] =>
	path.split('/').filter((s) => s && s !== '.' && s !== '..');

// Treats all paths as absolute, so the first piece is always a `'/'` with type `'separator'`.
// TODO maybe rethink this API, it's a bit weird, but fits the usage in `ui/Breadcrumbs.svelte`
export const toPathPieces = (rawPath: string): PathPiece[] => {
	const pieces: PathPiece[] = [];
	const pathSegments = toPathSegments(rawPath);
	if (pathSegments.length) {
		pieces.push({type: 'separator', path: '/'});
	}
	let path = '';
	for (let i = 0; i < pathSegments.length; i++) {
		const pathSegment = pathSegments[i];
		path += '/' + pathSegment;
		pieces.push({type: 'piece', name: pathSegment, path});
		if (i !== pathSegments.length - 1) {
			pieces.push({type: 'separator', path});
		}
	}
	return pieces;
};
export type PathPiece =
	| {
			type: 'piece';
			path: string;
			name: string;
	  }
	| {
			type: 'separator';
			path: string;
	  };
