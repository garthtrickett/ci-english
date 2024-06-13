import { Elysia, t } from 'elysia';

const getAccount = () => {
	return 'garth';
};

const getStatus = () => {
	return 'available';
};

const app = new Elysia()
	.get('/api/status', getStatus())
	.get('/api/account', getAccount())
	.compile();

type RequestHandler = (v: { request: Request }) => Response | Promise<Response>;

export const GET: RequestHandler = ({ request }) => app.handle(request);
export const POST: RequestHandler = ({ request }) => app.handle(request);

export type App = typeof app;
