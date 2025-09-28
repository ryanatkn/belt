<script lang="ts">
	import Package_Summary from '@ryanatkn/fuz/Package_Summary.svelte';
	import Docs_Footer from '@ryanatkn/fuz/Docs_Footer.svelte';
	import Card from '@ryanatkn/fuz/Card.svelte';
	import Svg from '@ryanatkn/fuz/Svg.svelte';
	import {belt_logo} from '@ryanatkn/fuz/logos.js';
	import {resolve} from '$app/paths';

	import {package_json, src_json} from '$routes/package.js';
	import {parse_pkg} from '$lib/pkg.js';

	const pkg = parse_pkg(package_json, src_json);
</script>

<main class="box mb_xl5">
	<section>
		<Package_Summary {pkg}>
			{#snippet repo_name()}<h1 class="mt_xl mb_xl">belt</h1>{/snippet}
			{#snippet logo()}<div class="logo"><Svg data={belt_logo} /></div>{/snippet}
		</Package_Summary>
	</section>
	<aside class="width_upto_sm mb_xl5">
		⚠️ Belt's docs are a work in progress. For now see <a href={resolve('/about')}>the about page</a
		>
		and
		<a href="https://github.com/ryanatkn/belt/tree/main/src/lib">source code</a>. It's all
		TypeScript and most nontrivial stuff has doc comments.
	</aside>
	<section class="box">
		<Card href={resolve('/about')} icon="">about</Card>
	</section>
	<section>
		<Docs_Footer {pkg} />
	</section>
</main>

<style>
	.logo {
		margin: 0 auto;
		width: 256px;
		height: 256px;
	}
	/* TODO with utility classes */
	@media (min-width: 450px) {
		.logo {
			width: 400px;
			height: 400px;
		}
	}
</style>
