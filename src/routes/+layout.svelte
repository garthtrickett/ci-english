<script lang="ts">
	import '../app.css';

	import { QueryClientProvider } from '@tanstack/svelte-query';
	import { SvelteQueryDevtools } from '@tanstack/svelte-query-devtools';
	let { data, children } = $props();
</script>

<svelte:head>
	<link
		rel="preload"
		href="/fonts/geist/variable-woff/GeistVF.woff2"
		as="font"
		type="font/woff2"
		crossorigin=""
	/>
</svelte:head>

<QueryClientProvider client={data.queryClient}>
	<main>
		<div class="font-geist">
			{@render children()}
		</div>
	</main>
	<SvelteQueryDevtools />
</QueryClientProvider>

<style></style>
