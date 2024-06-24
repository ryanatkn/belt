<script lang="ts">
	import Package_Detail from '@ryanatkn/fuz/Package_Detail.svelte';
	import {parse_package_meta} from '@ryanatkn/gro/package_meta.js';
	import Library_Footer from '@ryanatkn/fuz/Library_Footer.svelte';
	import Breadcrumb from '@ryanatkn/fuz/Breadcrumb.svelte';

	import {package_json, src_json} from '$routes/package.js';

	// TODO hacky - maybe put in context?
	const pkg = parse_package_meta(package_json.homepage, package_json, src_json);
</script>

<main class="width_md">
	<section>
		<header class="box">
			<h1 class="mt_xl5">{pkg.repo_name}</h1>
		</header>
		<Breadcrumb>{package_json.icon}</Breadcrumb>
	</section>
	<section class="box w_100 mb_lg">
		<div class="panel p_md width_md">
			<Package_Detail {pkg} />
		</div>
	</section>
	<section class="box">
		<Library_Footer {pkg} />
	</section>
	<section class="box mb_lg">
		<Breadcrumb>{package_json.icon}</Breadcrumb>
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
