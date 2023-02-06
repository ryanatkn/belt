import {suite} from 'uvu';
import * as assert from 'uvu/assert';

import {Logger, LogLevel, type LoggerState} from './log.js';

/* test__Logger */
interface TestLoggerContext {
	loggedArgs: any;
	loggerState: LoggerState;
}
const createTest__loggerContext = (): TestLoggerContext => {
	const ctx: TestLoggerContext = {
		loggedArgs: undefined, // stores the result of the latest log call
		loggerState: {
			level: LogLevel.Trace,
			log: (...logArgs: any[]) => {
				ctx.loggedArgs = logArgs;
			},
			prefixes: ['pre'],
			suffixes: ['post'],
			error: {
				prefixes: ['errorP1', 'errorP2'],
				suffixes: ['errorS1', 'errorS2'],
			},
			warn: {
				prefixes: ['warnP1', 'warnP2'],
				suffixes: ['warnS1', 'warnS2'],
			},
			info: {
				prefixes: ['infoP1', 'infoP2'],
				suffixes: ['infoS1', 'infoS2'],
			},
			trace: {
				prefixes: ['traceP1', 'traceP2'],
				suffixes: ['traceS1', 'traceS2'],
			},
		},
	};
	return ctx;
};
const test__Logger = suite('Logger', createTest__loggerContext());

test__Logger('prefixes and suffixes', (ctx) => {
	const log = new Logger(['p1', 'p2'], ['s1', 's2'], ctx.loggerState);

	log.error('foo', 36);
	assert.equal(ctx.loggedArgs, [
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
	ctx.loggedArgs = undefined;

	log.warn('foo', 36);
	assert.equal(ctx.loggedArgs, [
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
	ctx.loggedArgs = undefined;

	log.info('foo', 36);
	assert.equal(ctx.loggedArgs, [
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
	ctx.loggedArgs = undefined;

	log.trace('foo', 36);
	assert.equal(ctx.loggedArgs, [
		'pre',
		'traceP1',
		'traceP2',
		'p1',
		'p2',
		'foo',
		36,
		's1',
		's2',
		'traceS1',
		'traceS2',
		'post',
	]);
	ctx.loggedArgs = undefined;
});

test__Logger('mutate logger state to change prefix and suffix', (ctx) => {
	const log = new Logger(undefined, undefined, {
		...ctx.loggerState,
		info: {
			prefixes: ['p1', 'p2'],
			suffixes: ['s1', 's2'],
		},
	});
	log.info('foo', 36);
	assert.equal(ctx.loggedArgs, ['pre', 'p1', 'p2', 'foo', 36, 's1', 's2', 'post']);
	ctx.loggedArgs = undefined;

	// mutate the prefixes and suffixes
	log.state.info.prefixes.pop();
	log.state.info.suffixes.shift();

	log.info('foo', 36);
	assert.equal(ctx.loggedArgs, ['pre', 'p1', 'foo', 36, 's2', 'post']);
	ctx.loggedArgs = undefined;
});

test__Logger('mutate logger state to change log level', (ctx) => {
	const state = {
		...ctx.loggerState,
		info: {prefixes: [], suffixes: []},
		warn: {prefixes: [], suffixes: []},
	};
	const log = new Logger(undefined, undefined, state);

	log.info('foo');
	assert.equal(ctx.loggedArgs, ['pre', 'foo', 'post']);
	ctx.loggedArgs = undefined;

	state.level = LogLevel.Warn;

	// `info` should now be silenced
	log.info('foo');
	assert.equal(ctx.loggedArgs, undefined);

	// `warn` is not silenced though
	log.warn('foo');
	assert.equal(ctx.loggedArgs, ['pre', 'foo', 'post']);
	ctx.loggedArgs = undefined;
});

test__Logger.run();
/* test__Logger */
