<script lang="ts">
	import '@feltjs/felt-ui/style.css';
	import '$routes/style.css';
	import {base} from '$app/paths';
</script>

<svelte:head>
	<title>@feltjs/util</title>
	<link rel="icon" href="{base}/favicon.png" />
</svelte:head>

<slot />
