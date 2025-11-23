import type {Create_Gro_Config} from '@ryanatkn/gro/gro_config.js';
import {gro_plugin_sveltekit_library} from '@ryanatkn/gro/gro_plugin_sveltekit_library.js';
import {gro_plugin_gen} from '@ryanatkn/gro/gro_plugin_gen.js';

// Skip the SvelteKit app plugin to break circular dependency during builds
const config: Create_Gro_Config = (cfg) => {
	cfg.plugins = () => [gro_plugin_gen(), gro_plugin_sveltekit_library()];
	return cfg;
};

export default config;
