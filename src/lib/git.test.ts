import {describe, test, assert} from 'vitest';

import {
	git_check_clean_workspace,
	git_check_fully_staged_workspace,
	git_current_branch_first_commit_hash,
	git_current_branch_name,
	git_current_commit_hash,
} from '$lib/git.js';

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
