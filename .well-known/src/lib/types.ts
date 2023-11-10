/*

These are convenient global types that can be used in both Felt and user code.
It probably makes more sense to give this file a `.d.ts` extension,
but that complicates the build because TypeScript does not output them.

TODO probably make this `.d.ts` when we make a proper build process

*/

export type Omit_Strict<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

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

/*

The `Flavored` and `Branded` type helpers add varying degrees of nominal typing to other types.
This is especially useful with primitives like strings and numbers.

```ts
type PhoneNumber = Branded<string, 'PhoneNumber'>;
const phone1: PhoneNumber = 'foo'; // error!
const phone2: PhoneNumber = 'foo' as PhoneNumber; // ok
```

`Flavored` is a looser form of `Branded` that trades safety for ergonomics.
With `Flavored` you don't need to cast unflavored types:

```ts
type Email = Flavored<string, 'Email'>;
const email1: Email = 'foo'; // ok
type Address = Flavored<string, 'Address'>;
const email2: Email = 'foo' as Address; // error!
```

*/
export type Branded<T_Value, T_Name> = T_Value & Brand<T_Name>;
export type Flavored<T_Value, T_Name> = T_Value & Flavor<T_Name>;
declare const Branded_Symbol: unique symbol;
declare const Flavored_Symbol: unique symbol;
export interface Brand<T> {
	readonly [Branded_Symbol]: T;
}
export interface Flavor<T> {
	readonly [Flavored_Symbol]?: T;
}
