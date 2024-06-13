<script>
	import '../app.css';
	let { children } = $props();
	import { Button } from '$lib/components/ui/button/index';
</script>

<div class="font-geist">
	{@render children()}
</div>

<style></style>
