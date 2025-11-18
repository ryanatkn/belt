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

// Pre-computed method prefix strings
const PREFIX_ERROR = `${CHAR_ERROR}error${CHAR_ERROR}`;
const PREFIX_WARN = `${CHAR_WARN}warn${CHAR_WARN}`;
const PREFIX_INFO = CHAR_INFO;
const PREFIX_DEBUG = `${CHAR_DEBUG}debug${CHAR_DEBUG}`;

const LOG_LEVEL_VALUES: Record<Log_Level, number> = {
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
 */
export const log_level_to_number = (level: Log_Level): number => {
	return LOG_LEVEL_VALUES[level];
};

const DEFAULT_LOG_LEVEL: Log_Level =
	(typeof process === 'undefined'
		? null
		: (process.env.PUBLIC_LOG_LEVEL as Log_Level | undefined)) ??
	(process.env.VITEST ? 'off' : DEV ? 'debug' : 'info');

// Identity function for when colors are disabled
const NO_COLOR_ST: typeof styleText = (_: unknown, s: string) => s;

/**
 * Simple, flexible logger with support for child loggers and automatic context.
 *
 * Features:
 * - Instance-based configuration (no global state)
 * - Child loggers with automatic label concatenation
 * - Parent chain inheritance for level, console, and colors
 * - Respects NO_COLOR environment variable
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
	readonly parent?: Logger;

	// Private override fields (undefined = inherit from parent)
	#level_override?: Log_Level;
	#colors_override?: boolean;
	#console_override?: Console_Type;

	// Lazy cache for formatted prefixes (individually cached and invalidated when colors change)
	#cached_colors?: boolean;
	#cached_st?: typeof styleText;
	#cached_error?: string;
	#cached_warn?: string;
	#cached_info?: string;
	#cached_debug?: string;

	// Cached numeric level value (updated on each access to avoid repeated lookups)
	#cached_level?: number;

	constructor(label?: string, options: Logger_Options = {}) {
		this.label = label;
		this.parent = (options as Internal_Logger_Options).parent;

		// Set overrides if provided (undefined = inherit from parent)
		if (options.level !== undefined) {
			this.#level_override = options.level;
		}
		if (options.colors !== undefined) {
			this.#colors_override = options.colors;
		}
		if (options.console !== undefined) {
			this.#console_override = options.console;
		}
	}

	/**
	 * Dynamic getter for level - checks override, then parent, then default.
	 */
	get level(): Log_Level {
		if (this.#level_override !== undefined) {
			return this.#level_override;
		}
		if (this.parent) {
			return this.parent.level;
		}
		return DEFAULT_LOG_LEVEL;
	}

	/**
	 * Setter for level - creates override.
	 */
	set level(value: Log_Level) {
		if (!(value in LOG_LEVEL_VALUES)) {
			throw new Error(`Invalid log level: '${value}'`);
		}
		this.#level_override = value;
	}

	/**
	 * Dynamic getter for colors - checks override, then parent, then NO_COLOR env.
	 */
	get colors(): boolean {
		if (this.#colors_override !== undefined) {
			return this.#colors_override;
		}
		if (this.parent) {
			return this.parent.colors;
		}
		const has_no_color =
			typeof process !== 'undefined' &&
			(process.env.NO_COLOR !== undefined || process.env.CLAUDECODE !== undefined);
		return !has_no_color;
	}

	/**
	 * Setter for colors - creates override.
	 */
	set colors(value: boolean) {
		this.#colors_override = value;
	}

	/**
	 * Dynamic getter for console - checks override, then parent, then global console.
	 */
	get console(): Console_Type {
		if (this.#console_override !== undefined) {
			return this.#console_override;
		}
		if (this.parent) {
			return this.parent.console;
		}
		return console;
	}

	/**
	 * Setter for console - creates override.
	 */
	set console(value: Console_Type) {
		this.#console_override = value;
	}

	/**
	 * Ensures cache is valid by checking if colors configuration changed.
	 * Invalidates all cached prefixes if colors changed.
	 */
	#ensure_cache_valid(): void {
		const current_colors = this.colors;
		if (this.#cached_colors !== current_colors) {
			this.#cached_colors = current_colors;
			this.#cached_st = current_colors ? styleText : NO_COLOR_ST;
			this.#cached_error = undefined;
			this.#cached_warn = undefined;
			this.#cached_info = undefined;
			this.#cached_debug = undefined;
		}
	}

	/**
	 * Formats the label portion of log output with given styleText function.
	 */
	#format_label(st: typeof styleText, colored: boolean): string {
		if (!this.label) return '';

		return colored
			? `${st('gray', '[')}${st('magenta', this.label)}${st('gray', ']')}`
			: `[${this.label}]`;
	}

	/**
	 * Gets the formatted error prefix, lazily computing if needed.
	 */
	#get_error_prefix(): string {
		this.#ensure_cache_valid();
		if (this.#cached_error === undefined) {
			const st = this.#cached_st!;
			const prefix = st('red', PREFIX_ERROR);
			const label = this.#format_label(st, this.#cached_colors!);
			this.#cached_error = label ? `${prefix} ${label}` : prefix;
		}
		return this.#cached_error;
	}

	/**
	 * Gets the formatted warn prefix, lazily computing if needed.
	 */
	#get_warn_prefix(): string {
		this.#ensure_cache_valid();
		if (this.#cached_warn === undefined) {
			const st = this.#cached_st!;
			const prefix = st('yellow', PREFIX_WARN);
			const label = this.#format_label(st, this.#cached_colors!);
			this.#cached_warn = label ? `${prefix} ${label}` : prefix;
		}
		return this.#cached_warn;
	}

	/**
	 * Gets the formatted info prefix, lazily computing if needed.
	 */
	#get_info_prefix(): string {
		this.#ensure_cache_valid();
		if (this.#cached_info === undefined) {
			const st = this.#cached_st!;
			const prefix = st('cyan', PREFIX_INFO);
			const label = this.#format_label(st, this.#cached_colors!);
			this.#cached_info = label ? `${prefix} ${label}` : prefix;
		}
		return this.#cached_info;
	}

	/**
	 * Gets the formatted debug prefix, lazily computing if needed.
	 */
	#get_debug_prefix(): string {
		this.#ensure_cache_valid();
		if (this.#cached_debug === undefined) {
			const st = this.#cached_st!;
			const prefix = st('gray', PREFIX_DEBUG);
			const label = this.#format_label(st, this.#cached_colors!);
			this.#cached_debug = label ? `${prefix} ${label}` : prefix;
		}
		return this.#cached_debug;
	}

	/**
	 * Gets the cached numeric level value, updating cache if level changed.
	 * Avoids repeated parent chain walks and dictionary lookups.
	 */
	#get_cached_level(): number {
		const current_level = log_level_to_number(this.level);
		if (this.#cached_level !== current_level) {
			this.#cached_level = current_level;
		}
		return this.#cached_level;
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
	child(label: string, options: Logger_Options = {}): Logger {
		if (label === '') {
			throw new Error('Logger label cannot be empty when creating child');
		}

		const child_label = this.label ? `${this.label}__${label}` : label;

		// Pass parent reference and all config options
		return new Logger(child_label, {
			...options,
			parent: this,
		} as Internal_Logger_Options);
	}

	error(...args: Array<unknown>): void {
		if (this.#get_cached_level() < 1) return; // error = 1
		this.console.error(this.#get_error_prefix(), ...args);
	}

	warn(...args: Array<unknown>): void {
		if (this.#get_cached_level() < 2) return; // warn = 2
		this.console.warn(this.#get_warn_prefix(), ...args);
	}

	info(...args: Array<unknown>): void {
		if (this.#get_cached_level() < 3) return; // info = 3
		this.console.log(this.#get_info_prefix(), ...args);
	}

	debug(...args: Array<unknown>): void {
		if (this.#get_cached_level() < 4) return; // debug = 4
		this.console.log(this.#get_debug_prefix(), ...args);
	}

	plain(...args: Array<unknown>): void {
		this.console.log(...args);
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

// Internal type for child() implementation
interface Internal_Logger_Options extends Logger_Options {
	parent?: Logger;
}
