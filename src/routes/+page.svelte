<script lang="ts">
	import Message from '@feltcoop/felt/ui/Message.svelte';

	import {exports} from '$lib/exports';

	const exps = exports.map((e) => `$${e} `).filter(Boolean);
</script>

<main class="column">
	<section class="padded-xl">
		<header class="centered-hz">
			<h1 class="centered-hz">@feltcoop/util 🦕🐋</h1>
		</header>
	</section>
	<section class="padded-xl">
		<Message
			><a href="https://github.com/feltcoop/util" slot="icon">🐙😺</a><span
				><a href="https://www.npmjs.com/package/@feltcoop/util"><code>npm i @feltcoop/util</code></a
				></span
			></Message
		>
	</section>
	<section class="padded-xl">
		{#each exps as exp}<li>
				<a href="https://github.com/feltcoop/util/blob/main/src/{exp.substring(1)}">{exp}</a>
			</li>{/each}
	</section>
	<footer>
		<a href="https://github.com/feltcoop/util" title="source code on github">🐙😺</a>
	</footer>
</main>

<style>
	main {
		display: flex;
		flex-direction: column;
		align-items: center;
		margin: 0 auto;
	}
	h1 {
		text-align: center;
	}
	footer {
		font-size: var(--font_size_xl5);
	}
</style>
