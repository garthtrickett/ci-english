import { treaty } from '@elysiajs/eden';
import type { App } from './api/[...slugs]/+server';
import type { Load } from '@sveltejs/kit';

const client = treaty<App>('localhost:5173');

export const load: Load = async () => {
	const getAccount = async () => {
		try {
			// await new Promise((resolve) => setTimeout(resolve, 3000));
			const response = await client.api.account.get();
			const data = response.data; // Store the data in the variable
			return data;
		} catch (error) {
			console.error('Error fetching account:', error);
		}
	};

	const getStatus = async () => {
		try {
			const response = await client.api.status.get();
			const data = response.data; // Store the data in the variable
			return data;
		} catch (error) {
			console.error('Error fetching status:', error);
		}
	};

	// TODO move these awaits into the page.svelte. test with the slow fast things in dudes example
	return {
		account: getAccount(),
		status: getStatus()
	};
};
