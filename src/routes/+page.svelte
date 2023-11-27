<script lang="ts">
	import {parse_package_meta} from '@fuz.dev/fuz_library/package_meta.js';
	import Library_Header from '@fuz.dev/fuz_library/Library_Header.svelte';
	import Library_Footer from '@fuz.dev/fuz_library/Library_Footer.svelte';
	import {base} from '$app/paths';

	import {package_json, src_json} from '$routes/package.js';
	import Favicon from '$routes/Favicon.svelte';

	const pkg = parse_package_meta(package_json.homepage, package_json, src_json);
</script>

<main class="box width_full">
	<div class="box width_md">
		<section>
			<Library_Header {pkg} />
		</section>
		<section class="padded_md width_sm">
			<a href="{base}/about" class="box padded_md panel"
				><div class="spaced">about</div>
				<Favicon width={80} height={80} /></a
			>
		</section>
		<section>
			<Library_Footer {pkg} root_url="https://www.grogarden.org/" />
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
