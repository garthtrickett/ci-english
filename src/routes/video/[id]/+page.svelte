<script lang="ts">
	import type { Post } from '$lib/models/types';
	import { createQuery } from '@tanstack/svelte-query';
	import { api } from '$lib/api';

	const { data } = $props();

	let postId: number = data.videoId;

	const post = createQuery<Post>({
		queryKey: ['post', postId, fetch],
		queryFn: () => api().getPostById(postId)
	});
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
</div>
