import {Bench, hrtimeNow} from 'tinybench';
import {deep_equal} from '$lib/deep_equal.js';
import {dequal} from 'dequal';
import fastDeepEqual from 'fast-deep-equal';

/* eslint-disable no-console */

// Benchmark deep_equal vs popular libraries: dequal and fast-deep-equal
// Focus: Common use cases to understand relative performance

// Enable GC if available (requires --expose-gc flag)
const gc = globalThis.gc;

const bench = new Bench({
	time: 1000, // 1000ms per benchmark for good balance of accuracy and memory usage
	now: hrtimeNow, // Use high-resolution timer for more accurate results in Node.js
});

// Add GC after each task to keep memory clean and prevent accumulation
// GC runs between tasks (after cycle completes), not during iterations
// This ensures each task starts with a clean memory state without affecting measurements
if (gc) {
	bench.addEventListener('cycle', () => {
		gc();
	});
}

// Test data
const small_obj_a = {id: 1, name: 'alice', active: true, count: 42, tags: ['a', 'b']};
const small_obj_b = {id: 1, name: 'alice', active: true, count: 42, tags: ['a', 'b']};
const small_arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const small_arr_copy = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const uint8 = new Uint8Array([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
const uint8_copy = new Uint8Array([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
const nested = {a: {b: {c: {d: {e: 'deep'}}}}};
const nested_copy = {a: {b: {c: {d: {e: 'deep'}}}}};
const date_a = new Date('2024-01-15');
const date_b = new Date('2024-01-15');

const large_obj: Record<string, number> = {};
const large_obj_copy: Record<string, number> = {};
for (let i = 0; i < 100; i++) {
	large_obj[`key_${i}`] = i;
	large_obj_copy[`key_${i}`] = i;
}

// =============================================================================
// Small object comparison
// =============================================================================

bench.add('small object: deep_equal', () => {
	deep_equal(small_obj_a, small_obj_b);
});

bench.add('small object: dequal', () => {
	dequal(small_obj_a, small_obj_b);
});

bench.add('small object: fast-deep-equal', () => {
	fastDeepEqual(small_obj_a, small_obj_b);
});

// =============================================================================
// Small array comparison
// =============================================================================

bench.add('small array: deep_equal', () => {
	deep_equal(small_arr, small_arr_copy);
});

bench.add('small array: dequal', () => {
	dequal(small_arr, small_arr_copy);
});

bench.add('small array: fast-deep-equal', () => {
	fastDeepEqual(small_arr, small_arr_copy);
});

// =============================================================================
// Typed array comparison (our optimization target!)
// =============================================================================

bench.add('typed array: deep_equal', () => {
	deep_equal(uint8, uint8_copy);
});

bench.add('typed array: dequal', () => {
	dequal(uint8, uint8_copy);
});

bench.add('typed array: fast-deep-equal', () => {
	fastDeepEqual(uint8, uint8_copy);
});

// =============================================================================
// Nested object comparison
// =============================================================================

bench.add('nested object: deep_equal', () => {
	deep_equal(nested, nested_copy);
});

bench.add('nested object: dequal', () => {
	dequal(nested, nested_copy);
});

bench.add('nested object: fast-deep-equal', () => {
	fastDeepEqual(nested, nested_copy);
});

// =============================================================================
// Date comparison (our bug fix!)
// =============================================================================

bench.add('Date: deep_equal', () => {
	deep_equal(date_a, date_b);
});

bench.add('Date: dequal', () => {
	dequal(date_a, date_b);
});

bench.add('Date: fast-deep-equal', () => {
	fastDeepEqual(date_a, date_b);
});

// =============================================================================
// Large object comparison
// =============================================================================

bench.add('large object (100 props): deep_equal', () => {
	deep_equal(large_obj, large_obj_copy);
});

bench.add('large object (100 props): dequal', () => {
	dequal(large_obj, large_obj_copy);
});

bench.add('large object (100 props): fast-deep-equal', () => {
	fastDeepEqual(large_obj, large_obj_copy);
});

// =============================================================================
// Constructor mismatch (our security fix!)
// =============================================================================

bench.add('constructor mismatch {} vs []: deep_equal', () => {
	deep_equal({}, []);
});

bench.add('constructor mismatch {} vs []: dequal', () => {
	dequal({}, []);
});

bench.add('constructor mismatch {} vs []: fast-deep-equal', () => {
	fastDeepEqual({}, []);
});

// =============================================================================
// Run and report
// =============================================================================

try {
	await bench.run();

	// Group results by test case
	const groups: Map<string, Array<any>> = new Map();
	for (const task of bench.tasks) {
		const [testCase, library] = task.name.split(': ');
		if (!groups.has(testCase!)) {
			groups.set(testCase!, []);
		}
		groups.get(testCase!)!.push({
			library,
			hz: task.result?.throughput.mean ?? 0,
			mean_ns: task.result?.latency.mean ? task.result.latency.mean * 1_000_000 : 0,
		});
	}

	console.log('\n📊 Library Comparison: deep_equal vs dequal vs fast-deep-equal\n');

	for (const [testCase, results] of groups) {
		console.log(`\n${testCase}:`);

		// Sort by speed (fastest first)
		results.sort((a, b) => b.hz - a.hz);

		const fastest = results[0];
		for (const result of results) {
			const ratio = fastest.hz / result.hz;
			const speed_marker = result === fastest ? '🏆' : '  ';
			const ops_per_sec = result.hz.toFixed(0).padStart(10);
			const relative = ratio === 1 ? 'baseline' : `${ratio.toFixed(2)}x slower`;

			console.log(
				`  ${speed_marker} ${result.library.padEnd(20)} ${ops_per_sec} ops/sec  (${relative})`,
			);
		}
	}

	console.log('\n📈 Summary:\n');

	// Overall stats per library
	const library_stats: Map<string, {total_hz: number; wins: number; count: number}> = new Map();
	for (const task of bench.tasks) {
		const library = task.name.split(': ')[1]!;
		if (!library_stats.has(library)) {
			library_stats.set(library, {total_hz: 0, wins: 0, count: 0});
		}
		const stats = library_stats.get(library)!;
		stats.total_hz += task.result?.throughput.mean ?? 0;
		stats.count++;
	}

	// Count wins
	for (const [, results] of groups) {
		const fastest = results.reduce((a, b) => (a.hz > b.hz ? a : b));
		library_stats.get(fastest.library)!.wins++;
	}

	for (const [library, stats] of library_stats) {
		const avg_hz = stats.total_hz / stats.count;
		console.log(
			`  ${library.padEnd(20)} avg: ${avg_hz.toFixed(0).padStart(10)} ops/sec  |  wins: ${stats.wins}/${groups.size}`,
		);
	}

	console.log('');
} catch (error) {
	console.error('Benchmark failed:', error);
	process.exit(1);
}
