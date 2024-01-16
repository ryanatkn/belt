<script lang="ts">
	import '@fuz.dev/fuz/style.css';
	import '@fuz.dev/fuz/theme.css';
	import '$routes/style.css';

	import Themed from '@fuz.dev/fuz/Themed.svelte';
	import {base} from '$app/paths';
</script>

<svelte:head>
	<title>@ryanatkn/util</title>
	<link rel="icon" href="{base}/favicon.png" />
</svelte:head>

<Themed>
	<slot />
</Themed>
