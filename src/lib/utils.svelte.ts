import { readable } from 'svelte/store';

export function reactiveQuery(cb) {
	return readable(cb(), (set) => {
		const dispose = $effect.root(() => {
			$effect.pre(() => {
				set(cb());
			});
		});
		return () => dispose();
	});
}
