import type {CloudflareEnv} from '../src/env';
declare module 'cloudflare:test' {
	// Controls the type of `import("cloudflare:test").env`
	interface ProvidedEnv extends CloudflareEnv {
		TEST_MIGRATIONS: D1Migration[]; // Defined in `vitest.config.mts`
	}
}
