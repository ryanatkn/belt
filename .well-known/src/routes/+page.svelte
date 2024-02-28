<script lang="ts">
	import {parse_package_meta} from '@ryanatkn/gro/package_meta.js';
	import Library_Header from '@ryanatkn/fuz/Library_Header.svelte';
	import Library_Footer from '@ryanatkn/fuz/Library_Footer.svelte';
	import {base} from '$app/paths';

	import {package_json, src_json} from '$routes/package.js';
	import Favicon from '$routes/Favicon.svelte';

	const pkg = parse_package_meta(package_json.homepage, package_json, src_json);
</script>

<main class="box w_100">
	<div class="box width_md">
		<section>
			<Library_Header {pkg} />
		</section>
		<section class="p_md width_sm">
			<a href="{base}/about" class="box p_md panel"
				><div class="mb_lg">about</div>
				<Favicon width={80} height={80} /></a
			>
		</section>
		<section>
			<Library_Footer {pkg} />
		</section>
	</div>
</main>

<style>
	main {
		margin-bottom: var(--space_xl5);
	}
	section {
		margin-top: var(--space_xl3);
		margin-bottom: var(--space_xl3);
		display: flex;
		flex-direction: column;
		align-items: center;
	}
</style>
