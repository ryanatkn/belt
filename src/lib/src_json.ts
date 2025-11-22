import {z} from 'zod';

/**
 * Identifier kinds for exported symbols.
 */
export const Identifier_Kind = z.enum([
	'type',
	'function',
	'variable',
	'class',
	'constructor',
	'component',
	'json',
	'css',
]);
export type Identifier_Kind = z.infer<typeof Identifier_Kind>;

/**
 * Generic type parameter information.
 */
export const Generic_Param_Info = z.looseObject({
	/** Parameter name like `T`. */
	name: z.string(),
	/** Constraint like `string` from `T extends string`. */
	constraint: z.string().optional(),
	/** Default type like `unknown` from `T = unknown`. */
	default_type: z.string().optional(),
});
export type Generic_Param_Info = z.infer<typeof Generic_Param_Info>;

/**
 * Parameter information for functions and methods.
 *
 * Kept distinct from Component_Prop_Info despite structural similarity.
 * Function parameters form a tuple with positional semantics:
 * calling order matters (`fn(a, b)` vs `fn(b, a)`),
 * may include rest parameters and destructuring patterns.
 */
export const Parameter_Info = z.looseObject({
	name: z.string(),
	type: z.string(),
	optional: z.boolean(),
	description: z.string().optional(),
	default_value: z.string().optional(),
});
export type Parameter_Info = z.infer<typeof Parameter_Info>;

/**
 * Component prop information for Svelte components.
 *
 * Kept distinct from Parameter_Info despite structural similarity.
 * Component props are named attributes with different semantics:
 * no positional order when passing (`<Foo {a} {b} />` = `<Foo {b} {a} />`),
 * support two-way binding via `$bindable` rune.
 */
export const Component_Prop_Info = z.looseObject({
	name: z.string(),
	type: z.string(),
	optional: z.boolean(),
	description: z.string().optional(),
	default_value: z.string().optional(),
	bindable: z.boolean().optional(),
});
export type Component_Prop_Info = z.infer<typeof Component_Prop_Info>;

/**
 * Identifier metadata with rich TypeScript/JSDoc information.
 */
export const Identifier_Json = z.looseObject({
	name: z.string(),
	kind: Identifier_Kind,
	doc_comment: z.string().optional(),
	type_signature: z.string().optional(),
	/** TypeScript modifiers like `readonly`, `private`, or `static`. */
	modifiers: z.array(z.string()).optional(),
	source_line: z.number().optional(),
	parameters: z.array(Parameter_Info).optional(),
	return_type: z.string().optional(),
	/** Function return value description from `@returns` or `@return` tag. */
	return_description: z.string().optional(),
	generic_params: z.array(Generic_Param_Info).optional(),
	/** Code examples from `@example` tags. */
	examples: z.array(z.string()).optional(),
	/** Deprecation warning from `@deprecated` tag. */
	deprecated_message: z.string().optional(),
	/** Related items from `@see` tags. */
	see_also: z.array(z.string()).optional(),
	/** Exceptions/errors thrown from `@throws` tags. */
	throws: z.array(z.looseObject({type: z.string().optional(), description: z.string()})).optional(),
	/** Version information from `@since` tag. */
	since: z.string().optional(),
	extends: z.array(z.string()).optional(),
	implements: z.array(z.string()).optional(),
	/** Recursive: class/interface members. */
	get members() {
		return z.array(Identifier_Json).optional();
	},
	/** Recursive: type properties. */
	get properties() {
		return z.array(Identifier_Json).optional();
	},
	props: z.array(Component_Prop_Info).optional(),
});
export type Identifier_Json = z.infer<typeof Identifier_Json>;

/**
 * Module information with metadata.
 */
export const Module_Json = z.looseObject({
	/** Module path relative to src/lib. */
	path: z.string(),
	identifiers: z.array(Identifier_Json).optional(),
	module_comment: z.string().optional(),
	/** Module paths (relative to src/lib) that this module imports. */
	dependencies: z.array(z.string()).optional(),
	/** Module paths (relative to src/lib) that import this module. */
	dependents: z.array(z.string()).optional(),
});
export type Module_Json = z.infer<typeof Module_Json>;

/**
 * Top-level source metadata.
 *
 * @see https://github.com/ryanatkn/gro/blob/main/src/docs/gro_plugin_sveltekit_app.md#well-known-src
 */
export const Src_Json = z.looseObject({
	name: z.string(),
	version: z.string(),
	modules: z.array(Module_Json).optional(),
});
export type Src_Json = z.infer<typeof Src_Json>;
