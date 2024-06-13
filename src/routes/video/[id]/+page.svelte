<script>
	const { data } = $props();
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card';
</script>

<div>
	<h1>Video {data.id}</h1>
	<Button>Click me</Button>

	<Card.Root>
		<Card.Header>
			<Card.Title>Card Title</Card.Title>
			<Card.Description>Card Description</Card.Description>
		</Card.Header>
		<Card.Content>
			<p>Card Content</p>
		</Card.Content>
		<Card.Footer>
			<p>Card Footer</p>
		</Card.Footer>
	</Card.Root>
</div>
