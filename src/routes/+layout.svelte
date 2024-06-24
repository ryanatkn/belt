<script lang="ts">
	import '@ryanatkn/moss/style.css';
	import '@ryanatkn/moss/theme.css';
	import '$routes/style.css';

	import Themed from '@ryanatkn/fuz/Themed.svelte';
	import {base} from '$app/paths';
	import type {Snippet} from 'svelte';

	interface Props {
		children: Snippet;
	}

	const {children}: Props = $props();
</script>

<svelte:head>
	<title>@ryanatkn/belt</title>
	<link rel="icon" href="{base}/favicon.png" />
</svelte:head>

<Themed>
	{@render children()}
</Themed>
