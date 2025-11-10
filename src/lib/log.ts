import {styleText} from 'node:util';
import {DEV} from 'esm-env';

/**
 * Log level hierarchy from least to most verbose.
 * - `'off'`: No logging
 * - `'error'`: Only errors
 * - `'warn'`: Errors and warnings
 * - `'info'`: Errors, warnings, and info (default)
 * - `'debug'`: All messages including debug
 */
export type Log_Level = 'off' | 'error' | 'warn' | 'info' | 'debug';

/**
 * Console interface subset used by Logger for output.
 * Allows custom console implementations for testing.
 */
export type Console_Type = Pick<typeof console, 'error' | 'warn' | 'log'>;

const CHAR_ERROR = '🞩';
const CHAR_WARN = '⚑';
const CHAR_INFO = '➤';
const CHAR_DEBUG = '┆';

const LOG_LEVEL_VALUES: Record<Log_Level, number | undefined> = {
	off: 0,
	error: 1,
	warn: 2,
	info: 3,
	debug: 4,
};

/**
 * Converts a log level to its numeric value for comparison.
 * Higher numbers indicate more verbose logging.
 * @param level The log level to convert
 * @returns Numeric value (0-4)
 * @throws {Error} If an invalid log level is provided
 */
export const log_level_to_number = (level: Log_Level): number => {
	const value = LOG_LEVEL_VALUES[level];
	if (value === undefined) {
		throw new Error(`Invalid log level: '${level}'`);
	}
	return value;
};

const should_log = (current_level: Log_Level, message_level: Log_Level): boolean => {
	return LOG_LEVEL_VALUES[current_level]! >= LOG_LEVEL_VALUES[message_level]!;
};

const DEFAULT_LOG_LEVEL: Log_Level =
	(typeof process === 'undefined'
		? null
		: (process.env.PUBLIC_LOG_LEVEL as Log_Level | undefined)) ??
	(process.env.VITEST ? 'off' : DEV ? 'debug' : 'info');

// Identity function for when colors are disabled
const NO_COLOR_ST: typeof styleText = (_: string, s: string) => s;

/**
 * Simple, flexible logger with support for child loggers and automatic context.
 *
 * Features:
 * - Instance-based configuration (no global state)
 * - Child loggers with automatic label concatenation
 * - Parent chain inheritance for level, console, and colors
 * - Respects NO_COLOR environment variable
 * - Fail-fast label validation
 *
 * @example
 * ```ts
 * // Basic logger
 * const log = new Logger('app');
 * log.info('starting'); // [app] ➤ starting
 *
 * // Child logger
 * const db_log = log.child('db');
 * db_log.info('connected'); // [app__db] ➤ connected
 *
 * // Custom configuration
 * const verbose_log = new Logger('debug', { level: 'debug', colors: true });
 * ```
 */
export class Logger {
	readonly label?: string;
	readonly level: Log_Level;
	readonly parent?: Logger;
	readonly colors: boolean;

	readonly console: Console_Type;
	readonly #st: typeof styleText;

	constructor(label?: string, options: Logger_Options = {}) {
		// Validate label
		if (label?.includes(':')) {
			throw new Error(`Logger label '${label}' contains reserved character ':'`);
		}

		this.label = label;
		this.parent = (options as Internal_Logger_Options).parent;

		// Inherit configuration from parent or use defaults
		this.level = options.level ?? this.parent?.level ?? DEFAULT_LOG_LEVEL;
		this.console = options.console ?? this.parent?.console ?? console;

		// Colors: options > parent > NO_COLOR env var
		// NO_COLOR standard: if set (to any value), disable colors
		const has_no_color = typeof process !== 'undefined' && process.env.NO_COLOR !== undefined;
		this.colors = options.colors ?? this.parent?.colors ?? !has_no_color;
		this.#st = this.colors ? styleText : NO_COLOR_ST;
	}

	/**
	 * Creates a child logger with automatic label concatenation.
	 * Children inherit parent configuration unless overridden.
	 *
	 * @param label Child label (will be concatenated with parent label using `__`)
	 * @param options Optional configuration overrides
	 * @returns New Logger instance with concatenated label
	 *
	 * @example
	 * ```ts
	 * const app_log = new Logger('app');
	 * const db_log = app_log.child('db'); // label: 'app__db'
	 * ```
	 */
	child(label: string, options: Child_Logger_Options = {}): Logger {
		if (label === '') {
			throw new Error('Logger label cannot be empty when creating child');
		}

		const child_label = this.label ? `${this.label}__${label}` : label;

		// Pass parent reference and config
		return new Logger(child_label, {
			level: options.level,
			parent: this,
		} as Internal_Logger_Options);
	}

	error(...args: Array<unknown>): void {
		if (!should_log(this.level, 'error')) return;
		const prefix = this.#format_prefix('error');
		this.console.error(...prefix, ...args);
	}

	warn(...args: Array<unknown>): void {
		if (!should_log(this.level, 'warn')) return;
		const prefix = this.#format_prefix('warn');
		this.console.warn(...prefix, ...args);
	}

	info(...args: Array<unknown>): void {
		if (!should_log(this.level, 'info')) return;
		const prefix = this.#format_prefix('info');
		this.console.log(...prefix, ...args);
	}

	debug(...args: Array<unknown>): void {
		if (!should_log(this.level, 'debug')) return;
		const prefix = this.#format_prefix('debug');
		this.console.log(...prefix, ...args);
	}

	plain(...args: Array<unknown>): void {
		this.console.log(...args);
	}

	#format_prefix(method: 'error' | 'warn' | 'info' | 'debug'): Array<unknown> {
		const prefix: Array<unknown> = [];

		// Add method-specific prefix
		switch (method) {
			case 'error':
				prefix.push(this.#st('red', `${CHAR_ERROR}error${CHAR_ERROR} `));
				break;
			case 'warn':
				prefix.push(this.#st('yellow', `${CHAR_WARN}warn${CHAR_WARN} `));
				break;
			case 'info':
				prefix.push(this.#st('cyan', CHAR_INFO));
				break;
			case 'debug':
				prefix.push(this.#st('gray', `${CHAR_DEBUG}debug${CHAR_DEBUG} `));
				break;
		}

		// Add label if present
		if (this.label) {
			prefix.push(this.#format_label(this.label));
		}

		return prefix;
	}

	#format_label(label: string): string {
		return `${this.#st('gray', '[')}${this.#st('magenta', label)}${this.#st('gray', ']')}`;
	}
}

export interface Logger_Options {
	/**
	 * Log level for this logger instance.
	 * Inherits from parent or defaults to 'info'.
	 */
	level?: Log_Level;

	/**
	 * Console interface for output.
	 * Inherits from parent or defaults to global console.
	 * Useful for testing.
	 */
	console?: Console_Type;

	/**
	 * Whether to use colors in output.
	 * Inherits from parent or defaults to enabled (unless NO_COLOR env var is set).
	 */
	colors?: boolean;
}

/**
 * Configuration options for child loggers.
 * Child loggers can only override level, inheriting console and colors from parent.
 */
export type Child_Logger_Options = Pick<Logger_Options, 'level'>;

// Internal type for child() implementation
interface Internal_Logger_Options extends Logger_Options {
	parent?: Logger;
}
