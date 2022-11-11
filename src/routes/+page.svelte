<script lang="ts">
	import Message from '@feltcoop/felt/ui/Message.svelte';
</script>

<main class="markup column">
	<section>
		<header class="centered-hz">
			<h1>felt<small><a href="https://github.com/feltcoop">💚</a></small>util</h1>
		</header>
		<Message
			><span slot="icon">✨</span><span
				>hello, welcome to <a href="https://github.com/feltcoop/util">@feltcoop/util</a></span
			></Message
		>
	</section>
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
</style>
