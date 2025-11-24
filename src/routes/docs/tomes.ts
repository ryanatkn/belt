import type {Tome} from '@ryanatkn/fuz/tome.js';
import Api_Page from '$routes/docs/api/+page.svelte';
import Package_Page from '$routes/docs/package/+page.svelte';

export const tomes: Array<Tome> = [
	{
		name: 'api',
		category: 'reference',
		component: Api_Page,
		related_tomes: [],
		related_modules: [],
		related_identifiers: [],
	},
	{
		name: 'package',
		category: 'reference',
		component: Package_Page,
		related_tomes: [],
		related_modules: [],
		related_identifiers: [],
	},
];
