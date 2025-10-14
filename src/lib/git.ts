import type {SpawnOptions} from 'node:child_process';
import {z} from 'zod';
import {existsSync} from 'node:fs';

import {spawn, spawn_out} from '$lib/process.ts';
import type {Flavored} from '$lib/types.ts';
import {to_file_path} from '$lib/path.ts';

export const Git_Origin = z.string();
export type Git_Origin = Flavored<string, 'Git_Origin'>;

export const Git_Branch = z.string();
export type Git_Branch = Flavored<string, 'Git_Branch'>;

/**
 * Returns the current git branch name or throws if something goes wrong.
 */
export const git_current_branch_name = async (options?: SpawnOptions): Promise<Git_Branch> => {
	const {stdout} = await spawn_out('git', ['rev-parse', '--abbrev-ref', 'HEAD'], options);
	if (!stdout) throw Error('git_current_branch_name failed');
	const branch_name = stdout.trim() as Git_Branch;
	return branch_name;
};

/**
 * @returns a boolean indicating if the remote git branch exists
 */
export const git_remote_branch_exists = async (
	origin: Git_Origin = 'origin' as Git_Origin,
	branch?: Git_Branch,
	options?: SpawnOptions,
): Promise<boolean> => {
	const final_branch = branch ?? (await git_current_branch_name(options));
	if (options?.cwd && !existsSync(to_file_path(options.cwd))) {
		return false;
	}
	const result = await spawn(
		'git',
		['ls-remote', '--exit-code', '--heads', origin, 'refs/heads/' + final_branch],
		options,
	);
	if (result.ok) {
		return true;
	} else if (result.code === 2) {
		return false;
	} else {
		throw Error(
			`git_remote_branch_exists failed for origin '${origin}' and branch '${final_branch}' with code ${result.code}`,
		);
	}
};

/**
 * @returns a boolean indicating if the local git branch exists
 */
export const git_local_branch_exists = async (
	branch: Git_Branch,
	options?: SpawnOptions,
): Promise<boolean> => {
	if (options?.cwd && !existsSync(to_file_path(options.cwd))) {
		return false;
	}
	const result = await spawn('git', ['show-ref', '--quiet', 'refs/heads/' + branch], options);
	return result.ok;
};

/**
 * Git workspace status flags indicating which types of changes are present.
 */
export interface Git_Workspace_Status {
	unstaged_changes: boolean;
	staged_changes: boolean;
	untracked_files: boolean;
}

/**
 * Parses the output of `git status --porcelain -z` (v1 format) into a status object.
 * This is a pure function that can be tested independently.
 *
 * Format: XY path\0 where:
 * - X = staged status (index)
 * - Y = unstaged status (work tree)
 * - path = file path (unescaped with -z)
 *
 * Supported status codes:
 * - M = modified
 * - A = added
 * - D = deleted
 * - R = renamed
 * - C = copied
 * - T = type changed (regular file, symbolic link or submodule)
 * - U = unmerged
 * - ? = untracked
 * - ! = ignored
 *
 * For renames/copies: XY new\0old\0 (two NUL-separated paths)
 *
 * Note: This implementation treats submodules the same as regular files.
 * Submodule-specific status codes (lowercase m, ?) are interpreted as changes.
 *
 * @param stdout - The raw output from `git status --porcelain -z`
 * @returns status object with flags for unstaged changes, staged changes, and untracked files
 */
export const git_parse_workspace_status = (stdout: string | null): Git_Workspace_Status => {
	// Split on NUL character (\0) for -z format
	// Filter out empty strings (last element after final \0)
	const entries = stdout?.split('\0').filter(Boolean) ?? [];

	// For rename/copy operations, we need to skip the old filename entry
	// Format: R  new\0old\0 or C  new\0old\0
	let skipNext = false;
	const lines: Array<string> = [];

	for (const entry of entries) {
		if (skipNext) {
			skipNext = false;
			continue;
		}

		// Check if this is a rename/copy operation in either position
		// R  = renamed in index, RM = renamed in index + modified in work tree
		//  R = renamed in work tree (rare but possible with certain configs)
		if (
			entry.length >= 3 &&
			(entry[0] === 'R' || entry[0] === 'C' || entry[1] === 'R' || entry[1] === 'C')
		) {
			skipNext = true;
		}

		lines.push(entry);
	}

	return {
		// Y position (index 1) - any non-space, non-?, non-! means unstaged changes
		// Minimum length is 3: XY followed by at least one space (e.g., "M  ")
		unstaged_changes: lines.some(
			(line) => line.length >= 3 && line[1] !== ' ' && line[1] !== '?' && line[1] !== '!',
		),
		// X position (index 0) - any non-space, non-?, non-! means staged changes
		// Minimum length is 3: XY followed by at least one space (e.g., "M  ")
		staged_changes: lines.some(
			(line) => line.length >= 3 && line[0] !== ' ' && line[0] !== '?' && line[0] !== '!',
		),
		// ?? prefix means untracked files
		untracked_files: lines.some((line) => line.startsWith('??')),
	};
};

