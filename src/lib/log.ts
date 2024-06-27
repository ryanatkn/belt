import {EMPTY_ARRAY, to_array} from '$lib/array.js';
import {red, yellow, gray, black, magenta, bg_yellow, bg_red} from '$lib/styletext.js';

// TODO could use some refactoring

export type Log_Level = 'off' | 'error' | 'warn' | 'info' | 'debug';

const LOG_LEVEL_VALUES: Record<Log_Level, number> = {
	off: 0,
	error: 1,
	warn: 2,
	info: 3,
	debug: 4,
};

export const to_log_level_value = (level: Log_Level): number => LOG_LEVEL_VALUES[level] ?? 4;

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
	(typeof process !== 'undefined' && (process.env?.PUBLIC_LOG_LEVEL as Log_Level | undefined)) ||
	'info';

/*

`Logger` uses a special pattern
to achieve a good mix of convenience and flexibility
both for Felt and user code.
It uses late binding to allow runtime mutations
and it accepts a `Logger_State` argument for custom behavior.
Though the code is more verbose and slower as a result,
the tradeoffs make sense for logging in development.
TODO use a different logger in production

The default `Logger_State` is the `Logger` class itself.
This pattern allows us to have globally mutable logger state
without locking the code into the singleton pattern.
Properties like the static `Logger.level` can be mutated
to affect all loggers that get instantiated with the default state,
but loggers can also be instantiated with other state
that isn't affected by these globally mutable values.

Custom loggers like `System_Logger` (see below)
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
	static log: Log = console.log.bind(console); // eslint-disable-line no-console
	static prefixes: unknown[] = [];
	static suffixes: unknown[] = [];
	static error: Log_Level_Defaults = {
		prefixes: [red('➤'), black(bg_red(' 🞩 error 🞩 ')), red('\n➤')],
		suffixes: ['\n ', black(bg_red(' 🞩🞩 '))],
	};
	static warn: Log_Level_Defaults = {
		prefixes: [yellow('➤'), black(bg_yellow(' ⚑ warning ⚑ ')), '\n' + yellow('➤')],
		suffixes: ['\n ', black(bg_yellow(' ⚑ '))],
	};
	static info: Log_Level_Defaults = {
		prefixes: [gray('➤')],
		suffixes: [],
	};
	static debug: Log_Level_Defaults = {
		prefixes: [gray('—')],
		suffixes: [],
	};
}

/*

The `System_Logger` is distinct from the `Logger`
to cleanly separate Felt's logging from user logging, decoupling their log levels.
Felt internally uses `System_Logger`, not `Logger` directly.
This allows user code to simply import and use `Logger`.
`System_Logger` is still made available to user code,
and users can always extend `Logger` with their own custom versions.

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
	static level: Log_Level = DEFAULT_LOG_LEVEL; // to set alongside the `Logger` value, see `configure_log_level`
	static log: Log = console.log.bind(console); // eslint-disable-line no-console
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
