import type {GroConfigCreator} from '@grogarden/gro';
import {exists} from '@grogarden/gro/exists.js';
import {writeFile} from 'node:fs/promises';

const ENV_CONTENTS = `PUBLIC_LOG_LEVEL=info`;

const config: GroConfigCreator = async (default_config) => {
	if (!(await exists('.env'))) {
		await writeFile('.env', ENV_CONTENTS);
	}
	return default_config;
};

export default config;
