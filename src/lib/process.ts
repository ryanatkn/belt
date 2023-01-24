import {spawn as spawnChildProcess} from 'child_process';
import type {SpawnOptions, ChildProcess} from 'child_process';
import {gray, green, red} from 'kleur/colors';

import {printLogLabel, SystemLogger} from '$lib/log.js';
import {printError, printKeyValue} from '$lib/print.js';
import type {Result} from '$lib/result.js';

const log = new SystemLogger(printLogLabel('process'));

export interface SpawnedProcess {
	child: ChildProcess;
	closed: Promise<SpawnResult>;
}

/**
 * This is just a convenient promise wrapper around `spawnProcess`
 * that's intended for commands that have an end, not long running-processes like watchers.
 * Any more advanced usage should use `spawnProcess` directly for access to the `child` process.
 * @param args
 * @returns
 */
export const spawn = (...args: Parameters<typeof spawnProcess>): Promise<SpawnResult> =>
	spawnProcess(...args).closed;

/**
 * Wraps the normal Node `childProcess.spawn` with graceful child shutdown behavior.
 * Also returns a convenient `closed` promise.
 * If you only need `closed`, prefer the shorthand function `spawnProcess`.
 * @param command
 * @param args
 * @param options
 * @returns
 */
export const spawnProcess = (
	command: string,
	args: readonly string[] = [],
	options?: SpawnOptions,
): SpawnedProcess => {
	let resolve: (v: SpawnResult) => void;
	const closed = new Promise<SpawnResult>((r) => (resolve = r));
	const child = spawnChildProcess(command, args, {stdio: 'inherit', ...options});
	const unregister = registerGlobalSpawn(child);
	child.once('close', (code, signal) => {
		unregister();
		resolve(code ? {ok: false, code, signal} : {ok: true, signal});
	});
	return {closed, child};
};

// TODO are `code` and `signal` more related than that?
// e.g. should this be a union type where one is always `null`?
export type SpawnResult = Result<
	{signal: NodeJS.Signals | null},
	{signal: NodeJS.Signals | null; code: number | null}
>;

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
export const registerGlobalSpawn = (child: ChildProcess): (() => void) => {
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
 * @param child
 * @returns
 */
export const despawn = (child: ChildProcess): Promise<SpawnResult> => {
	let resolve: (v: SpawnResult) => void;
	const closed = new Promise<SpawnResult>((r) => (resolve = r));
	log.trace('despawning', printChildProcess(child));
	child.once('close', (code, signal) => {
		resolve(code ? {ok: false, code, signal} : {ok: true, signal});
	});
	child.kill();
	return closed;
};

export const attachProcessErrorHandlers = (toErrorLabel?: ToErrorLabel): void => {
	process
		.on('uncaughtException', handleFatalError)
		.on('unhandledRejection', handleUnhandledRejection(toErrorLabel));
};

const handleFatalError = async (err: Error, label = 'handleFatalError'): Promise<void> => {
	new SystemLogger(printLogLabel(label, red)).error(printError(err));
	await Promise.all(Array.from(globalSpawn).map((child) => despawn(child)));
	process.exit(1);
};

const handleUnhandledRejection =
	(toErrorLabel?: ToErrorLabel) =>
	(err: any): Promise<void> => {
		const label = toErrorLabel?.(err) || 'unhandledRejection';
		return err instanceof Error
			? handleFatalError(err, label)
			: handleFatalError(new Error(err), label);
	};

interface ToErrorLabel {
	(err: any): string | null;
}

export const printSpawnResult = (result: SpawnResult): string => {
	if (result.ok) return 'ok';
	let text = result.code === null ? '' : printKeyValue('code', result.code);
	if (result.signal !== null) text += (text ? ' ' : '') + printKeyValue('signal', result.signal);
	return text;
};

// TODO might want to expand this API for some use cases - assumes always running
export interface RestartableProcess {
	restart: () => void;
	kill: () => Promise<void>;
}

/**
 * Like `spawnProcess` but with `restart` and `kill`,
 * handling many concurrent `restart` calls gracefully.
 * @param command
 * @param args
 * @param options
 * @returns
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
		spawned = spawnProcess(command, args, {stdio: 'inherit', ...options});
	};
	const kill = async (): Promise<void> => {
		if (restarting) await restarting;
		await close();
	};
	// Start immediately -- it sychronously starts the process so there's no need to await.
	void restart();
	return {restart, kill};
};
