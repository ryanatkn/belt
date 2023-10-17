<script lang="ts">
	import {base} from '$app/paths';
	import {parse_package_meta} from '@fuz.dev/fuz_library/package_meta.js';
	import LibraryHeader from '@fuz.dev/fuz_library/LibraryHeader.svelte';
	import LibraryFooter from '@fuz.dev/fuz_library/LibraryFooter.svelte';
	import {package_json} from '$lib/package.js';

	const pkg = parse_package_meta(package_json.homepage, package_json);
</script>

<main class="box width_full">
	<div class="box width_md">
		<section>
			<LibraryHeader {pkg} />
		</section>
		<section class="padded_md width_sm">
			<blockquote class="box">
				<div class="spaced">under construction</div>
				<a href="https://www.grogarden.org/" title="grogarden.org" class="box padded_md panel"
					><img
						class="icon"
						src="{base}/favicon.png"
						alt="a pixelated green oak acorn with a glint of sun"
					/></a
				>
			</blockquote>
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
	.icon {
		width: 80px;
		height: 80px;
	}
</style>
