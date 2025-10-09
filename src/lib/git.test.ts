import {describe, test, assert} from 'vitest';

import {
	git_check_clean_workspace,
	git_check_fully_staged_workspace,
	git_check_workspace,
	git_current_branch_first_commit_hash,
	git_current_branch_name,
	git_current_commit_hash,
	git_workspace_status_message,
	git_workspace_is_clean,
	git_workspace_is_fully_staged,
	type Git_Workspace_Status,
} from '$lib/git.js';

describe('git_check_workspace', () => {
	test('returns a status object with boolean flags', async () => {
		const status = await git_check_workspace();
		assert.ok(typeof status === 'object');
		assert.ok(typeof status.unstaged_changes === 'boolean');
		assert.ok(typeof status.staged_changes === 'boolean');
		assert.ok(typeof status.untracked_files === 'boolean');
	});
});

describe('git_workspace_is_clean', () => {
	test('returns true when all flags are false', () => {
		const clean_status: Git_Workspace_Status = {
			unstaged_changes: false,
			staged_changes: false,
			untracked_files: false,
		};
		assert.strictEqual(git_workspace_is_clean(clean_status), true);
	});

	test('returns false when any flag is true', () => {
		assert.strictEqual(
			git_workspace_is_clean({unstaged_changes: true, staged_changes: false, untracked_files: false}),
			false,
		);
		assert.strictEqual(
			git_workspace_is_clean({unstaged_changes: false, staged_changes: true, untracked_files: false}),
			false,
		);
		assert.strictEqual(
			git_workspace_is_clean({unstaged_changes: false, staged_changes: false, untracked_files: true}),
			false,
		);
	});
});

describe('git_workspace_is_fully_staged', () => {
	test('returns true when only staged changes exist', () => {
		const staged_status: Git_Workspace_Status = {
			unstaged_changes: false,
			staged_changes: true,
			untracked_files: false,
		};
		assert.strictEqual(git_workspace_is_fully_staged(staged_status), true);
	});

	test('returns false when unstaged changes or untracked files exist', () => {
		assert.strictEqual(
			git_workspace_is_fully_staged({unstaged_changes: true, staged_changes: false, untracked_files: false}),
			false,
		);
		assert.strictEqual(
			git_workspace_is_fully_staged({unstaged_changes: false, staged_changes: false, untracked_files: true}),
			false,
		);
	});
});

describe('git_workspace_status_message', () => {
	test('returns clean message when workspace is clean', () => {
		const clean_status: Git_Workspace_Status = {
			unstaged_changes: false,
			staged_changes: false,
			untracked_files: false,
		};
		assert.strictEqual(git_workspace_status_message(clean_status), 'workspace is clean');
	});

	test('lists all issues when multiple flags are true', () => {
		const dirty_status: Git_Workspace_Status = {
			unstaged_changes: true,
			staged_changes: true,
			untracked_files: true,
		};
		const message = git_workspace_status_message(dirty_status);
		assert.ok(message.includes('unstaged changes'));
		assert.ok(message.includes('staged but uncommitted changes'));
		assert.ok(message.includes('untracked files'));
	});
});

describe('git_current_branch_name', () => {
	test('returns the current branch name', async () => {
		const branch_name = await git_current_branch_name();
		assert.ok(branch_name);
		assert.strictEqual(typeof branch_name, 'string');
	});
});

describe('git_check_clean_workspace', () => {
	test('checks workspace status', async () => {
		const result = await git_check_clean_workspace();
		assert.ok(result === null || typeof result === 'string');
	});
});

describe('git_check_fully_staged_workspace', () => {
	test('checks if workspace is fully staged', async () => {
		const result = await git_check_fully_staged_workspace();
		assert.ok(result === null || typeof result === 'string');
	});
});

describe('git_current_commit_hash', () => {
	test('returns current commit hash', async () => {
		const hash = await git_current_commit_hash();
		assert.ok(hash === null || typeof hash === 'string');
	});
});

describe('git_current_branch_first_commit_hash', () => {
	test('returns first commit hash of current branch', async () => {
		const first_commit_hash = await git_current_branch_first_commit_hash();
		assert.ok(first_commit_hash);
		assert.strictEqual(typeof first_commit_hash, 'string');
	});
});
