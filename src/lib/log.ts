import type {styleText} from 'node:util';
import {DEV} from 'esm-env';

import {EMPTY_ARRAY, to_array} from '$lib/array.js';

export type Log_Level = 'off' | 'error' | 'warn' | 'info' | 'debug';

const LOG_LEVEL_VALUES = {
	off: 0,
	error: 1,
	warn: 2,
	info: 3,
	debug: 4,
} as const satisfies Record<Log_Level, number>;

export const to_log_level_value = (level: Log_Level): number => LOG_LEVEL_VALUES[level] ?? 4; // eslint-disable-line @typescript-eslint/no-unnecessary-condition

const should_log = (max: Log_Level, level: Log_Level): boolean =>
	to_log_level_value(max) >= to_log_level_value(level);

/**
 * Sets the log level for both the main and system loggers.
 * @param level The desired log level.
 * @param configure_main_logger Set the `Logger` log level? Defaults to `true`.
 * @param configure_system_logger Set the `System_Logger` log level? Defaults to `true`.
 */
export const configure_log_level = (
	level: Log_Level,
	configure_main_logger = true,
	configure_system_logger = true,
): void => {
	if (configure_main_logger) {
		Logger.level = level;
	}
	if (configure_system_logger) {
		System_Logger.level = level;
	}
};

const DEFAULT_LOG_LEVEL: Log_Level =
	(typeof process === 'undefined'
		? null
		: (process.env.PUBLIC_LOG_LEVEL as Log_Level | undefined)) ?? (DEV ? 'debug' : 'off'); // TODO how to opt into `'debug'` and default to `'info'`?

/**
 * Sets the colors helper for both the main and system loggers.
 * By default logging uses no colors.
 * @param st A `node:util` `styleText`-compatible function.
 * @param configure_main_logger Set the `Logger` log level? Defaults to `true`.
 * @param configure_system_logger Set the `System_Logger` log level? Defaults to `true`.
 */
export const configure_log_colors = (
	st: typeof styleText,
	configure_main_logger = true,
	configure_system_logger = true,
): void => {
	if (configure_main_logger) {
		Logger.st = st;
	}
	if (configure_system_logger) {
		System_Logger.st = st;
	}
};

export type Log = (...args: any[]) => void;

/**
 * The `Logger` accepts a `Logger_State` argument for custom behavior,
 * which by default is the `Logger` class itself,
 * where its static properties are the `Logger_State` values.
 * Though the code is more verbose and slower as a result,
 * the tradeoffs make sense for logging in development.
 *
 * Properties like the static `Logger.level` can be mutated
 * to affect all loggers that get instantiated with the default state,
 * but loggers can also be instantiated with other state
 * that isn't affected by these globally mutable values.
 *
 * Custom loggers like `System_Logger` (see below)
 * demonstrate extending `Logger` to partition logging concerns.
 * User code is given a lot of control and flexibility.
 */
export interface Logger_State {
	level: Log_Level;
	st: typeof styleText;
	console: Pick<typeof console, 'error' | 'warn' | 'log'>;
	prefixes: Logger_Prefixes_And_Suffixes_Getter;
	suffixes: Logger_Prefixes_And_Suffixes_Getter;
	error_prefixes: Logger_Prefixes_And_Suffixes_Getter;
	error_suffixes: Logger_Prefixes_And_Suffixes_Getter;
	warn_prefixes: Logger_Prefixes_And_Suffixes_Getter;
	warn_suffixes: Logger_Prefixes_And_Suffixes_Getter;
	info_prefixes: Logger_Prefixes_And_Suffixes_Getter;
	info_suffixes: Logger_Prefixes_And_Suffixes_Getter;
	debug_prefixes: Logger_Prefixes_And_Suffixes_Getter;
	debug_suffixes: Logger_Prefixes_And_Suffixes_Getter;
}

export type Logger_Prefixes_And_Suffixes_Getter = (
	st: typeof styleText,
	args: unknown[],
) => unknown[];

const EMPTY_GETTER: Logger_Prefixes_And_Suffixes_Getter = () => EMPTY_ARRAY;

/**
 * The base class of `Logger` that's available to be extended by users.
 * See `System_Logger` for an example of extending `Logger` with minimal boilerplate.
 */
export class Base_Logger {
	prefixes: Logger_Prefixes_And_Suffixes_Getter;
	suffixes: Logger_Prefixes_And_Suffixes_Getter;
	state: Logger_State; // can be the implementing class constructor

	constructor(prefixes: any, suffixes: any, state: Logger_State) {
		const prefixes_array = to_array(prefixes);
		const suffixes_array = to_array(suffixes);
		this.prefixes =
			prefixes == null
				? EMPTY_GETTER
				: typeof prefixes === 'function'
					? prefixes
					: () => prefixes_array;
		this.suffixes =
			suffixes == null
				? EMPTY_GETTER
				: typeof suffixes === 'function'
					? suffixes
					: () => suffixes_array;
		this.state = state;
	}

