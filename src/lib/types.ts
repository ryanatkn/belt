/*

These are convenient global types that can be used in both Felt and user code.
It probably makes more sense to give this file a `.d.ts` extension,
but that complicates the build because TypeScript does not output them.

TODO probably make this `.d.ts` when we make a proper build process

*/

export type Class_Constructor<T_Instance, T_Args extends any[] = any[]> = new (
	...args: T_Args
) => T_Instance;

export type Omit_Strict<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

/**
 * Like `Pick` but works for type unions.
 *
 * @see https://stackoverflow.com/questions/75271774/creating-a-type-using-pick-with-a-type-that-is-defined-as-a-union-of-types
 * @see https://stackoverflow.com/users/5770132/oblosys
 */
export type Pick_Union<T, K extends Keyof_Union<T>> = T extends unknown
	? K & keyof T extends never
		? never
		: Pick<T, K & keyof T>
	: never;

/**
 * Like `keyof` but works for type unions.
 *
 * @see https://stackoverflow.com/questions/75271774/creating-a-type-using-pick-with-a-type-that-is-defined-as-a-union-of-types
 * @see https://stackoverflow.com/users/5770132/oblosys
 */
export type Keyof_Union<T> = T extends unknown ? keyof T : never;

// these were thrown together quickly - is there a better way to do this?
// there are probably better names for them!
// see `Required`, `Exclude` and `Extract` for possible leads for improvements
export type Partial_Except<T, K extends keyof T> = {[P in K]: T[P]} & {
	[P in Exclude<keyof T, K>]?: T[P];
};
export type Partial_Only<T, K extends keyof T> = {[P in K]?: T[P]} & {
	[P in Exclude<keyof T, K>]: T[P];
};

export type Partial_Values<T> = {
	[P in keyof T]: Partial<T[P]>;
};

export type Assignable<T, K extends keyof T = keyof T> = {
	-readonly [P in K]: T[P];
};

export type Defined<T> = T extends undefined ? never : T;
export type Not_Null<T> = T extends null ? never : T;

export type Array_Element<T> = T extends ReadonlyArray<infer U> ? U : never;

/**
 * The `Flavored` and `Branded` type helpers add varying degrees of nominal typing to other types.
 * This is especially useful with primitives like strings and numbers.
 *
 * @see https://spin.atomicobject.com/typescript-flexible-nominal-typing/
 *
 * `Flavored` is a looser form of `Branded` that trades
 * explicitness and a little safety in some cases for ergonomics.
 * With `Flavored` you don't need to cast unflavored types:
 *
 * ```ts
 * type Email = Flavored<string, 'Email'>;
 * const email1: Email = 'foo'; // ok
 * type Address = Flavored<string, 'Address'>;
 * const email2: Email = 'foo' as Address; // error!
 * ```
 *
 * `Branded` requires casting:
 *
 * ```ts
 * type PhoneNumber = Branded<string, 'PhoneNumber'>;
 * const phone1: PhoneNumber = 'foo'; // error!
 * const phone2: PhoneNumber = 'foo' as PhoneNumber; // ok
 * ```
 *
 * See also Zod's `.brand` schema helper:
 *
 * @see https://github.com/colinhacks/zod#brand
 *
 */
export type Flavored<T_Value, T_Name> = T_Value & Flavor<T_Name>;
declare const Flavored_Symbol: unique symbol;
export interface Flavor<T> {
	readonly [Flavored_Symbol]?: T;
}
export type Branded<T_Value, T_Name> = T_Value & Brand<T_Name>;
declare const Branded_Symbol: unique symbol;
export interface Brand<T> {
	readonly [Branded_Symbol]: T;
}
