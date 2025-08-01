import {defineConfig} from 'vite';
import {sveltekit} from '@sveltejs/kit/vite';

export default defineConfig({
	plugins: [sveltekit()],
	// TODO delete after bootstrapping the build with updated deps
	build: {
		rollupOptions: {
			external: [
				'@ryanatkn/belt/pkg.js',
				'@ryanatkn/belt/url.js',
				'@ryanatkn/belt/string.js',
				'@ryanatkn/belt/path.js',
			],
		},
	},
});
