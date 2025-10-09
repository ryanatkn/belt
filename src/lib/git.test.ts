import {describe, test, assert} from 'vitest';

import {
	git_check_clean_workspace,
	git_check_fully_staged_workspace,
	git_check_workspace,
	git_current_branch_first_commit_hash,
	git_current_branch_name,
	git_current_commit_hash,
	git_parse_workspace_status,
	git_workspace_status_message,
	git_workspace_is_clean,
	git_workspace_is_fully_staged,
	type Git_Workspace_Status,
} from '$lib/git.js';

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
			git_workspace_is_clean({
				unstaged_changes: true,
				staged_changes: false,
				untracked_files: false,
			}),
			false,
		);
		assert.strictEqual(
			git_workspace_is_clean({
				unstaged_changes: false,
				staged_changes: true,
				untracked_files: false,
			}),
			false,
		);
		assert.strictEqual(
			git_workspace_is_clean({
				unstaged_changes: false,
				staged_changes: false,
				untracked_files: true,
			}),
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

	test('returns true when workspace is clean', () => {
		const clean_status: Git_Workspace_Status = {
			unstaged_changes: false,
			staged_changes: false,
			untracked_files: false,
		};
		assert.strictEqual(git_workspace_is_fully_staged(clean_status), true);
	});

	test('returns false when unstaged changes exist', () => {
		assert.strictEqual(
			git_workspace_is_fully_staged({
				unstaged_changes: true,
				staged_changes: false,
				untracked_files: false,
			}),
			false,
		);
	});

	test('returns false when untracked files exist', () => {
		assert.strictEqual(
			git_workspace_is_fully_staged({
				unstaged_changes: false,
				staged_changes: false,
				untracked_files: true,
			}),
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

	test('message for unstaged changes only', () => {
		const message = git_workspace_status_message({
			unstaged_changes: true,
			staged_changes: false,
			untracked_files: false,
		});
		assert.strictEqual(message, 'git has unstaged changes');
	});

	test('message for staged changes only', () => {
		const message = git_workspace_status_message({
			unstaged_changes: false,
			staged_changes: true,
			untracked_files: false,
		});
		assert.strictEqual(message, 'git has staged but uncommitted changes');
	});

	test('message for untracked files only', () => {
		const message = git_workspace_status_message({
			unstaged_changes: false,
			staged_changes: false,
			untracked_files: true,
		});
		assert.strictEqual(message, 'git has untracked files');
	});
});

// Integration tests - these actually call git
describe('git_check_workspace', () => {
	test('returns a status object with boolean flags', async () => {
		const status = await git_check_workspace();
		assert.ok(typeof status === 'object');
		assert.ok(typeof status.unstaged_changes === 'boolean');
		assert.ok(typeof status.staged_changes === 'boolean');
		assert.ok(typeof status.untracked_files === 'boolean');
	});
});

describe('git_parse_workspace_status', () => {
	test('empty output returns clean status', () => {
		const status = git_parse_workspace_status('');
		assert.deepEqual(status, {
			unstaged_changes: false,
			staged_changes: false,
			untracked_files: false,
		});
	});

	test('null output returns clean status', () => {
		const status = git_parse_workspace_status(null);
		assert.deepEqual(status, {
			unstaged_changes: false,
			staged_changes: false,
			untracked_files: false,
		});
	});

	test('unstaged changes only ( M)', () => {
		const status = git_parse_workspace_status(' M src/lib/git.ts');
		assert.deepEqual(status, {
			unstaged_changes: true,
			staged_changes: false,
			untracked_files: false,
		});
	});

	test('staged changes only (M )', () => {
		const status = git_parse_workspace_status('M  src/lib/path.test.ts');
		assert.deepEqual(status, {
			unstaged_changes: false,
			staged_changes: true,
			untracked_files: false,
		});
	});

	test('both staged and unstaged (MM)', () => {
		const status = git_parse_workspace_status('MM src/lib/git.ts');
		assert.deepEqual(status, {
			unstaged_changes: true,
			staged_changes: true,
			untracked_files: false,
		});
	});

	test('untracked files (??)', () => {
		const status = git_parse_workspace_status('?? foo');
		assert.deepEqual(status, {
			unstaged_changes: false,
			staged_changes: false,
			untracked_files: true,
		});
	});

	test('ignored files (!!) are treated as no change', () => {
		const status = git_parse_workspace_status('!! ignored.tmp');
		assert.deepEqual(status, {
			unstaged_changes: false,
			staged_changes: false,
			untracked_files: false,
		});
	});

	test('multiple files with mixed states', () => {
		const porcelain = `MM src/lib/git.ts
M  src/lib/path.test.ts
?? foo`;
		const status = git_parse_workspace_status(porcelain);
		assert.deepEqual(status, {
			unstaged_changes: true,
			staged_changes: true,
			untracked_files: true,
		});
	});

	test('added file (A )', () => {
		const status = git_parse_workspace_status('A  new-file.ts');
		assert.deepEqual(status, {
			unstaged_changes: false,
			staged_changes: true,
			untracked_files: false,
		});
	});

	test('deleted from index (D )', () => {
		const status = git_parse_workspace_status('D  removed.ts');
		assert.deepEqual(status, {
			unstaged_changes: false,
			staged_changes: true,
			untracked_files: false,
		});
	});

	test('deleted in working tree ( D)', () => {
		const status = git_parse_workspace_status(' D deleted-file.ts');
		assert.deepEqual(status, {
			unstaged_changes: true,
			staged_changes: false,
			untracked_files: false,
		});
	});

	test('renamed in index (R )', () => {
		const status = git_parse_workspace_status('R  old.ts -> new.ts');
		assert.deepEqual(status, {
			unstaged_changes: false,
			staged_changes: true,
			untracked_files: false,
		});
	});

	test('type changed in index (T )', () => {
		const status = git_parse_workspace_status('T  symlink.txt');
		assert.deepEqual(status, {
			unstaged_changes: false,
			staged_changes: true,
			untracked_files: false,
		});
	});

	test('type changed in working tree ( T)', () => {
		const status = git_parse_workspace_status(' T file.txt');
		assert.deepEqual(status, {
			unstaged_changes: true,
			staged_changes: false,
			untracked_files: false,
		});
	});

	test('copied in index (C )', () => {
		const status = git_parse_workspace_status('C  original.ts -> copy.ts');
		assert.deepEqual(status, {
			unstaged_changes: false,
			staged_changes: true,
			untracked_files: false,
		});
	});

	test('unmerged (UU)', () => {
		const status = git_parse_workspace_status('UU conflicted.ts');
		assert.deepEqual(status, {
			unstaged_changes: true,
			staged_changes: true,
			untracked_files: false,
		});
	});

	test('handles trailing newlines', () => {
		const status = git_parse_workspace_status(' M src/lib/git.ts\n');
		assert.deepEqual(status, {
			unstaged_changes: true,
			staged_changes: false,
			untracked_files: false,
		});
	});

	test('handles multiple trailing newlines', () => {
		const status = git_parse_workspace_status(' M src/lib/git.ts\n\n\n');
		assert.deepEqual(status, {
			unstaged_changes: true,
			staged_changes: false,
			untracked_files: false,
		});
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
