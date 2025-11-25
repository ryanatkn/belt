import {z} from 'zod';

/**
 * Identifier kinds for exported symbols.
 */
export const IdentifierKind = z.enum([
	'type',
	'function',
	'variable',
	'class',
	'constructor',
	'component',
	'json',
	'css',
]);
export type IdentifierKind = z.infer<typeof IdentifierKind>;

/**
 * Generic type parameter information.
 */
export const GenericParamInfo = z.looseObject({
	/** Parameter name like `T`. */
	name: z.string(),
	/** Constraint like `string` from `T extends string`. */
	constraint: z.string().optional(),
	/** Default type like `unknown` from `T = unknown`. */
	default_type: z.string().optional(),
});
export type GenericParamInfo = z.infer<typeof GenericParamInfo>;

/**
 * Parameter information for functions and methods.
 *
 * Kept distinct from ComponentPropInfo despite structural similarity.
 * Function parameters form a tuple with positional semantics:
 * calling order matters (`fn(a, b)` vs `fn(b, a)`),
 * may include rest parameters and destructuring patterns.
 */
export const ParameterInfo = z.looseObject({
	name: z.string(),
	type: z.string(),
	optional: z.boolean(),
	description: z.string().optional(),
	default_value: z.string().optional(),
});
export type ParameterInfo = z.infer<typeof ParameterInfo>;

/**
 * Component prop information for Svelte components.
 *
 * Kept distinct from ParameterInfo despite structural similarity.
 * Component props are named attributes with different semantics:
 * no positional order when passing (`<Foo {a} {b} />` = `<Foo {b} {a} />`),
 * support two-way binding via `$bindable` rune.
 */
export const ComponentPropInfo = z.looseObject({
	name: z.string(),
	type: z.string(),
	optional: z.boolean(),
	description: z.string().optional(),
	default_value: z.string().optional(),
	bindable: z.boolean().optional(),
});
export type ComponentPropInfo = z.infer<typeof ComponentPropInfo>;

/**
 * Identifier metadata with rich TypeScript/JSDoc information.
 */
export const IdentifierJson = z.looseObject({
	name: z.string(),
	kind: IdentifierKind,
	doc_comment: z.string().optional(),
	type_signature: z.string().optional(),
	/** TypeScript modifiers like `readonly`, `private`, or `static`. */
	modifiers: z.array(z.string()).optional(),
	source_line: z.number().optional(),
	parameters: z.array(ParameterInfo).optional(),
	return_type: z.string().optional(),
	/** Function return value description from `@returns` or `@return` tag. */
	return_description: z.string().optional(),
	generic_params: z.array(GenericParamInfo).optional(),
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
		return z.array(IdentifierJson).optional();
	},
	/** Recursive: type properties. */
	get properties() {
		return z.array(IdentifierJson).optional();
	},
	props: z.array(ComponentPropInfo).optional(),
	/**
	 * Module paths (relative to src/lib) that also re-export this identifier.
	 * The identifier's canonical location is the module where it appears in `identifiers`.
	 */
	also_exported_from: z.array(z.string()).optional(),
	/**
	 * For renamed re-exports (`export {foo as bar}`), points to the original identifier.
	 * The current identifier is an alias created by the re-export.
	 */
	alias_of: z
		.object({
			module: z.string(),
			name: z.string(),
		})
		.optional(),
});
export type IdentifierJson = z.infer<typeof IdentifierJson>;

/**
 * Module information with metadata.
 */
export const ModuleJson = z.looseObject({
	/** Module path relative to src/lib. */
	path: z.string(),
	identifiers: z.array(IdentifierJson).optional(),
	module_comment: z.string().optional(),
	/** Module paths (relative to src/lib) that this module imports. */
	dependencies: z.array(z.string()).optional(),
	/** Module paths (relative to src/lib) that import this module. */
	dependents: z.array(z.string()).optional(),
});
export type ModuleJson = z.infer<typeof ModuleJson>;

/**
 * Top-level source metadata.
 *
 * @see https://github.com/ryanatkn/gro/blob/main/src/docs/gro_plugin_sveltekit_app.md#well-known-src
 */
export const SrcJson = z.looseObject({
	name: z.string(),
	version: z.string(),
	modules: z.array(ModuleJson).optional(),
});
export type SrcJson = z.infer<typeof SrcJson>;

/**
 * Format identifier name with generic parameters for display.
 * @example identifier_get_display_name({name: 'Map', kind: 'type', generic_params: [{name: 'K'}, {name: 'V'}]})
 * // => 'Map<K, V>'
 */
export const identifier_get_display_name = (identifier: IdentifierJson): string => {
	if (!identifier.generic_params?.length) return identifier.name;
	const params = identifier.generic_params.map((p) => {
		let param = p.name;
		if (p.constraint) param += ` extends ${p.constraint}`;
		if (p.default_type) param += ` = ${p.default_type}`;
		return param;
	});
	return `${identifier.name}<${params.join(', ')}>`;
};

/**
 * Generate TypeScript import statement for an identifier.
 * @example identifier_generate_import({name: 'Foo', kind: 'type'}, 'foo.ts', '@pkg/lib')
 * // => "import type {Foo} from '@pkg/lib/foo.js';"
 */
export const identifier_generate_import = (
	identifier: IdentifierJson,
	module_path: string,
	pkg_name: string,
): string => {
	const js_path = module_path.replace(/\.ts$/, '.js');
	const specifier = `${pkg_name}/${js_path}`;

	// Handle default exports by converting module name to PascalCase
	if (identifier.name === 'default') {
		const module_name = module_path.replace(/\.(js|ts|svelte)$/, '');
		const pascal_case = module_name
			.split(/[-_]/)
			.map((part) => part.charAt(0).toUpperCase() + part.slice(1))
			.join('');
		return `import ${pascal_case} from '${specifier}';`;
	}

	const import_keyword = identifier.kind === 'type' ? 'import type' : 'import';
	return `${import_keyword} {${identifier.name}} from '${specifier}';`;
};
