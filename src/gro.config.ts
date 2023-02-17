import type {GroConfigCreator, GroConfigPartial} from '@feltjs/gro';

import {exports} from '$lib/exports';

const config: GroConfigCreator = async ({dev}) => {
	const partial: GroConfigPartial = {
		builds: [dev ? null : {name: 'library', platform: 'node', input: exports}],
	};
	return partial;
};

export default config;
