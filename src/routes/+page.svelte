<script lang="ts">
	import {parse_package_meta} from '@ryanatkn/gro/package_meta.js';
	import Package_Summary from '@ryanatkn/fuz/Package_Summary.svelte';
	import Library_Footer from '@ryanatkn/fuz/Library_Footer.svelte';
	import Card from '@ryanatkn/fuz/Card.svelte';
	import {base} from '$app/paths';

	import {package_json, src_json} from '$routes/package.js';

	const pkg = parse_package_meta(package_json, src_json);
</script>

<main class="box mb_xl5">
	<section>
		<Package_Summary {pkg}>
			{#snippet repo_name()}<h1 class="mt_xl mb_xl">belt</h1>{/snippet}
		</Package_Summary>
	</section>
	<aside class="width_sm mb_xl5">
		⚠️ Belt's docs are a work in progress. For now see <a href="{base}/about">the about page</a> and
		<a href="https://github.com/ryanatkn/belt">source code</a>. It's all TypeScript and most
		nontrivial stuff has doc comments.
	</aside>
	<section class="box">
		<Card href="{base}/about" icon="">about</Card>
	</section>
	<section>
		<Library_Footer {pkg} />
	</section>
</main>
