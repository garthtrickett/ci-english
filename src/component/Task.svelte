<script lang="ts">
	let { task, onToggle } = $props();
</script>

<input type="checkbox" onclick={onToggle} checked={task.done} />
<h6>{task.text}</h6>