/**
 * Checks the git workspace status using a single `git status --porcelain -z` call.
 * The -z format provides more reliable parsing by using NUL separators and avoiding escaping.
 * @returns status object with flags for unstaged changes, staged changes, and untracked files
 */
export const git_check_workspace = async (
	options?: SpawnOptions,
): Promise<Git_Workspace_Status> => {
	const {stdout} = await spawn_out('git', ['status', '--porcelain', '-z'], options);
	return git_parse_workspace_status(stdout);
};

/**
 * @returns `true` if the workspace has no changes at all
 */
export const git_workspace_is_clean = (status: Git_Workspace_Status): boolean =>
	!status.unstaged_changes && !status.staged_changes && !status.untracked_files;

/**
 * @returns `true` if the workspace has no unstaged changes and no untracked files (staged changes are OK)
 */
export const git_workspace_is_fully_staged = (status: Git_Workspace_Status): boolean =>
	!status.unstaged_changes && !status.untracked_files;

/**
 * Converts a workspace status to a human-readable message.
 */
export const git_workspace_status_message = (status: Git_Workspace_Status): string => {
	if (git_workspace_is_clean(status)) return 'workspace is clean';
	const issues: Array<string> = [];
	if (status.unstaged_changes) issues.push('unstaged changes');
	if (status.staged_changes) issues.push('staged but uncommitted changes');
	if (status.untracked_files) issues.push('untracked files');
	return `git has ${issues.join(', ')}`;
};

/**
 * @returns an error message if the git workspace has any unstaged or uncommitted changes, or `null` if it's clean
 */
export const git_check_clean_workspace = async (options?: SpawnOptions): Promise<string | null> => {
	const status = await git_check_workspace(options);
	return git_workspace_is_clean(status) ? null : git_workspace_status_message(status);
};

/**
 * @returns an error message if the git workspace has any unstaged changes or untracked files, or `null` if fully staged
 */
export const git_check_fully_staged_workspace = async (
	options?: SpawnOptions,
): Promise<string | null> => {
	const status = await git_check_workspace(options);
	return git_workspace_is_fully_staged(status) ? null : git_workspace_status_message(status);
};

/**
 * Calls `git fetch` and throws if anything goes wrong.
 */
export const git_fetch = async (
	origin: Git_Origin = 'origin' as Git_Origin,
	branch?: Git_Branch,
	options?: SpawnOptions,
): Promise<void> => {
	const args = ['fetch', origin];
	if (branch) args.push(branch);
	const result = await spawn('git', args, options);
	if (!result.ok) {
		throw Error(
			`git_fetch failed for origin '${origin}' and branch '${branch}' with code ${result.code}`,
		);
	}
};

/**
 * Calls `git checkout` and throws if anything goes wrong.
 * @returns the previous branch name, if it changed
 */
export const git_checkout = async (
	branch: Git_Branch,
	options?: SpawnOptions,
): Promise<Git_Branch | null> => {
	const current_branch = await git_current_branch_name(options);
	if (branch === current_branch) {
		return null;
	}
	const result = await spawn('git', ['checkout', branch], options);
	if (!result.ok) {
		throw Error(`git_checkout failed for branch '${branch}' with code ${result.code}`);
	}
	return current_branch;
};

/**
 * Calls `git pull` and throws if anything goes wrong.
 */
export const git_pull = async (
	origin: Git_Origin = 'origin' as Git_Origin,
	branch?: Git_Branch,
	options?: SpawnOptions,
): Promise<void> => {
	const args = ['pull', origin];
	if (branch) args.push(branch);
	const result = await spawn('git', args, options);
	if (!result.ok) {
		throw Error(`git_pull failed for branch '${branch}' with code ${result.code}`);
	}
};

/**
 * Calls `git push` and throws if anything goes wrong.
 */
