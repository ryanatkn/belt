import type {GroConfigCreator} from '@feltjs/gro';
import {exists} from '@feltjs/gro/util/exists.js';
import {writeFile} from 'node:fs/promises';

const ENV_CONTENTS = `PUBLIC_LOG_LEVEL=info`;

const config: GroConfigCreator = async (default_config) => {
	console.log('CONFIG');
	if (!(await exists('.env'))) {
		await writeFile('.env', ENV_CONTENTS);
	}
	return default_config;
};

export default config;
