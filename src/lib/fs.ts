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
 * Empties a directory with an optional `filter`.
 */
export const fs_empty_dir = async (
	dir: string,
	filter?: (path: string) => boolean,
	options?: RmOptions,
): Promise<void> => {
	const entries = await readdir(dir);
	await Promise.all(
		entries
			.filter((path) => !filter || filter(path))
			.map((path) => rm(join(dir, path), {...options, recursive: true})),
	);
};
