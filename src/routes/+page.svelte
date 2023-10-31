<script lang="ts">
	import {parse_package_meta} from '@fuz.dev/fuz_library/package_meta.js';
	import LibraryHeader from '@fuz.dev/fuz_library/LibraryHeader.svelte';
	import LibraryFooter from '@fuz.dev/fuz_library/LibraryFooter.svelte';
	import {base} from '$app/paths';

	import {package_json} from '$lib/package.js';
	import Favicon from '$routes/Favicon.svelte';

	const pkg = parse_package_meta(package_json.homepage, package_json);
</script>

<main class="box width_full">
	<div class="box width_md">
		<section>
			<LibraryHeader {pkg} />
		</section>
		<section class="padded_md width_sm">
			<a href="{base}/about" class="box padded_md panel"
				><div class="spaced">about</div>
				<Favicon width={80} height={80} /></a
			>
		</section>
		<section>
			<LibraryFooter {pkg} root_url="https://www.grogarden.org/" />
		</section>
	</div>
</main>

<style>
	main {
		margin-bottom: var(--spacing_5);
	}
	section {
		margin-top: var(--spacing_3);
		margin-bottom: var(--spacing_3);
		display: flex;
		flex-direction: column;
		align-items: center;
	}
</style>
