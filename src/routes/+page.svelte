<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Card from '$lib/components//ui/card/index.js';

	import { useQueryClient, createQuery } from '@tanstack/svelte-query';
	import { api } from '$lib/api';

	const client = useQueryClient();

	let limit = 10;
	const posts = createQuery<{ id: number; title: string; body: string }[], Error>({
		queryKey: ['posts', limit, fetch],
		queryFn: () => api(fetch).getPosts(limit)
	});

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
	<br />
	TODO: Try out tanstack svelte query's mutation, infinite scroll and anything else interesting in the
	docs

	<br />
	<br />

	<h1>Basic Query with SSR</h1>
	<div>
		{#if $posts.status === 'pending'}
			<span>Loading...</span>
		{:else if $posts.status === 'error'}
			<span>Error: {$posts.error.message}</span>
		{:else}
			<ul>
				{#each $posts.data as post}
					<article>
						<a
							href={`/${post.id}`}
							style={// We can use the queryCache here to show bold links for
							// ones that are cached
							client.getQueryData(['post', post.id])
								? 'font-weight: bold; color: indianred'
								: 'cursor: pointer'}
						>
							{post.title}
						</a>
					</article>
				{/each}
			</ul>
			{#if $posts.isFetching}
				<div style="color:darkgreen; font-weight:700">Background Updating...</div>
			{/if}
		{/if}
	</div>
</main>
