<script lang="ts">
	import type { Post } from '$lib/models/types';
	import { createQuery } from '@tanstack/svelte-query';
	import { reactiveQuery } from '$lib/utils.svelte';

	import { api } from '$lib/api';

	const { data } = $props();

	let postId: number = data.videoId;
	let state = $state({ postId: postId });

	const post = createQuery<Post>(
		reactiveQuery(() => ({
			queryKey: ['post', state.postId, fetch],
			queryFn: () => api().getPostById(state.postId)
		}))
	);

	// const post = createQuery(
	// 	reactiveQueryArgs(() => ({
	// 		queryKey: ['post', state.postId, fetch],
	// 		queryFn: () => api().getPostById(state.postId)
	// 	}))
	// );

	setTimeout(() => {
		state.postId = 5;
	}, 3000);
</script>

<div>
	<div>
		<a class="button" href="/"> Back </a>
	</div>
	{#if !postId || $post.isPending}
		<span>Loading...</span>
	{/if}
	{#if $post.error}
		<span>Error: {$post.error.message}</span>
	{/if}
	{#if $post.isSuccess}
		<h1>{$post.data.title}</h1>
		<div>
			<p>{$post.data.body}</p>
		</div>
		<div>{$post.isFetching ? 'Background Updating...' : ' '}</div>
	{/if}

	<div>
		<label for="newPostId">New Post ID:</label>
		<input id="newPostId" type="number" bind:value={state.postId} />
	</div>

	{state.postId}
</div>
