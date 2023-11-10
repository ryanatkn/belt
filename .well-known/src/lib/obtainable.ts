export type Unobtain = () => void;

// TODO delete this for
// https://devblogs.microsoft.com/typescript/announcing-typescript-5-2/#using-declarations-and-explicit-resource-management

/*


This is a higher order function that tracks obtained references to a thing
and calls `teardown_obtainable_value` when all obtainers have let go of their references.

It allows decoupled consumers to use things with a lifecycle
without disrupting each other when they're done with the thing.
It can also be used to create lazily instantiated references.

The motivating use case was reusing a database connection across multiple tasks.

See the tests for usage examples - ./obtainable.test.ts

*/
/**
 * don't use
 * @see https://devblogs.microsoft.com/typescript/announcing-typescript-5-2/#using-declarations-and-explicit-resource-management
 * @deprecated
 */
export const create_obtainable = <T>(
	create_obtainable_value: () => T,
	teardown_obtainable_value?: (obtainable: T) => unknown,
): (() => [T, Unobtain]) => {
	let obtainable: T | undefined;
	const refs = new Set<symbol>();
	const unobtain = (ref: symbol): void => {
		if (!refs.has(ref)) return; // makes unobtaining idempotent per obtainer
		refs.delete(ref);
		if (refs.size > 0) return; // there are other open obtainers
		const final_value = obtainable;
		obtainable = undefined; // reset before unobtaining just in case unobtain re-obtains
		if (teardown_obtainable_value) teardown_obtainable_value(final_value!);
	};
	return () => {
		const ref = Symbol();
		refs.add(ref);
		if (obtainable === undefined) {
			obtainable = create_obtainable_value();
			if (obtainable === undefined) {
				// this prevents `obtain` from being called multiple times,
				// which would cause bugs if it has side effects
				throw Error('Obtainable value cannot be undefined - use null instead.');
			}
		}
		return [obtainable, () => unobtain(ref)];
	};
};
