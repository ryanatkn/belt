<script lang="ts">
	import '@ryanatkn/moss/style.css';
	import '@ryanatkn/moss/theme.css';
	import '$routes/moss.css';
	import '$routes/style.css';

	import Themed from '@ryanatkn/fuz/Themed.svelte';
	import {Library, library_context} from '@ryanatkn/fuz/library.svelte.js';
	import type {Snippet} from 'svelte';

	import {library_json} from '$routes/library.js';

	interface Props {
		children: Snippet;
	}

	const {children}: Props = $props();

	library_context.set(new Library(library_json));
</script>

<svelte:head>
	<title>@ryanatkn/belt</title>
</svelte:head>

<Themed>
	{@render children()}
</Themed>
