import {MiddlewareHandler} from 'hono/types';
import {ServerOptions} from './types.js';
import {Env} from './env.js';
// import {RemoteSQLStorage} from './storage/RemoteSQLStorage.js';

export type SetupOptions = {
	serverOptions: ServerOptions;
};

export type Config = {
	// storage: RemoteSQLStorage;
	env: Env;
};

declare module 'hono' {
	interface ContextVariableMap {
		config: Config;
	}
}

export function setup(options: SetupOptions): MiddlewareHandler {
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
