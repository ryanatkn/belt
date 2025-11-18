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
export type Log_Console = Pick<typeof console, 'error' | 'warn' | 'log'>;

const CHAR_ERROR = '🞩';
const CHAR_WARN = '⚑';
// const CHAR_INFO = ''; // not used, not customizable
const CHAR_DEBUG = '┆';

// Pre-computed method prefix strings
const PREFIX_ERROR = `${CHAR_ERROR}error${CHAR_ERROR}`;
const PREFIX_WARN = `${CHAR_WARN}warn${CHAR_WARN}`;
// const PREFIX_INFO = CHAR_INFO; // not used, not customizable
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
export const log_level_to_number = (level: Log_Level): number => LOG_LEVEL_VALUES[level];

/**
 * Parses and validates a log level string.
 * @param value The value to parse as a log level
 * @returns The validated log level, or undefined if value is undefined
 * @throws Error if value is provided but invalid
 */
export const log_level_parse = (value: string | undefined): Log_Level | undefined => {
	if (!value) return undefined;
	if (value in LOG_LEVEL_VALUES) return value as Log_Level;
	throw new Error(`Invalid log level: '${value}'`);
};

const DEFAULT_LOG_LEVEL: Log_Level =
	(typeof process === 'undefined' ? undefined : log_level_parse(process.env.PUBLIC_LOG_LEVEL)) ??
	(process.env.VITEST ? 'off' : DEV ? 'debug' : 'info');

// Identity function for when colors are disabled
const NO_COLOR_ST: typeof styleText = (_: string | Array<string>, s: string) => s;

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
 * db_log.info('connected'); // [app:db] ➤ connected
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
	#console_override?: Log_Console;

	// Lazy cache for formatted prefixes (individually cached and invalidated when colors change)
	#cached_colors?: boolean;
	#cached_st?: typeof styleText;
	#cached_error?: string;
	#cached_warn?: string;
	#cached_info?: string;
	#cached_debug?: string;

	#cached_level_string?: Log_Level;
	#cached_level?: number;

	constructor(label?: string, options: Logger_Options = {}) {
		this.label = label;
		this.parent = (options as Internal_Logger_Options).parent;

		// Set overrides if provided (undefined = inherit from parent)
		if (options.level !== undefined) {
			log_level_parse(options.level); // throws if invalid
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
		log_level_parse(value); // throws if invalid
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
	get console(): Log_Console {
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
	set console(value: Log_Console) {
		this.#console_override = value;
	}

	/**
	 * Gets the root logger by walking up the parent chain.
	 * Useful for setting global configuration that affects all child loggers.
	 * @returns The root logger (the one without a parent)
	 */
	get root(): Logger {
		let current: Logger = this; // eslint-disable-line consistent-this, @typescript-eslint/no-this-alias
		while (current.parent) {
			current = current.parent;
		}
		return current;
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
			const label = this.#format_label(st, this.#cached_colors!);
			this.#cached_info = label || '';
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
	 * Caches based on resolved level string to avoid repeated dictionary lookups.
	 */
	#get_cached_level(): number {
		const current_level_string = this.level;
		if (this.#cached_level_string !== current_level_string) {
			this.#cached_level_string = current_level_string;
			this.#cached_level = LOG_LEVEL_VALUES[current_level_string];
		}
		return this.#cached_level!;
	}

	/**
	 * Creates a child logger with automatic label concatenation.
	 * Children inherit parent configuration unless overridden.
	 *
	 * @param label Child label (will be concatenated with parent label using `:`)
	 * @param options Optional configuration overrides
	 * @returns New Logger instance with concatenated label
	 *
	 * @example
	 * ```ts
	 * const app_log = new Logger('app');
	 * const db_log = app_log.child('db'); // label: 'app:db'
	 * ```
	 */
	child(label: string, options: Logger_Options = {}): Logger {
		if (label === '') {
			throw new Error('Logger label cannot be empty when creating child');
		}

		const child_label = this.label ? `${this.label}:${label}` : label;

		// Pass parent reference and all config options
		const internal_options: Internal_Logger_Options = {
			...options,
			parent: this,
		};
		return new Logger(child_label, internal_options);
	}

	error(...args: Array<unknown>): void {
		if (this.#get_cached_level() < LOG_LEVEL_VALUES.error) return;
		this.console.error(this.#get_error_prefix(), ...args);
	}

	warn(...args: Array<unknown>): void {
		if (this.#get_cached_level() < LOG_LEVEL_VALUES.warn) return;
		this.console.warn(this.#get_warn_prefix(), ...args);
	}

	info(...args: Array<unknown>): void {
		if (this.#get_cached_level() < LOG_LEVEL_VALUES.info) return;
		this.console.log(this.#get_info_prefix(), ...args);
	}

	debug(...args: Array<unknown>): void {
		if (this.#get_cached_level() < LOG_LEVEL_VALUES.debug) return;
		this.console.log(this.#get_debug_prefix(), ...args);
	}

	/**
	 * Logs a plain message without any prefix or formatting.
	 * Useful for outputting structured data or when you need full control over formatting.
	 * @param args Values to log
	 */
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
	console?: Log_Console;

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
