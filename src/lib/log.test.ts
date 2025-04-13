import {suite} from 'uvu';
import * as assert from 'uvu/assert';

import {Logger, type Logger_State} from '$lib/log.js';

const log = new Logger();

interface Test_Logger_Context {
	logged_args: any;
	logger_state: Logger_State;
}
const create_test_logger_context = (): Test_Logger_Context => {
	const collect_args = (...log_args: Array<any>) => {
		ctx.logged_args = log_args;
		log.debug(`log_args`, log_args);
	};
	const ctx: Test_Logger_Context = {
		logged_args: undefined, // stores the result of the latest log call
		logger_state: {
			level: 'debug',
			st: (_, s) => s,
			console: {
				error: collect_args,
				warn: collect_args,
				log: collect_args,
			},
			prefixes: () => ['pre'],
			suffixes: () => ['post'],
			error_prefixes: () => ['errorP1', 'errorP2'],
			error_suffixes: () => ['errorS1', 'errorS2'],
			warn_prefixes: () => ['warnP1', 'warnP2'],
			warn_suffixes: () => ['warnS1', 'warnS2'],
			info_prefixes: () => ['infoP1', 'infoP2'],
			info_suffixes: () => ['infoS1', 'infoS2'],
			debug_prefixes: () => ['debugP1', 'debugP2'],
			debug_suffixes: () => ['debugS1', 'debugS2'],
		},
	};
	return ctx;
};
const test = suite('Logger', create_test_logger_context());

test('prefixes and suffixes', (ctx) => {
	const log = new Logger(['p1', 'p2'], ['s1', 's2'], ctx.logger_state);

	log.error('foo', 36);
	assert.equal(ctx.logged_args, [
		'pre',
		'errorP1',
		'errorP2',
		'p1',
		'p2',
		'foo',
		36,
		's1',
		's2',
		'errorS1',
		'errorS2',
		'post',
	]);
	ctx.logged_args = undefined;

	log.warn('foo', 36);
	assert.equal(ctx.logged_args, [
		'pre',
		'warnP1',
		'warnP2',
		'p1',
		'p2',
		'foo',
		36,
		's1',
		's2',
		'warnS1',
		'warnS2',
		'post',
	]);
	ctx.logged_args = undefined;

	log.info('foo', 36);
	assert.equal(ctx.logged_args, [
		'pre',
		'infoP1',
		'infoP2',
		'p1',
		'p2',
		'foo',
		36,
		's1',
		's2',
		'infoS1',
		'infoS2',
		'post',
	]);
	ctx.logged_args = undefined;

	log.debug('foo', 36);
	assert.equal(ctx.logged_args, [
		'pre',
		'debugP1',
		'debugP2',
		'p1',
		'p2',
		'foo',
		36,
		's1',
		's2',
		'debugS1',
		'debugS2',
		'post',
	]);
	ctx.logged_args = undefined;
});

test('mutate logger state to change prefix and suffix', (ctx) => {
	const info_prefixes = ['p1', 'p2'];
	const info_suffixes = ['s1', 's2'];
	const log = new Logger(undefined, undefined, {
		...ctx.logger_state,
		info_prefixes: () => info_prefixes,
		info_suffixes: () => info_suffixes,
	});
	log.info('foo', 36);
	assert.equal(ctx.logged_args, ['pre', 'p1', 'p2', 'foo', 36, 's1', 's2', 'post']);
	ctx.logged_args = undefined;

	// mutate the prefixes and suffixes
	info_prefixes.pop();
	info_suffixes.shift();

	log.info('foo', 36);
	assert.equal(ctx.logged_args, ['pre', 'p1', 'foo', 36, 's2', 'post']);
	ctx.logged_args = undefined;
});

test('mutate logger state to change log level', (ctx) => {
	const state: Logger_State = {
		...ctx.logger_state,
		info_prefixes: () => [],
		info_suffixes: () => [],
		warn_prefixes: () => [],
		warn_suffixes: () => [],
	};
	const log = new Logger(undefined, undefined, state);

	log.info('foo');
	assert.equal(ctx.logged_args, ['pre', 'foo', 'post']);
	ctx.logged_args = undefined;

	state.level = 'warn';

	// `info` should now be silenced
	log.info('foo');
	assert.equal(ctx.logged_args, undefined);

	// `warn` is not silenced though
	log.warn('foo');
	assert.equal(ctx.logged_args, ['pre', 'foo', 'post']);
	ctx.logged_args = undefined;
});

test.run();
