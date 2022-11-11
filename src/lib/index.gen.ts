import type {Gen} from '@feltcoop/gro';

import {exports} from '$lib/exports';

export const gen: Gen = () => {
	return exports.map((e) => `export * from '$${e.slice(0, -3)}';`).join('\n');
};
