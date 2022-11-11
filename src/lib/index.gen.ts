import type {Gen} from '@feltcoop/gro';

import {exports} from '$lib/exports';

export const gen: Gen = () => {
	return exports
		.map((e) => (e === 'lib/index.ts' ? '' : `export * from '$${e.slice(0, -3)}';`))
		.join('\n');
};
