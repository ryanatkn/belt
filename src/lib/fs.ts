import {rm, readdir, access, constants} from 'node:fs/promises';
import type {RmOptions} from 'node:fs';
import {join} from 'node:path';

/**
 * Checks if a file or directory exists.
 */
export const fs_exists = async (path: string): Promise<boolean> => {
	try {
		await access(path, constants.F_OK);
		return true;
	} catch {
		return false;
	}
};

/**
 * Empties a directory, recursively by default. If `should_remove` is provided, only entries where it returns `true` are removed.
 */
export const fs_empty_dir = async (
	dir: string,
	should_remove?: (name: string) => boolean,
	options?: RmOptions,
): Promise<void> => {
	const entries = await readdir(dir);
	const to_remove = should_remove ? entries.filter(should_remove) : entries;
	await Promise.all(to_remove.map((name) => rm(join(dir, name), {recursive: true, ...options})));
};
