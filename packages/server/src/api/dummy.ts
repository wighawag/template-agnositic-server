import {Hono} from 'hono';
import {ServerOptions} from '../types.js';
import {setup} from '../setup.js';
import {Env} from '../env.js';

export function getDummyAPI<CustomEnv extends Env>(
	options: ServerOptions<CustomEnv>,
) {
	const app = new Hono<{Bindings: CustomEnv}>()
		.use(setup({serverOptions: options}))
		.get('/', async (c) => {
			const config = c.get('config');
			const env = config.env;
			// const storage = config.storage;
			return c.text('hello world');
		})
		.get('/setup', async (c) => {
			return c.json({success: true});
		});

	return app;
}
