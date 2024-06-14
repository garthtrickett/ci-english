<script lang="ts">
	import Task from '../../lib/Task.svelte';

	function getTasks() {
		return [
			{ id: '1', text: 'Task 1', done: false },
			{ id: '2', text: 'Task 2', done: true },
			{ id: '3', text: 'Task 3', done: false }
		];
	}

	let text = $state('');
	let tasks = $state<Task[]>([]);
	let count = $derived(tasks.length);
	// Derive.by
	let doneCount = $derived.by(() => {
		return tasks.filter((it) => it.done).length;
	});

	getTasks().forEach((it) => tasks.push(it));

	$effect(() => console.log(doneCount));
	$effect(() => console.log(tasks));

	// $inspect(tasks);

	function handleToggleDone(taskId) {
		const task = tasks.find((t) => t.id === taskId);
		if (task) {
			task.done = !task.done;
			tasks = [...tasks]; // Trigger reactivity
		}
	}

	const remove = () => {
		console.log(doneCount);
	};
</script>

Here im using parent function handler rather than two way data binding so we can cause a
reassignment of parent tasks rather than just mutating it. that way the $effect( tasks ) gets
triggered. task.id is present in the each line for reactivity purposes
<section>
	<h1>{doneCount} / {count} Tasks</h1>
	{#each tasks as task (task.id)}
		<Task {task} onToggle={() => handleToggleDone(task.id)} />
	{/each}

	<footer>
		<input value={text} onchange={(ev) => (text = ev.target.value)} />
		<button>Save</button>
	</footer>
</section>
