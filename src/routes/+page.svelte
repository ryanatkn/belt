<script lang="ts">
	import LibrarySummary from '@ryanatkn/fuz/LibrarySummary.svelte';
	import DocsFooter from '@ryanatkn/fuz/DocsFooter.svelte';
	import Card from '@ryanatkn/fuz/Card.svelte';
	import Svg from '@ryanatkn/fuz/Svg.svelte';
	import {belt_logo} from '@ryanatkn/fuz/logos.js';
	import {resolve} from '$app/paths';
	import {library_context} from '@ryanatkn/fuz/library.svelte.js';

	const library = library_context.get();
</script>

<main class="box mb_xl5">
	<section>
		<LibrarySummary {library}>
			{#snippet repo_name()}<h1 class="mt_xl mb_xl">belt</h1>{/snippet}
			{#snippet logo()}<div class="logo"><Svg data={belt_logo} /></div>{/snippet}
		</LibrarySummary>
	</section>
	<section class="box">
		<Card href={resolve('/docs')}>docs{#snippet icon()}{library.package_json.glyph}{/snippet}</Card>
	</section>
	<section>
		<DocsFooter {library} />
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
