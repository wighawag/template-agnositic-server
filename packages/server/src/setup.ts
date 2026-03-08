import {MiddlewareHandler} from 'hono/types';
import {ServerOptions} from './types.js';
import {Env} from './env.js';
// import {RemoteSQLStorage} from './storage/RemoteSQLStorage.js';

export type SetupOptions<CustomEnv extends Env> = {
	serverOptions: ServerOptions<CustomEnv>;
};

export type Config<CustomEnv extends Env> = {
	// storage: RemoteSQLStorage;
	env: CustomEnv;
};

declare module 'hono' {
	interface ContextVariableMap {
		config: Config<Env>;
	}
}

export function setup<CustomEnv extends Env>(
	options: SetupOptions<CustomEnv>,
): MiddlewareHandler {
	const {getDB, getEnv} = options.serverOptions;

	return async (c, next) => {
		const env = getEnv(c);

		const db = getDB(c);
		// const storage = new RemoteSQLStorage(db);

		c.set('config', {
			// storage,
			env,
		});

		// // auto setup
		// if (c.req.query('_initDB') == 'true') {
		// 	await storage.setup();
		// }

		return next();
	};
}
