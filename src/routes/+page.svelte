<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Card from '$lib/components//ui/card/index.js';
	import Posts from '$lib/Posts.svelte';

	const { data } = $props();
</script>

<main class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
	<h1 class="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
		Taxing Laughter: The Joke Tax Chronicles
	</h1>
	{#await data.account}
		<h1>Loading Account</h1>
	{:then accountData}
		<h1>Name: {accountData}</h1>
	{/await}

	{#await data.status}
		<h1>Loading Status</h1>
	{:then accountStatus}
		<h1>Status: {accountStatus}</h1>
	{/await}
	TODO: can we skip page.ts and just have a page.server.ts and page.svelte that works good on intial
	load and coming from another page
	<br />TODO: compare eden mutation to page.server mutation

	<br />
	<br />

	<h1>Basic Query with SSR</h1>
	<Posts />
</main>
