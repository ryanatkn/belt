<script lang="ts">
	import {exports} from '$lib/exports';
	import {stripEnd, stripStart} from '$lib/string';

	// TODO glob import and print API?

	const exps = exports
		.map((e) => stripEnd(`@feltjs/util/${stripStart(e, 'lib/')}`, '/index.ts'))
		.filter(Boolean);
</script>

<main class="column">
	<section class="padded-md">
		<header>
			<h1 class="centered-hz">@feltjs/util</h1>
		</header>
	</section>
	<section class="padded-md centered-hz">
		<code style:margin-right="var(--spacing_md)"
			><a class="padded-md" href="https://github.com/feltjs/util">source</a></code
		>
		<code
			><a class="padded-md" href="https://www.npmjs.com/package/@feltjs/util"
				>npm i -D @feltjs/util</a
			></code
		>
	</section>
	<section class="markup padded-md">
		<aside>
			This docs website is under construction. For now please see <a
				href="https://github.com/feltjs/util">the GitHub repo</a
			>.
		</aside>
	</section>
	<section class="padded-md">
		{#each exps as exp, i}<li class="markup">
				<code class="padded-sm"
					>import {'{'}...} from '<a
						href="https://github.com/feltjs/util/blob/main/src/{exports[i]}">{exp.trim()}</a
					>'</code
				>
			</li>{/each}
	</section>
	<footer class="centered">
		<a href="https://github.com/feltjs/util" title="source code on github">🐙😺</a>
		<a href="https://github.com/feltjs">💚</a>
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
		font-size: var(--font_size_xl);
	}
	footer > *:first-child {
		font-size: var(--font_size_xl5);
	}
</style>
