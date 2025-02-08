import {Context} from 'hono';
import {RemoteSQL} from 'remote-sql';
import {Env} from './env.js';

export type ServerOptions = {
	getDB: (c: Context<{Bindings: Env}>) => RemoteSQL;
	getEnv: (c: Context<{Bindings: Env}>) => Env;
};
