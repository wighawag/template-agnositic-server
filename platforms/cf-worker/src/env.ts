import {Env} from 'template-agnostic-server-app';

export type CloudflareEnv = Env & {
	DB: D1Database;
	LOGFLARE_API_KEY?: string;
	LOGFLARE_SOURCE?: string;
	NAMED_LOGS?: string;
	NAMED_LOGS_LEVEL?: string;
};
