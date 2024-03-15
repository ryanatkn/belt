<script lang="ts">
	import {base} from '$app/paths';

	export let width = 16;
	export let height = 16;
	export let pixelated = true;
</script>

<img
	class:pixelated
	src="{base}/favicon.png"
	{width}
	{height}
	alt="the Gro icon, a {width} by {height} pixelated green oak acorn with a glint of sun"
/>
