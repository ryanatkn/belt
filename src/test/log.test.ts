import {describe, test, assert} from 'vitest';

import {Logger, type Console_Type} from '$lib/log.js';

const log = new Logger();

interface Test_Context {
	logged_args?: Array<unknown>;
	error_args?: Array<unknown>;
	warn_args?: Array<unknown>;
	console: Console_Type;
}

const create_test_context = (): Test_Context => {
	const ctx: Test_Context = {
		logged_args: undefined,
		error_args: undefined,
		warn_args: undefined,
		console: {
			error: (...args: Array<unknown>) => {
				ctx.error_args = args;
				log.debug('error_args', args);
			},
			warn: (...args: Array<unknown>) => {
				ctx.warn_args = args;
				log.debug('warn_args', args);
			},
			log: (...args: Array<unknown>) => {
				ctx.logged_args = args;
				log.debug('logged_args', args);
			},
		},
	};
	return ctx;
};

describe('Logger', () => {
	describe('Core Functionality', () => {
		test('Logger with label formats prefix', () => {
			const ctx = create_test_context();
			const log = new Logger('test', {console: ctx.console, colors: false, level: 'info'});

			log.info('message');

			assert.ok(ctx.logged_args);
			assert.ok(ctx.logged_args.some((arg) => typeof arg === 'string' && arg.includes('[test]')));
		});

		test('Logger without label has no bracket prefix', () => {
			const ctx = create_test_context();
			const log = new Logger(undefined, {console: ctx.console, colors: false, level: 'info'});

			log.info('message');

			assert.ok(ctx.logged_args);
			assert.ok(!ctx.logged_args.some((arg) => typeof arg === 'string' && arg.includes('[')));
		});

		test('Log level filtering', () => {
			const ctx = create_test_context();
			const log = new Logger('test', {level: 'warn', console: ctx.console, colors: false});

			log.info('hidden');
			assert.equal(ctx.logged_args, undefined);

			log.warn('shown');
			assert.ok(ctx.warn_args);
		});

		test('All log methods work', () => {
			const ctx = create_test_context();
			const log = new Logger('test', {level: 'debug', console: ctx.console, colors: false});

			log.error('error message');
			assert.ok(ctx.error_args);
			assert.ok(ctx.error_args.some((arg) => typeof arg === 'string' && arg.includes('error')));
			ctx.error_args = undefined;

			log.warn('warn message');
			assert.ok(ctx.warn_args);
			assert.ok(ctx.warn_args.some((arg) => typeof arg === 'string' && arg.includes('warn')));
			ctx.warn_args = undefined;

			log.info('info message');
			assert.ok(ctx.logged_args);
			ctx.logged_args = undefined;

			log.debug('debug message');
			assert.ok(ctx.logged_args);
			assert.ok(ctx.logged_args.some((arg) => typeof arg === 'string' && arg.includes('debug')));
			ctx.logged_args = undefined;
		});

		test('plain() bypasses level filtering and formatting', () => {
			const ctx = create_test_context();
			const log = new Logger('test', {level: 'off', console: ctx.console, colors: false});

			log.info('hidden');
			assert.equal(ctx.logged_args, undefined);

			log.plain('shown');
			assert.deepStrictEqual(ctx.logged_args, ['shown']);
		});
	});

	describe('Child Loggers', () => {
		test('child() creates logger with concatenated label', () => {
			const parent = new Logger('parent');
			const child = parent.child('child');

			assert.equal(child.label, 'parent__child');
		});

		test('child() without parent label', () => {
			const parent = new Logger();
			const child = parent.child('child');

			assert.equal(child.label, 'child');
		});

		test('deep nesting of children', () => {
			const root = new Logger('root');
			const level1 = root.child('l1');
			const level2 = level1.child('l2');
			const level3 = level2.child('l3');

			assert.equal(level3.label, 'root__l1__l2__l3');
		});

		test('child logger output includes full label path', () => {
			const ctx = create_test_context();
			const parent = new Logger('parent', {console: ctx.console, colors: false, level: 'info'});
			const child = parent.child('child');

			child.info('message');

			assert.ok(ctx.logged_args);
			assert.ok(
				ctx.logged_args.some((arg) => typeof arg === 'string' && arg.includes('[parent__child]')),
			);
		});
	});

	describe('Inheritance', () => {
		test('child inherits parent level', () => {
			const ctx = create_test_context();
			const parent = new Logger('parent', {level: 'warn', console: ctx.console, colors: false});
			const child = parent.child('child');

			child.info('should be muted');
			assert.equal(ctx.logged_args, undefined);

			child.warn('should show');
			assert.ok(ctx.warn_args);
		});

		test('child can override parent level', () => {
			const ctx = create_test_context();
			const parent = new Logger('parent', {level: 'warn', console: ctx.console, colors: false});
			const child = parent.child('child', {level: 'info'});

			child.info('should show');
			assert.ok(ctx.logged_args);
		});

		test('child inherits console from parent', () => {
			const ctx = create_test_context();
			const parent = new Logger('parent', {console: ctx.console, colors: false, level: 'info'});
			const child = parent.child('child');

			child.info('message');
			assert.ok(ctx.logged_args); // Should use parent's console
		});

		test('child inherits colors from parent', () => {
			const parent = new Logger('parent', {colors: true});
			const child = parent.child('child');

			assert.equal(parent.colors, child.colors);
		});

		test('grandchild inherits from parent chain', () => {
			const ctx = create_test_context();
			const root = new Logger('root', {
				level: 'info',
				console: ctx.console,
				colors: false,
			});
			const parent = root.child('parent');
			const child = parent.child('child');

			// Check console inheritance
			child.debug('hidden');
			assert.equal(ctx.logged_args, undefined);

			child.info('shown');
			assert.ok(ctx.logged_args);

			// Check label inheritance
			assert.equal(child.label, 'root__parent__child');
		});
	});

	describe('Label Validation', () => {
		test('label with colon throws error', () => {
			assert.throws(() => new Logger('user:123'), /contains reserved character/);
		});

		test('empty child label throws error', () => {
			const parent = new Logger('parent');
			assert.throws(() => parent.child(''), /cannot be empty/);
		});

		test('empty root label is allowed', () => {
			const log = new Logger('');
			assert.equal(log.label, '');
		});

		test('label with multiple colons throws error', () => {
			assert.throws(() => new Logger('user:123:456'), /contains reserved character/);
		});
	});

	describe('Configuration', () => {
		test('colors option controls styling', () => {
			const ctx = create_test_context();

			const colored = new Logger('test', {colors: true, console: ctx.console});
			assert.equal(colored.colors, true);

			const plain = new Logger('test', {colors: false, console: ctx.console});
			assert.equal(plain.colors, false);
		});

		test('default log level is used when not specified', () => {
			const log = new Logger('test');

			// Default level should be set (varies by environment: 'off' in vitest, 'debug' in DEV, 'info' in prod)
			assert.ok(['off', 'info', 'debug'].includes(log.level));
		});

		test('custom level overrides default', () => {
			const log = new Logger('test', {level: 'error'});

			assert.equal(log.level, 'error');
		});

		test('level off silences all logging', () => {
			const ctx = create_test_context();
			const log = new Logger('test', {level: 'off', console: ctx.console, colors: false});

			log.error('hidden');
			assert.equal(ctx.error_args, undefined);

			log.warn('hidden');
			assert.equal(ctx.warn_args, undefined);

			log.info('hidden');
			assert.equal(ctx.logged_args, undefined);

			log.debug('hidden');
			assert.equal(ctx.logged_args, undefined);
		});

		test('level debug shows all messages', () => {
			const ctx = create_test_context();
			const log = new Logger('test', {level: 'debug', console: ctx.console, colors: false});

			log.debug('shown');
			assert.ok(ctx.logged_args);
			ctx.logged_args = undefined;

			log.info('shown');
			assert.ok(ctx.logged_args);
			ctx.logged_args = undefined;

			log.warn('shown');
			assert.ok(ctx.warn_args);
			ctx.warn_args = undefined;

			log.error('shown');
			assert.ok(ctx.error_args);
		});
	});

	describe('Multiple Arguments', () => {
		test('logger passes through multiple arguments', () => {
			const ctx = create_test_context();
			const log = new Logger('test', {console: ctx.console, colors: false, level: 'info'});

			log.info('message', 42, {foo: 'bar'}, ['array']);

			assert.ok(ctx.logged_args);
			assert.ok(ctx.logged_args.includes('message'));
			assert.ok(ctx.logged_args.includes(42));
			assert.ok(ctx.logged_args.some((arg) => typeof arg === 'object' && arg.foo === 'bar'));
			assert.ok(ctx.logged_args.some((arg) => Array.isArray(arg)));
		});
	});

	describe('Parent Reference', () => {
		test('child has reference to parent', () => {
			const parent = new Logger('parent');
			const child = parent.child('child');

			assert.equal(child.parent, parent);
		});

		test('root logger has no parent', () => {
			const log = new Logger('root');

			assert.equal(log.parent, undefined);
		});
	});

	describe('Edge Cases', () => {
		test('very long label is handled', () => {
			const long_label = 'a'.repeat(1000);
			const log = new Logger(long_label);

			assert.equal(log.label, long_label);
		});

		test('label with multiple underscores', () => {
			const log = new Logger('foo__bar__baz');

			assert.equal(log.label, 'foo__bar__baz');
		});

		test('label with leading underscores', () => {
			const log = new Logger('__foo');

			assert.equal(log.label, '__foo');
		});

		test('label with trailing underscores', () => {
			const log = new Logger('foo__');

			assert.equal(log.label, 'foo__');
		});

		test('label with only underscores', () => {
			const log = new Logger('____');

			assert.equal(log.label, '____');
		});

		test('unicode emoji label', () => {
			const log = new Logger('🚀app');

			assert.equal(log.label, '🚀app');
		});

		test('deep inheritance chain with mixed overrides', () => {
			const ctx = create_test_context();
			const root = new Logger('root', {level: 'error', console: ctx.console, colors: false});
			const level1 = root.child('l1', {level: 'warn'});
			const level2 = level1.child('l2'); // Inherits 'warn'
			const level3 = level2.child('l3', {level: 'debug'}); // Override to 'debug'
			const level4 = level3.child('l4'); // Inherits 'debug'

			// Check levels
			assert.equal(root.level, 'error');
			assert.equal(level1.level, 'warn');
			assert.equal(level2.level, 'warn');
			assert.equal(level3.level, 'debug');
			assert.equal(level4.level, 'debug');

			// Check labels
			assert.equal(level4.label, 'root__l1__l2__l3__l4');

			// Check console inheritance
			level4.error('test');
			assert.ok(ctx.error_args);
		});

		test('child of child of child label concatenation', () => {
			const root = new Logger('a');
			const child1 = root.child('b');
			const child2 = child1.child('c');
			const child3 = child2.child('d');
			const child4 = child3.child('e');

			assert.equal(child4.label, 'a__b__c__d__e');
			assert.equal(child4.parent, child3);
			assert.equal(child3.parent, child2);
			assert.equal(child2.parent, child1);
			assert.equal(child1.parent, root);
		});

		test('single character label', () => {
			const ctx = create_test_context();
			const log = new Logger('x', {console: ctx.console, colors: false, level: 'info'});

			log.info('test');

			assert.ok(ctx.logged_args);
			assert.ok(ctx.logged_args.some((arg) => typeof arg === 'string' && arg.includes('[x]')));
		});

		test('numeric-looking label is still string', () => {
			const log = new Logger('123');

			assert.equal(log.label, '123');
			assert.equal(typeof log.label, 'string');
		});

		test('label with spaces', () => {
			const log = new Logger('my app');

			assert.equal(log.label, 'my app');
		});

		test('label with special characters', () => {
			const log = new Logger('app-v2.0');

			assert.equal(log.label, 'app-v2.0');
		});
	});
});
