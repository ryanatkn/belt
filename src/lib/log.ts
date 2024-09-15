import type {styleText} from 'node:util';

import {EMPTY_ARRAY, to_array} from '$lib/array.js';

// TODO BLOCK use console.warn/error/info/debug, currently uses `console.log` for everything
// TODO support cases like production output to a file

export type Log_Level = 'off' | 'error' | 'warn' | 'info' | 'debug';

const LOG_LEVEL_VALUES: Record<Log_Level, number> = {
	off: 0,
	error: 1,
	warn: 2,
	info: 3,
	debug: 4,
};

export const to_log_level_value = (level: Log_Level): number => LOG_LEVEL_VALUES[level] ?? 4; // eslint-disable-line @typescript-eslint/no-unnecessary-condition

const should_log = (max: Log_Level, level: Log_Level): boolean =>
	to_log_level_value(max) >= to_log_level_value(level);

/**
 * Sets the log level for both the main and system loggers.
 * @param level The desired log level.
 * @param configure_main_logger Set the `Logger` log level? Defaults to true.
 * @param configure_system_logger Set the `System_Logger` log level? Defaults to true.
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
		: (process.env.PUBLIC_LOG_LEVEL as Log_Level | undefined)) ?? 'info';

/**
 * Sets the colors helper for both the main and system loggers.
 * By default logging uses no colors.
 * @param st A `node:util` `styleText`-compatible function.
 * @param configure_main_logger Set the `Logger` log level? Defaults to true.
 * @param configure_system_logger Set the `System_Logger` log level? Defaults to true.
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
 * The API is unfinished for production loggers
 * but it should be possible to monkey-patch it for the desired beaviors.
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
export interface Logger_State extends Log_Level_Defaults {
	level: Log_Level;
	log: Log;
	error: Log_Level_Defaults;
	warn: Log_Level_Defaults;
	info: Log_Level_Defaults;
	debug: Log_Level_Defaults;
}

interface Log_Level_Defaults {
	prefixes: unknown[];
	suffixes: unknown[];
}

export class Base_Logger {
	prefixes: readonly unknown[];
	suffixes: readonly unknown[];
	state: Logger_State; // can be the implementing class constructor

	constructor(prefixes: unknown, suffixes: unknown, state: Logger_State) {
		this.prefixes = to_array(prefixes);
		this.suffixes = to_array(suffixes);
		this.state = state;
	}

	error(...args: unknown[]): void {
		if (!should_log(this.state.level, 'error')) return;
		this.state.log(
			...resolve_values(
				this.state.prefixes,
				this.state.error.prefixes,
				this.prefixes,
				args,
				this.suffixes,
				this.state.error.suffixes,
				this.state.suffixes,
			),
		);
	}

	warn(...args: unknown[]): void {
		if (!should_log(this.state.level, 'warn')) return;
		this.state.log(
			...resolve_values(
				this.state.prefixes,
				this.state.warn.prefixes,
				this.prefixes,
				args,
				this.suffixes,
				this.state.warn.suffixes,
				this.state.suffixes,
			),
		);
	}

	info(...args: unknown[]): void {
		if (!should_log(this.state.level, 'info')) return;
		this.state.log(
			...resolve_values(
				this.state.prefixes,
				this.state.info.prefixes,
				this.prefixes,
				args,
				this.suffixes,
				this.state.info.suffixes,
				this.state.suffixes,
			),
		);
	}

	debug(...args: unknown[]): void {
		if (!should_log(this.state.level, 'debug')) return;
		this.state.log(
			...resolve_values(
				this.state.prefixes,
				this.state.debug.prefixes,
				this.prefixes,
				args,
				this.suffixes,
				this.state.debug.suffixes,
				this.state.suffixes,
			),
		);
	}

	plain(...args: unknown[]): void {
		this.state.log(...resolve_values(args));
	}

	newline(count = 1): void {
		this.state.log('\n'.repeat(count));
	}
}

const resolve_values = (...arrays: any[]): any[] => {
	const resolved: any[] = [];
	for (const array of arrays) {
		for (const value of array) {
			resolved.push(typeof value === 'function' ? value() : value);
		}
	}
	return resolved;
};

export class Logger extends Base_Logger {
	constructor(
		prefixes: unknown = EMPTY_ARRAY,
		suffixes: unknown = EMPTY_ARRAY,
		state: Logger_State = Logger,
	) {
		super(prefixes, suffixes, state);
	}

	// These properties can be mutated at runtime
	// to affect all loggers instantiated with the default `state`.
	// See the comment on `Logger_State` for more.
	static level: Log_Level = DEFAULT_LOG_LEVEL; // to set alongside the `System_Logger` value, see `configure_log_level`
	static st: typeof styleText = (_, s) => s; // to set alongside the `System_Logger` value, see `configure_log_colors`
	static log: Log = console.log.bind(console); // eslint-disable-line no-console
	static prefixes: unknown[] = [];
	static suffixes: unknown[] = [];
	static error: Log_Level_Defaults = {
		prefixes: [st('red', '➤'), st(['black', 'bgRed'], ' 🞩 error 🞩 '), st('red', '\n➤')],
		suffixes: ['\n ', st(['black', 'bgRed'], ' 🞩🞩 ')],
	};
	static warn: Log_Level_Defaults = {
		prefixes: [
			st('yellow', '➤'),
			st(['black', 'bgYellow'], ' ⚑ warning ⚑ '),
			'\n' + st('yellow', '➤'),
		],
		suffixes: ['\n ', st(['black', 'bgYellow'], ' ⚑ ')],
	};
	static info: Log_Level_Defaults = {
		prefixes: [st('gray', '➤')],
		suffixes: [],
	};
	static debug: Log_Level_Defaults = {
		prefixes: [st('gray', '—')],
		suffixes: [],
	};
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
	constructor(
		prefixes: unknown = EMPTY_ARRAY,
		suffixes: unknown = EMPTY_ARRAY,
		state: Logger_State = System_Logger,
	) {
		super(prefixes, suffixes, state);
	}

	// These properties can be mutated at runtime
	// to affect all loggers instantiated with the default `state`.
	// See the comment on `Logger_State` for more.
	static level: Log_Level = Logger.level; // to set alongside the `Logger` value, see `configure_log_level`
	static st: typeof styleText = Logger.st; // to set alongside the `Logger` value, see `configure_log_colors`
	static log: Log = Logger.log;
	// These can be reassigned to avoid sharing with the `Logger` instance.
	static prefixes = Logger.prefixes;
	static suffixes = Logger.suffixes;
	static error = Logger.error;
	static warn = Logger.warn;
	static info = Logger.info;
	static debug = Logger.debug;
}
