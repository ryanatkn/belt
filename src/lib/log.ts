import {red, yellow, gray, black, magenta, bgYellow, bgRed} from 'kleur/colors';

import {EMPTY_ARRAY, to_array} from './array.js';

// TODO could use some refactoring

export type LogLevel = 'off' | 'error' | 'warn' | 'info' | 'debug';

const LOG_LEVEL_VALUES: Record<LogLevel, number> = {
	off: 0,
	error: 1,
	warn: 2,
	info: 3,
	debug: 4,
};

export const to_log_level_value = (level: LogLevel): number => LOG_LEVEL_VALUES[level] ?? 4;

const should_log = (max: LogLevel, level: LogLevel): boolean =>
	to_log_level_value(max) >= to_log_level_value(level);

/**
 * Sets the log level for both the main and system loggers.
 * @param level The desired log level.
 * @param configure_main_logger Set the `Logger` log level? Defaults to true.
 * @param configure_system_logger Set the `SystemLogger` log level? Defaults to true.
 */
export const configure_log_level = (
	level: LogLevel,
	configure_main_logger = true,
	configure_system_logger = true,
): void => {
	if (configure_main_logger) {
		Logger.level = level;
	}
	if (configure_system_logger) {
		SystemLogger.level = level;
	}
};

const DEFAULT_LOG_LEVEL: LogLevel =
	(typeof process !== 'undefined' && (process.env?.PUBLIC_LOG_LEVEL as LogLevel | undefined)) ||
	'info';

/*

`Logger` uses a special pattern
to achieve a good mix of convenience and flexibility
both for Felt and user code.
It uses late binding to allow runtime mutations
and it accepts a `LoggerState` argument for custom behavior.
Though the code is more verbose and slower as a result,
the tradeoffs make sense for logging in development.
TODO use a different logger in production

The default `LoggerState` is the `Logger` class itself.
This pattern allows us to have globally mutable logger state
without locking the code into the singleton pattern.
Properties like the static `Logger.level` can be mutated
to affect all loggers that get instantiated with the default state,
but loggers can also be instantiated with other state
that isn't affected by these globally mutable values.

Custom loggers like `SystemLogger` (see below)
demonstrate extending `Logger` to partition logging concerns.
User code is given a lot of control and flexibility.

This design opens the potential for hard-to-track bugs -
globally mutable properties bad!! -
but it also provides flexibility that feels appropriate for logging.
This probably isn't a good pattern to use in, for example,
the data management layer.

Logging in and around tests is a motivating use case for this design.
See the usage of `TestLogger` in the test framework code for more.
Scratch that: that code is gone now after we replaced Felt's `oki` with `uvu`.
How should we integrate the test logger with `uvu`? 
TODO !

*/

export type Log = (...args: any[]) => void;

export interface LoggerState extends LogLevelDefaults {
	level: LogLevel;
	log: Log;
	error: LogLevelDefaults;
	warn: LogLevelDefaults;
	info: LogLevelDefaults;
	debug: LogLevelDefaults;
}

interface LogLevelDefaults {
	prefixes: unknown[];
	suffixes: unknown[];
}

export class BaseLogger {
	prefixes: readonly unknown[];
	suffixes: readonly unknown[];
	state: LoggerState; // can be the implementing class constructor

	constructor(prefixes: unknown, suffixes: unknown, state: LoggerState) {
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

export class Logger extends BaseLogger {
	constructor(
		prefixes: unknown = EMPTY_ARRAY,
		suffixes: unknown = EMPTY_ARRAY,
		state: LoggerState = Logger,
	) {
		super(prefixes, suffixes, state);
	}

	// These properties can be mutated at runtime
	// to affect all loggers instantiated with the default `state`.
	// See the comment on `LoggerState` for more.
	static level: LogLevel = DEFAULT_LOG_LEVEL; // to set alongside the `SystemLogger` value, see `configure_log_level`
	static log: Log = console.log.bind(console);
	static prefixes: unknown[] = [];
	static suffixes: unknown[] = [];
	static error: LogLevelDefaults = {
		prefixes: [red('➤'), black(bgRed(' 🞩 error 🞩 ')), red('\n➤')],
		suffixes: ['\n ', black(bgRed(' 🞩🞩 '))],
	};
	static warn: LogLevelDefaults = {
		prefixes: [yellow('➤'), black(bgYellow(' ⚑ warning ⚑ ')), '\n' + yellow('➤')],
		suffixes: ['\n ', black(bgYellow(' ⚑ '))],
	};
	static info: LogLevelDefaults = {
		prefixes: [gray('➤')],
		suffixes: [],
	};
	static debug: LogLevelDefaults = {
		prefixes: [gray('—')],
		suffixes: [],
	};
}

/*

The `SystemLogger` is distinct from the `Logger`
to cleanly separate Felt's logging from user logging, decoupling their log levels.
Felt internally uses `SystemLogger`, not `Logger` directly.
This allows user code to simply import and use `Logger`.
`SystemLogger` is still made available to user code,
and users can always extend `Logger` with their own custom versions.

*/
export class SystemLogger extends BaseLogger {
	constructor(
		prefixes: unknown = EMPTY_ARRAY,
		suffixes: unknown = EMPTY_ARRAY,
		state: LoggerState = SystemLogger,
	) {
		super(prefixes, suffixes, state);
	}

	// These properties can be mutated at runtime
	// to affect all loggers instantiated with the default `state`.
	// See the comment on `LoggerState` for more.
	static level: LogLevel = DEFAULT_LOG_LEVEL; // to set alongside the `Logger` value, see `configure_log_level`
	static log: Log = console.log.bind(console);
	// These can be reassigned to avoid sharing with the `Logger` instance.
	static prefixes = Logger.prefixes;
	static suffixes = Logger.suffixes;
	static error = Logger.error;
	static warn = Logger.warn;
	static info = Logger.info;
	static debug = Logger.debug;
}

export const print_log_label = (label: string, color = magenta): string =>
	`${gray('[')}${color(label)}${gray(']')}`;
