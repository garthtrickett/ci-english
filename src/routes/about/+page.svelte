<script lang="ts">
	import { superForm } from 'sveltekit-superforms';

	const { data } = $props();
</script>

<main class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
	{#await data.message}
		<h1>Loading Account</h1>
	{:then message}
		<h1>{message}</h1>
	{/await}

	{#await data.another_message}
		<h1>Loading Account</h1>
	{:then another_message}
		<h1>{another_message}</h1>
	{/await}

	<form method="POST" action="?/login">
		<label>
			Email
			<input name="email" type="email" />
		</label>
		<label>
			Password
			<input name="password" type="password" />
		</label>
		<button>Log in</button>
	</form>
</main>
