import {defineConfig} from 'vite';
import {sveltekit} from '@sveltejs/kit/vite';

export default defineConfig({
	plugins: [sveltekit()],
	// TODO delete if no longer needed to bootstrap the build
	build: {
		rollupOptions: {
			external: ['@ryanatkn/belt/pkg.js'],
		},
	},
});
