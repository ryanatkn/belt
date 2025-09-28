<script lang="ts">
	import Package_Detail from '@ryanatkn/fuz/Package_Detail.svelte';
	import Docs_Footer from '@ryanatkn/fuz/Docs_Footer.svelte';
	import Community_Links_Panel from '@ryanatkn/fuz/Community_Links_Panel.svelte';
	import Breadcrumb from '@ryanatkn/fuz/Breadcrumb.svelte';

	import {package_json, src_json} from '$routes/package.js';
	import {parse_pkg} from '$lib/pkg.js';

	// TODO hacky - maybe put in context?
	const pkg = parse_pkg(package_json, src_json);
</script>

<main class="width_upto_md">
	<section>
		<header class="box">
			<h1 class="mt_xl5">{pkg.repo_name}</h1>
		</header>
		<Breadcrumb>{package_json.glyph}</Breadcrumb>
	</section>
	<section class="box width_100 mb_lg">
		<div class="panel p_md width_upto_md">
			<Package_Detail {pkg} />
		</div>
	</section>
	<Community_Links_Panel />
	<section class="box">
		<Docs_Footer {pkg} />
	</section>
	<section class="box mb_lg">
		<Breadcrumb>{package_json.glyph}</Breadcrumb>
	</section>
</main>

<style>
	main {
		display: flex;
		flex-direction: column;
		align-items: center;
		margin: 0 auto;
	}
</style>
