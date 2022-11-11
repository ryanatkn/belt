import {extname, basename, dirname} from 'path';

export const stripTrailingSlash = (p: string): string =>
	p.endsWith('/') ? p.substring(0, p.length - 1) : p;

// Note this treats `foo.d.ts` as `.ts` - compound extensions should use `stripEnd`
export const replaceExtension = (path: string, newExtension: string): string => {
	const {length} = extname(path);
	return (length === 0 ? path : path.substring(0, path.length - length)) + newExtension;
};

// Gets the stem of a path, the "b" of "/a/b.c".
export const toPathStem = (path: string): string => replaceExtension(basename(path), '');

// Note that this operates on file paths, not directories.
// It will strip the basename of any directories, which seems surprising.
// The algorithm will be really slow for any big large array sizes. Don't do that.
export const toCommonBaseDir = (filePaths: string[]): string => {
	const dirs = filePaths.map((p) => dirname(p));
	if (dirs.length === 1) return dirs[0];
	const longest = [dirs[0]];
	// stop if we get to ''
	while (dirs[0]) {
		let longestLength = longest[0].length;
		for (let i = 1; i < dirs.length; i++) {
			const path = dirs[i];
			if (path.length > longestLength) {
				longest.length = 1;
				longest[0] = path;
				longestLength = path.length;
			} else if (path.length === longestLength) {
				longest.push(path);
			}
		}
		if (longest.length === dirs.length) return longest[0];
		for (const path of longest) {
			dirs[dirs.findIndex((d) => d === path)] = dirname(path);
		}
		longest.length = 1;
		longest[0] = dirs[0];
	}
	throw Error(`Unable to find a common base dir: ${filePaths.join(' ')}`);
};
