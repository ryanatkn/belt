import type {Task} from '@feltcoop/gro';

import {exports} from '$lib/exports';

export const task: Task = {
	run: async ({fs}) => {
		console.log(`exports`, exports);
		for (const exp of exports) {
			const importPath = 'src/' + exp;
			const contents = await fs.readFile(importPath, 'utf8');
			console.log(`contents.length`, exp, contents.length);
		}
	},
};
