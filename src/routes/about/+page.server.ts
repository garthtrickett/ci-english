// src/routes/about/+page.server.js
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const getMessage = async () => {
		console.log('page.server.ts');
		await new Promise((resolve) => setTimeout(resolve, 3000));
		return 'hello world';
	};

	return {
		message: getMessage(),
		another_message: 'hello world sooner'
	};
};

export const actions = {
	login: async (event) => {
		const data = await event.request.formData();
		const cookies = event.cookies;
		const email = data.get('email');
		const password = data.get('password');

		console.log(email, password);
		return { success: true };
	},
	register: async (event) => {
		console.log('went here');
		return { success: true };
	}
} satisfies Actions;
