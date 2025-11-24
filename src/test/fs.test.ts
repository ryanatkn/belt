import {test, expect} from 'vitest';
import {mkdir, writeFile, readdir, rm, stat, symlink} from 'node:fs/promises';
import {join} from 'node:path';
import {tmpdir} from 'node:os';

import {fs_exists, fs_empty_dir} from '$lib/fs.ts';

const create_temp_dir = async (): Promise<string> => {
	const dir = join(tmpdir(), `belt-fs-test-${Date.now()}-${Math.random().toString(36).slice(2)}`);
	await mkdir(dir, {recursive: true});
	return dir;
};

// fs_exists

test('fs_exists returns true for existing file', async () => {
	const dir = await create_temp_dir();
	const file = join(dir, 'test.txt');
	await writeFile(file, 'hello');

	expect(await fs_exists(file)).toBe(true);

	await rm(dir, {recursive: true});
});

test('fs_exists returns true for existing directory', async () => {
	const dir = await create_temp_dir();

	expect(await fs_exists(dir)).toBe(true);

	await rm(dir, {recursive: true});
});

test('fs_exists returns false for non-existent path', async () => {
	expect(await fs_exists('/non/existent/path/that/does/not/exist')).toBe(false);
});

test('fs_exists returns false after file is deleted', async () => {
	const dir = await create_temp_dir();
	const file = join(dir, 'test.txt');
	await writeFile(file, 'hello');

	expect(await fs_exists(file)).toBe(true);
	await rm(file);
	expect(await fs_exists(file)).toBe(false);

	await rm(dir, {recursive: true});
});

// fs_empty_dir

test('fs_empty_dir removes all files from directory', async () => {
	const dir = await create_temp_dir();
	await writeFile(join(dir, 'a.txt'), 'a');
	await writeFile(join(dir, 'b.txt'), 'b');
	await writeFile(join(dir, 'c.txt'), 'c');

	expect((await readdir(dir)).length).toBe(3);

	await fs_empty_dir(dir);

	expect((await readdir(dir)).length).toBe(0);

	await rm(dir, {recursive: true});
});

test('fs_empty_dir removes nested directories', async () => {
	const dir = await create_temp_dir();
	const nested = join(dir, 'nested');
	await mkdir(nested);
	await writeFile(join(nested, 'file.txt'), 'hello');
	await writeFile(join(dir, 'root.txt'), 'root');

	expect((await readdir(dir)).length).toBe(2);

	await fs_empty_dir(dir);

	expect((await readdir(dir)).length).toBe(0);

	await rm(dir, {recursive: true});
});

test('fs_empty_dir with filter keeps entries where filter returns false', async () => {
	const dir = await create_temp_dir();
	await writeFile(join(dir, 'keep.txt'), 'keep');
	await writeFile(join(dir, 'remove.txt'), 'remove');
	await mkdir(join(dir, '.git'));
	await writeFile(join(dir, '.git', 'config'), 'git config');

	// Filter returns true = remove, false = keep
	await fs_empty_dir(dir, (name) => name !== '.git' && name !== 'keep.txt');

	const remaining = await readdir(dir);
	expect(remaining).toContain('keep.txt');
	expect(remaining).toContain('.git');
	expect(remaining).not.toContain('remove.txt');

	await rm(dir, {recursive: true});
});

test('fs_empty_dir filter receives basename not full path', async () => {
	const dir = await create_temp_dir();
	await writeFile(join(dir, 'file.txt'), 'content');

	const received_paths: Array<string> = [];
	await fs_empty_dir(dir, (path) => {
		received_paths.push(path);
		return false; // keep everything
	});

	// Verify filter receives basename, not full path
	expect(received_paths).toEqual(['file.txt']);
	expect(received_paths[0]).not.toContain(dir);

	await rm(dir, {recursive: true});
});

test('fs_empty_dir on empty directory does nothing', async () => {
	const dir = await create_temp_dir();

	await fs_empty_dir(dir);

	expect(await fs_exists(dir)).toBe(true);
	expect((await readdir(dir)).length).toBe(0);

	await rm(dir, {recursive: true});
});

test('fs_empty_dir throws on non-existent directory', async () => {
	await expect(fs_empty_dir('/non/existent/directory')).rejects.toThrow();
});

