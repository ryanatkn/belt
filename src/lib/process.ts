import {
	spawn as spawn_child_process,
	type SpawnOptions,
	type ChildProcess,
} from 'node:child_process';
import {gray, green, red} from 'kleur/colors';

import {print_log_label, SystemLogger} from './log.js';
import {print_error, print_key_value} from './print.js';
import type {Result} from './result.js';

const log = new SystemLogger(print_log_label('process'));

export interface SpawnedProcess {
	child: ChildProcess;
	closed: Promise<SpawnResult>;
}

export interface Spawned {
	child: ChildProcess;
	signal: NodeJS.Signals | null;
	code: number | null;
}

// TODO are `code` and `signal` more related than that?
// e.g. should this be a union type where one is always `null`?
export type SpawnResult = Result<Spawned, Spawned>;

/**
 * A convenient promise wrapper around `spawn_process`
 * intended for commands that have an end, not long running-processes like watchers.
 * Any more advanced usage should use `spawn_process` directly for access to the `child` process.
 */
export const spawn = (...args: Parameters<typeof spawn_process>): Promise<SpawnResult> =>
	spawn_process(...args).closed;

export interface SpawnedOut {
	result: SpawnResult;
	stdout: string | null;
	stderr: string | null;
}

/**
 * Similar to `spawn` but buffers and returns `stdout` and `stderr` as strings.
 */
export const spawn_out = async (
	command: string,
	args: readonly string[] = [],
	options?: SpawnOptions,
): Promise<SpawnedOut> => {
	const {child, closed} = spawn_process(command, args, {...options, stdio: 'pipe'});
	let stdout: string | null = null;
	child.stdout!.on('data', (data: Buffer) => {
		stdout = (stdout ?? '') + data.toString();
	});
	let stderr: string | null = null;
	child.stderr!.on('data', (data: Buffer) => {
		stderr = (stderr ?? '') + data.toString();
	});
	const result = await closed;
	return {result, stdout, stderr};
};

/**
 * Wraps the normal Node `childProcess.spawn` with graceful child shutdown behavior.
 * Also returns a convenient `closed` promise.
 * If you only need `closed`, prefer the shorthand function `spawn`.
 */
export const spawn_process = (
	command: string,
	args: readonly string[] = [],
	options?: SpawnOptions,
): SpawnedProcess => {
	let resolve: (v: SpawnResult) => void;
	const closed = new Promise<SpawnResult>((r) => (resolve = r));
	const child = spawn_child_process(command, args, {stdio: 'inherit', ...options});
	const unregister = register_global_spawn(child);
	child.once('close', (code, signal) => {
		unregister();
		resolve(code ? {ok: false, child, code, signal} : {ok: true, child, code, signal});
	});
	return {closed, child};
};

export const printChildProcess = (child: ChildProcess): string =>
	`${gray('pid(')}${child.pid}${gray(')')} ← ${green(child.spawnargs.join(' '))}`;

/**
 * We register spawned processes gloabally so we can gracefully exit child processes.
 * Otherwise, errors can cause zombie processes, sometimes blocking ports even!
 */
export const globalSpawn: Set<ChildProcess> = new Set();

/**
 * Returns a function that unregisters the `child`.
 * @param child
 * @returns
 */
export const register_global_spawn = (child: ChildProcess): (() => void) => {
	if (globalSpawn.has(child)) {
		log.error(red('already registered global spawn:'), printChildProcess(child));
	}
	globalSpawn.add(child);
	return () => {
		if (!globalSpawn.has(child)) {
			log.error(red('spawn not registered:'), printChildProcess(child));
		}
		globalSpawn.delete(child);
	};
};

/**
 * Kills a child process and returns a `SpawnResult`.
 */
export const despawn = (child: ChildProcess): Promise<SpawnResult> => {
	let resolve: (v: SpawnResult) => void;
	const closed = new Promise<SpawnResult>((r) => (resolve = r));
	log.debug('despawning', printChildProcess(child));
	child.once('close', (code, signal) => {
		resolve(code ? {ok: false, child, code, signal} : {ok: true, child, code, signal});
	});
	child.kill();
	return closed;
};

export const attach_process_error_handlers = (to_error_label?: ToErrorLabel): void => {
	process
		.on('uncaughtException', handle_fatal_error)
		.on('unhandledRejection', handle_unhandled_rejection(to_error_label));
};

const handle_fatal_error = async (err: Error, label = 'handle_fatal_error'): Promise<void> => {
	new SystemLogger(print_log_label(label, red)).error(print_error(err));
	await Promise.all(Array.from(globalSpawn).map((child) => despawn(child)));
	process.exit(1);
};

const handle_unhandled_rejection =
	(to_error_label?: ToErrorLabel) =>
	(err: any): Promise<void> => {
		const label = to_error_label?.(err) || 'unhandledRejection';
		return err instanceof Error
			? handle_fatal_error(err, label)
			: handle_fatal_error(new Error(err), label);
	};

interface ToErrorLabel {
	(err: any): string | null;
}

export const print_spawn_result = (result: SpawnResult): string => {
	if (result.ok) return 'ok';
	let text = result.code === null ? '' : print_key_value('code', result.code);
	if (result.signal !== null) text += (text ? ' ' : '') + print_key_value('signal', result.signal);
	return text;
};

// TODO might want to expand this API for some use cases - assumes always running
export interface RestartableProcess {
	restart: () => void;
	kill: () => Promise<void>;
}

/**
 * Like `spawn_process` but with `restart` and `kill`,
 * handling many concurrent `restart` calls gracefully.
 */
export const spawnRestartableProcess = (
	command: string,
	args: readonly string[] = [],
	options?: SpawnOptions,
): RestartableProcess => {
	let spawned: SpawnedProcess | null = null;
	let restarting: Promise<any> | null = null;
	const close = async (): Promise<void> => {
		if (!spawned) return;
		restarting = spawned.closed;
		spawned.child.kill();
		spawned = null;
		await restarting;
		restarting = null;
	};
	const restart = async (): Promise<void> => {
		if (restarting) return restarting;
		if (spawned) await close();
		spawned = spawn_process(command, args, {stdio: 'inherit', ...options});
	};
	const kill = async (): Promise<void> => {
		if (restarting) await restarting;
		await close();
	};
	// Start immediately -- it sychronously starts the process so there's no need to await.
	void restart();
	return {restart, kill};
};