export const git_push = async (
	origin: Git_Origin,
	branch?: Git_Branch,
	options?: SpawnOptions,
	set_upstream = false,
): Promise<void> => {
	const final_branch = branch ?? (await git_current_branch_name(options));
	const args = ['push', origin, final_branch];
	if (set_upstream) args.push('-u');
	const result = await spawn('git', args, options);
	if (!result.ok) {
		throw Error(`git_push failed for branch '${final_branch}' with code ${result.code}`);
	}
};

/**
 * Calls `git push` and throws if anything goes wrong.
 */
export const git_push_to_create = async (
	origin: Git_Origin = 'origin' as Git_Origin,
	branch?: Git_Branch,
	options?: SpawnOptions,
): Promise<void> => {
	const final_branch = branch ?? (await git_current_branch_name(options));
	const push_args = ['push'];
	if (await git_remote_branch_exists(origin, final_branch, options)) {
		push_args.push(origin);
	} else {
		push_args.push('-u', origin);
	}
	push_args.push(final_branch);
	const result = await spawn('git', push_args, options);
	if (!result.ok) {
		throw Error(`git_push failed for branch '${final_branch}' with code ${result.code}`);
	}
};

/**
 * Deletes a branch locally and throws if anything goes wrong.
 */
export const git_delete_local_branch = async (
	branch: Git_Branch,
	options?: SpawnOptions,
): Promise<void> => {
	const result = await spawn('git', ['branch', '-D', branch], options);
	if (!result.ok) {
		throw Error(`git_delete_local_branch failed for branch '${branch}' with code ${result.code}`);
	}
};

/**
 * Deletes a branch remotely and throws if anything goes wrong.
 */
export const git_delete_remote_branch = async (
	origin: Git_Origin,
	branch: Git_Branch,
	options?: SpawnOptions,
): Promise<void> => {
	const result = await spawn('git', ['push', origin, ':' + branch], options);
	if (!result.ok) {
		throw Error(`git_delete_remote_branch failed for branch '${branch}' with code ${result.code}`);
	}
};

/**
 * Resets the `target` branch back to its first commit both locally and remotely.
 */
export const git_reset_branch_to_first_commit = async (
	origin: Git_Origin,
	branch: Git_Branch,
	options?: SpawnOptions,
): Promise<void> => {
	const previous_branch = await git_checkout(branch, options);
	const first_commit_hash = await git_current_branch_first_commit_hash(options);
	await spawn('git', ['reset', '--hard', first_commit_hash], options);
	await spawn('git', ['push', origin, branch, '--force'], options);
	if (previous_branch) {
		await git_checkout(previous_branch, options);
	}
};

/**
 * Returns the branch's latest commit hash or throws if something goes wrong.
 */
export const git_current_commit_hash = async (
	branch?: string,
	options?: SpawnOptions,
): Promise<string | null> => {
	const final_branch = branch ?? (await git_current_branch_name(options));
	const {stdout} = await spawn_out('git', ['show-ref', '-s', final_branch], options);
	if (!stdout) return null; // TODO hack for CI
	return stdout.split('\n')[0].trim();
};

/**
 * Returns the hash of the current branch's first commit or throws if something goes wrong.
 */
export const git_current_branch_first_commit_hash = async (
	options?: SpawnOptions,
): Promise<string> => {
	const {stdout} = await spawn_out(
		'git',
		['rev-list', '--max-parents=0', '--abbrev-commit', 'HEAD'],
		options,
	);
	if (!stdout) throw Error('git_current_branch_first_commit_hash failed');
	return stdout.trim();
};

/**
 * Returns the global git config setting for `pull.rebase`.
 */
export const git_check_setting_pull_rebase = async (options?: SpawnOptions): Promise<boolean> => {
	const value = await spawn_out('git', ['config', '--global', 'pull.rebase'], options);
	return value.stdout?.trim() === 'true';
};

/**
 * Clones a branch locally to another directory and updates the origin to match the source.
 */
export const git_clone_locally = async (
	origin: Git_Origin,
	branch: Git_Branch,
	source_dir: string,
	target_dir: string,
	options?: SpawnOptions,
): Promise<void> => {
	await spawn('git', ['clone', '-b', branch, '--single-branch', source_dir, target_dir], options);
	const origin_url = (
		await spawn_out('git', ['remote', 'get-url', origin], {...options, cwd: source_dir})
	).stdout?.trim();
	if (!origin_url) throw Error('Failed to get the origin url with git in ' + source_dir);
	await spawn('git', ['remote', 'set-url', origin, origin_url], {...options, cwd: target_dir});
};
