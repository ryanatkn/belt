<script lang="ts">
	import '@feltjs/felt-ui/style.css';
	import '@feltjs/felt-ui/theme.css';
	import '$routes/style.css';

	import Themed from '@feltjs/felt-ui/Themed.svelte';
	import {base} from '$app/paths';
</script>

<svelte:head>
	<title>@grogarden/util</title>
	<link rel="icon" href="{base}/favicon.png" />
</svelte:head>

<Themed>
	<slot />
</Themed>
