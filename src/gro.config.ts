import type {GroConfigCreator, GroConfigPartial} from '@feltjs/gro';

import {LogLevel} from '$lib/log';
import {exports} from '$lib/exports';

const config: GroConfigCreator = async ({dev}) => {
	const partial: GroConfigPartial = {
		builds: [dev ? null : {name: 'library', platform: 'node', input: exports}],
		logLevel: LogLevel.Info,
	};
	return partial;
};

export default config;