test('fs_empty_dir preserves the directory itself', async () => {
	const dir = await create_temp_dir();
	await writeFile(join(dir, 'file.txt'), 'content');

	await fs_empty_dir(dir);

	// Directory still exists
	expect(await fs_exists(dir)).toBe(true);
	const stats = await stat(dir);
	expect(stats.isDirectory()).toBe(true);

	await rm(dir, {recursive: true});
});

test('fs_empty_dir removes hidden files', async () => {
	const dir = await create_temp_dir();
	await writeFile(join(dir, '.hidden'), 'hidden');
	await writeFile(join(dir, '.dotfile'), 'dot');
	await writeFile(join(dir, 'visible.txt'), 'visible');

	await fs_empty_dir(dir);

	expect((await readdir(dir)).length).toBe(0);

	await rm(dir, {recursive: true});
});

test('fs_empty_dir handles filenames with spaces and special characters', async () => {
	const dir = await create_temp_dir();
	await writeFile(join(dir, 'file with spaces.txt'), 'spaces');
	await writeFile(join(dir, 'special!@#$.txt'), 'special');
	await writeFile(join(dir, 'über.txt'), 'unicode');

	expect((await readdir(dir)).length).toBe(3);

	await fs_empty_dir(dir);

	expect((await readdir(dir)).length).toBe(0);

	await rm(dir, {recursive: true});
});

test('fs_empty_dir removes deeply nested structures', async () => {
	const dir = await create_temp_dir();
	const deep = join(dir, 'a', 'b', 'c', 'd');
	await mkdir(deep, {recursive: true});
	await writeFile(join(deep, 'deep.txt'), 'deep');
	await writeFile(join(dir, 'a', 'shallow.txt'), 'shallow');

	await fs_empty_dir(dir);

	expect((await readdir(dir)).length).toBe(0);

	await rm(dir, {recursive: true});
});

test('fs_empty_dir with filter returning false for all keeps everything', async () => {
	const dir = await create_temp_dir();
	await writeFile(join(dir, 'a.txt'), 'a');
	await writeFile(join(dir, 'b.txt'), 'b');

	await fs_empty_dir(dir, () => false);

	expect((await readdir(dir)).sort()).toEqual(['a.txt', 'b.txt']);

	await rm(dir, {recursive: true});
});

test('fs_empty_dir with filter returning true for all removes everything', async () => {
	const dir = await create_temp_dir();
	await writeFile(join(dir, 'a.txt'), 'a');
	await writeFile(join(dir, 'b.txt'), 'b');

	await fs_empty_dir(dir, () => true);

	expect((await readdir(dir)).length).toBe(0);

	await rm(dir, {recursive: true});
});

// Symlink tests

test('fs_exists returns true for symlink to existing file', async () => {
	const dir = await create_temp_dir();
	const file = join(dir, 'target.txt');
	const link = join(dir, 'link.txt');
	await writeFile(file, 'target');
	await symlink(file, link);

	expect(await fs_exists(link)).toBe(true);

	await rm(dir, {recursive: true});
});

test('fs_exists returns false for broken symlink', async () => {
	const dir = await create_temp_dir();
	const file = join(dir, 'target.txt');
	const link = join(dir, 'link.txt');
	await writeFile(file, 'target');
	await symlink(file, link);
	await rm(file); // Remove target, leaving broken symlink

	// fs_exists uses access() which follows symlinks and fails on broken ones
	expect(await fs_exists(link)).toBe(false);

	await rm(dir, {recursive: true});
});

test('fs_empty_dir removes symlinks', async () => {
	const dir = await create_temp_dir();
	const file = join(dir, 'target.txt');
	const link = join(dir, 'link.txt');
	await writeFile(file, 'target');
	await symlink(file, link);

	expect((await readdir(dir)).length).toBe(2);

	await fs_empty_dir(dir);

	expect((await readdir(dir)).length).toBe(0);

	await rm(dir, {recursive: true});
});

test('fs_empty_dir removes symlinks to directories without following them', async () => {
	const dir = await create_temp_dir();
	const target_dir = join(dir, 'target_dir');
	const link = join(dir, 'link_to_dir');
	await mkdir(target_dir);
	await writeFile(join(target_dir, 'file.txt'), 'content');
	await symlink(target_dir, link);

	await fs_empty_dir(dir);

	// Both the target dir and the symlink should be removed
	expect((await readdir(dir)).length).toBe(0);

	await rm(dir, {recursive: true, force: true});
});
