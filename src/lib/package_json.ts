import {z} from 'zod';
import {count_graphemes} from '@ryanatkn/belt/string.js';
import type {Flavored} from '@ryanatkn/belt/types.js';

// TODO @many belongs elsewhere
export const Url = z.string();
export type Url = Flavored<z.infer<typeof Url>, 'Url'>;

// TODO @many belongs elsewhere
export const Email = z.string();
export type Email = Flavored<z.infer<typeof Email>, 'Email'>;

// TODO BLOCK object helper
export const transform_empty_object_to_undefined = <T>(val: T): T | undefined => {
	if (val && Object.keys(val).length === 0) {
		return;
	}
	return val;
};

export const Package_Json_Repository = z.union([
	z.string(),
	z.looseInterface({
		type: z.string(),
		url: Url,
		directory: z.string().optional(),
	}),
]);
export type Package_Json_Repository = z.infer<typeof Package_Json_Repository>;

export const Package_Json_Author = z.union([
	z.string(),
	z.looseInterface({
		name: z.string(),
		email: Email.optional(),
		url: Url.optional(),
	}),
]);
export type Package_Json_Author = z.infer<typeof Package_Json_Author>;

export const Package_Json_Funding = z.union([
	z.string(),
	z.looseInterface({
		type: z.string(),
		url: Url,
	}),
]);
export type Package_Json_Funding = z.infer<typeof Package_Json_Funding>;

// TODO BLOCK remove recursive schema workarounds
// Helper to create a recursive type that represents export conditions and values
const create_export_value_schema = (): z.ZodType => {
	return z.lazy(() =>
		z.union([
			z.string(),
			z.null(),
			z.record(
				z.string(),
				z.lazy(() => export_value_schema),
			),
		]),
	);
};

// The base export value schema that can be a string, null, or nested conditions
const export_value_schema = create_export_value_schema();
export const Export_Value = export_value_schema;
export type Export_Value = z.infer<typeof Export_Value>;

// Package exports can be:
// 1. A string (shorthand for main export)
// 2. null (to block exports)
// 3. A record of export conditions/paths
export const Package_Json_Exports = z.union([
	z.string(),
	z.null(),
	z.record(z.string(), export_value_schema),
]);
export type Package_Json_Exports = z.infer<typeof Package_Json_Exports>;

/**
 * @see https://docs.npmjs.com/cli/v10/configuring-npm/package-json
 */
export const Package_Json = z.looseInterface({
	// according to the npm docs, `name` and `version` are the only required properties
	name: z.string(),
	version: z.string(),
	private: z
		.boolean()
		.meta({description: 'disallow publishing to the configured registry'})
		.optional(),
	public: z
		.boolean()
		.meta({
			description:
				'a Gro extension that enables publishing `.well-known/package.json` and `.well-known/src`',
		})
		.optional(),
	description: z.string().optional(),
	motto: z
		.string()
		.meta({description: "a Gro extension that's a short phrase that represents this project"})
		.optional(),
	glyph: z
		.string()
		.meta({
			description: "a Gro extension that's a single unicode character that represents this project",
		})
		.refine((v) => count_graphemes(v) === 1, 'must be a single unicode character')
		.optional(),
	logo: z
		.string()
		.meta({
			description:
				"a Gro extension that's a link relative to the `homepage` to an image that represents this project",
		})
		.optional(),
	logo_alt: z
		.string()
		.meta({description: "a Gro extension that's the alt text for the `logo`"})
		.optional(),
	license: z.string().optional(),
	scripts: z.record(z.string(), z.string()).optional(),
	homepage: Url.optional(),
	author: z.union([z.string(), Package_Json_Author.optional()]),
	repository: z.union([z.string(), Url, Package_Json_Repository]).optional(),
	contributors: z.array(z.union([z.string(), Package_Json_Author])).optional(),
	bugs: z
		.union([z.string(), z.looseInterface({url: Url.optional(), email: Email.optional()})])
		.optional(),
	funding: z
		.union([Url, Package_Json_Funding, z.array(z.union([Url, Package_Json_Funding]))])
		.optional(),
	keywords: z.array(z.string()).optional(),

	type: z.string().optional(),
	engines: z.record(z.string(), z.string()).optional(),
	os: z.array(z.string()).optional(),
	cpu: z.array(z.string()).optional(),

	dependencies: z.record(z.string(), z.string()).optional(),
	devDependencies: z.record(z.string(), z.string()).optional(),
	peerDependencies: z.record(z.string(), z.string()).optional(),
	peerDependenciesMeta: z.record(z.string(), z.interface({optional: z.boolean()})).optional(),
	optionalDependencies: z.record(z.string(), z.string()).optional(),

	bin: z.record(z.string(), z.string()).optional(),
	sideEffects: z.array(z.string()).optional(),
	files: z.array(z.string()).optional(),
	main: z.string().optional(),
	exports: Package_Json_Exports.transform(transform_empty_object_to_undefined).optional(),
});
export type Package_Json = z.infer<typeof Package_Json>;
