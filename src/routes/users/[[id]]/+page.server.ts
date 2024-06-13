import { userSchema } from '$lib/users';
import { superValidate, message } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { error, fail, redirect } from '@sveltejs/kit';
import { users, userId } from '$lib/users';

const crudSchema = userSchema.extend({
	id: userSchema.shape.id.optional()
});

export const load = async ({ url, params }) => {
	// READ user
	const user = users.find((u) => u.id == params.id);

	if (params.id && !user) throw error(404, 'User not found.');

	// If user is null, default values for the schema will be returned.
	const form = await superValidate(user, zod(crudSchema));
	return { form, users };
};

export const actions = {
	default: async ({ request }) => {
		console.log('going here');
		const form = await superValidate(request, zod(crudSchema));
		if (!form.valid) return fail(400, { form });

		if (!form.data.id) {
			// CREATE user
			const user = { ...form.data, id: userId() };
			users.push(user);

			return message(form, 'User created!');
		} else {
			// UPDATE user
			const index = users.findIndex((u) => u.id == form.data.id);
			if (index == -1) throw error(404, 'User not found.');

			users[index] = { ...form.data, id: form.data.id };
			return message(form, 'User updated!');
		}

		return { form };
	}
};
