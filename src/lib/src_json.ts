import {z} from 'zod';

import {transform_empty_object_to_undefined} from './package_json.js';

export const Src_Module_Declaration = z.looseInterface({
	name: z.string(), // the export identifier
	// TODO these are poorly named, and they're somewhat redundant with `kind`,
	// they were added to distinguish `VariableDeclaration` functions and non-functions
	kind: z.enum(['type', 'function', 'variable', 'class']).nullable(),
	// code: z.string(), // TODO experiment with `getType().getText()`, some of them return the same as `name`
});
export type Src_Module_Declaration = z.infer<typeof Src_Module_Declaration>;

export const Src_Module = z.looseInterface({
	path: z.string(),
	declarations: z.array(Src_Module_Declaration),
});
export type Src_Module = z.infer<typeof Src_Module>;

export const Src_Modules = z.record(z.string(), Src_Module);
export type Src_Modules = z.infer<typeof Src_Modules>;

/**
 * @see https://github.com/ryanatkn/gro/blob/main/src/docs/gro_plugin_sveltekit_app.md#well-known-src
 */
export const Src_Json = z.looseInterface({
	name: z.string(), // same as Package_Json
	version: z.string(), // same as Package_Json
	modules: Src_Modules.transform(transform_empty_object_to_undefined).optional(),
});
export type Src_Json = z.infer<typeof Src_Json>;
