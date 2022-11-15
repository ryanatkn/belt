<script lang="ts">
	import {stripStart} from '$lib/string';
	import type {Manifest} from '$lib/manifest.gen.json';

	// TODO glob import and print API?

	export let manifest: Manifest;

	const exps = manifest.exports
		.map((e) => `@feltcoop/util/${stripStart(e.file, 'lib/')}`)
		.filter(Boolean);

	$: console.log(`manifest`, manifest);
</script>

<ul>
	{#each exps as exp, i}
		<!-- TODO refactor -->
		<li class="file">
			<header class="markup">
				<code>
					<a href="https://github.com/feltcoop/util/blob/main/src/{manifest.exports[i].file}"
						>{exp.trim()}</a
					>
				</code>
			</header>
			<code class="padded-sm">
				<div class="markup"><p>import {'{'}</p></div>
				<ul class="import">
					{#each manifest.exports[i].identifiers as identifier}<li class="identifier">
							<span class="name">{identifier.name?.trim()}</span>:&nbsp;
							<span class="type">{identifier.type?.trim()}</span>
						</li>{:else}
						<span class="comment">// TODO is broken</span>{/each}
				</ul>
				<div class="markup">
					<p>
						{'}'} from '<a
							class="comment"
							href="https://github.com/feltcoop/util/blob/main/src/{manifest.exports[i].file}"
							>{exp.trim()}</a
						>'
					</p>
				</div>
			</code>
		</li>{/each}
</ul>

<style>
	.file {
		margin: var(--spacing_md) 0;
		display: flex;
		flex-direction: column;
	}
	li > code {
		width: 100%;
	}
	.import {
		padding-left: var(--spacing_xl);
		margin: var(--spacing_xl) 0;
	}
	.identifier {
		margin: var(--spacing_xs) 0;
	}
	.comment {
		color: var(--green);
	}
	header {
		align-items: flex-start;
	}
	header code {
		padding: var(--spacing_sm);
	}
</style>
