import type {GroConfigCreator, GroConfigPartial} from '@feltcoop/gro';

import {LogLevel} from '$lib/log';
import {exports} from '$lib/exports';

// TODO render this data

const config: GroConfigCreator = async ({dev}) => {
	const partial: GroConfigPartial = {
		builds: [dev ? null : {name: 'library', platform: 'node', input: exports}],
		logLevel: LogLevel.Info,
	};
	return partial;
};

export default config;