	error(...args: unknown[]): void {
		if (!should_log(this.state.level, 'error')) return;
		this.state.console.error(
			...this.#resolve_values(
				args,
				this.state.prefixes,
				this.state.error_prefixes,
				this.prefixes,
			).concat(
				args,
				this.#resolve_values(args, this.suffixes, this.state.error_suffixes, this.state.suffixes),
			),
		);
	}

	warn(...args: unknown[]): void {
		if (!should_log(this.state.level, 'warn')) return;
		this.state.console.warn(
			...this.#resolve_values(
				args,
				this.state.prefixes,
				this.state.warn_prefixes,
				this.prefixes,
			).concat(
				args,
				this.#resolve_values(args, this.suffixes, this.state.warn_suffixes, this.state.suffixes),
			),
		);
	}

	info(...args: unknown[]): void {
		if (!should_log(this.state.level, 'info')) return;
		this.state.console.log(
			...this.#resolve_values(
				args,
				this.state.prefixes,
				this.state.info_prefixes,
				this.prefixes,
			).concat(
				args,
				this.#resolve_values(args, this.suffixes, this.state.info_suffixes, this.state.suffixes),
			),
		);
	}

	debug(...args: unknown[]): void {
		if (!should_log(this.state.level, 'debug')) return;
		this.state.console.log(
			...this.#resolve_values(
				args,
				this.state.prefixes,
				this.state.debug_prefixes,
				this.prefixes,
			).concat(
				args,
				this.#resolve_values(args, this.suffixes, this.state.debug_suffixes, this.state.suffixes),
			),
		);
	}

	// TODO maybe rename to `log` to match the console method?
	plain(...args: unknown[]): void {
		this.state.console.log(...args);
	}

	newline(count = 1): void {
		this.state.console.log('\n'.repeat(count));
	}

	#resolve_values(args: unknown[], ...getters: Logger_Prefixes_And_Suffixes_Getter[]): unknown[] {
		let resolved: unknown[] | undefined;
		const {st} = this.state;
		for (const getter of getters) {
			const values = getter(st, args);
			for (const value of values) {
				(resolved ??= []).push(value);
			}
		}
		return resolved ?? EMPTY_ARRAY;
	}
}

/**
 * The default implementation of `Base_Logger`.
 */
export class Logger extends Base_Logger {
	constructor(prefixes?: any, suffixes?: any, state: Logger_State = Logger) {
		super(prefixes, suffixes, state);
	}

	// These properties can be mutated at runtime
	// to affect all loggers instantiated with the default `state`.
	// See the comment on `Logger_State` for more.
	static level: Log_Level = DEFAULT_LOG_LEVEL; // to set alongside the `System_Logger` value, see `configure_log_level`
	static char_debug = '┆'; // '┇';
	static char_info = '➤';
	static char_warn = '⚑';
	static char_error = '🞩';
	static st: typeof styleText = (_, s) => s; // to set alongside the `System_Logger` value, see `configure_log_colors`
	static console: Logger_State['console'] = console;
	static prefixes: Logger_Prefixes_And_Suffixes_Getter = EMPTY_GETTER;
	static suffixes: Logger_Prefixes_And_Suffixes_Getter = EMPTY_GETTER;
	static error_prefixes: Logger_Prefixes_And_Suffixes_Getter = (st) => [
		st('red', `${Logger.char_error.repeat(3)}error\n`),
	];
	static error_suffixes: Logger_Prefixes_And_Suffixes_Getter = (st) => [
		st('red', `\n${Logger.char_error.repeat(3)}`),
	];
	static warn_prefixes: Logger_Prefixes_And_Suffixes_Getter = (st) => [
		st('red', `${Logger.char_warn.repeat(3)}warn\n`),
	];
	static warn_suffixes: Logger_Prefixes_And_Suffixes_Getter = (st) => [
		st('red', `\n${Logger.char_warn.repeat(3)}`),
	];
	static info_prefixes: Logger_Prefixes_And_Suffixes_Getter = (st) => [
		st('gray', Logger.char_info),
	];
	static info_suffixes: Logger_Prefixes_And_Suffixes_Getter = EMPTY_GETTER;
	static debug_prefixes: Logger_Prefixes_And_Suffixes_Getter = (st) => [
		st('gray', Logger.char_debug),
	];
	static debug_suffixes: Logger_Prefixes_And_Suffixes_Getter = EMPTY_GETTER;
}

/**
 * The `System_Logger` is distinct from the `Logger`
 * to cleanly separate Felt's logging from user logging, decoupling their log levels.
 * Felt internally uses `System_Logger`, not `Logger` directly.
 * This allows user code to simply import and use `Logger`.
 * `System_Logger` is still made available to user code,
 * and users can always extend `Logger` with their own custom versions.
 */
export class System_Logger extends Base_Logger {
	constructor(prefixes?: any, suffixes?: any, state: Logger_State = System_Logger) {
		super(prefixes, suffixes, state);
	}

	// These properties can be mutated at runtime
	// to affect all loggers instantiated with the default `state`.
	// See the comment on `Logger_State` for more.
	static level: Log_Level = Logger.level; // to set alongside the `Logger` value, see `configure_log_level`
	static st: typeof styleText = Logger.st; // to set alongside the `Logger` value, see `configure_log_colors`
	static console: Logger_State['console'] = console;
	// These can be reassigned to avoid sharing with the `Logger` instance.
	static prefixes = Logger.prefixes;
	static suffixes = Logger.suffixes;
	static error_prefixes = Logger.error_prefixes;
	static error_suffixes = Logger.error_suffixes;
	static warn_prefixes = Logger.warn_prefixes;
	static warn_suffixes = Logger.warn_suffixes;
	static info_prefixes = Logger.info_prefixes;
	static info_suffixes = Logger.info_suffixes;
	static debug_prefixes = Logger.debug_prefixes;
	static debug_suffixes = Logger.debug_suffixes;
}
