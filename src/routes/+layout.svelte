<script lang="ts">
	import '@ryanatkn/moss/style.css';
	import '@ryanatkn/moss/theme.css';
	import '$routes/style.css';

	import Themed from '@ryanatkn/fuz/Themed.svelte';
	import {base} from '$app/paths';
</script>

<svelte:head>
	<title>@ryanatkn/belt</title>
	<link rel="icon" href="{base}/favicon.png" />
</svelte:head>

<Themed>
	<slot />
</Themed>
