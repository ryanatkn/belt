<script lang="ts">
	import PackageSummary from '@ryanatkn/fuz/PackageSummary.svelte';
	import DocsFooter from '@ryanatkn/fuz/DocsFooter.svelte';
	import Card from '@ryanatkn/fuz/Card.svelte';
	import Svg from '@ryanatkn/fuz/Svg.svelte';
	import {belt_logo} from '@ryanatkn/fuz/logos.js';
	import {resolve} from '$app/paths';
	import {pkg_context} from '@ryanatkn/fuz/pkg.svelte.js';

	const pkg = pkg_context.get();
</script>

<main class="box mb_xl5">
	<section>
		<PackageSummary {pkg}>
			{#snippet repo_name()}<h1 class="mt_xl mb_xl">belt</h1>{/snippet}
			{#snippet logo()}<div class="logo"><Svg data={belt_logo} /></div>{/snippet}
		</PackageSummary>
	</section>
	<section class="box">
		<Card href={resolve('/docs')}>docs{#snippet icon()}{pkg.package_json.glyph}{/snippet}</Card>
	</section>
	<section>
		<DocsFooter {pkg} />
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
