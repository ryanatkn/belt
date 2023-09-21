<script lang="ts">
	// import {exports} from '$lib/exports';
	// import {stripEnd, stripStart} from '$lib/string';

	// TODO glob import and print API?

	// const exps = exports
	// 	.map((e) => stripEnd(`@grogarden/util/${stripStart(e, 'lib/')}`, '/index.ts'))
	// 	.filter(Boolean);
</script>

<main class="box width_md">
	<section class="padded_md">
		<header>
			<h1 class="row">@grogarden/util</h1>
		</header>
	</section>
	<section class="box padded_md">
		<blockquote style:padding="0" class="spaced">
			<a class="padded_md" href="https://github.com/grogarden/util">source on GitHub</a>
		</blockquote>
		<code
			><a class="padded_md" href="https://www.npmjs.com/package/@grogarden/util"
				>npm i -D @grogarden/util</a
			></code
		>
	</section>
	<section class="prose padded_md width_sm">
		<aside>
			This docs website is under construction. For now please see <a
				href="https://github.com/grogarden/util">the GitHub repo</a
			>.
		</aside>
	</section>
	<section class="padded_md">
		coming soon
		<!-- {#each exps as exp, i}<li class="prose">
				<code class="padded_sm"
					>import {'{'}...} from '<a
						href="https://github.com/grogarden/util/blob/main/src/{exports[i]}">{exp.trim()}</a
					>'</code
				>
			</li>{/each} -->
	</section>
	<footer class="box padded_md spaced">
		<a href="https://github.com/grogarden/util" title="source code on github">source</a>
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
