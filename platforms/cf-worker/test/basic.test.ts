import {describe, it, expect} from 'vitest';
import {setupWorker} from './utils';

const worker = setupWorker({});

describe('hello world', () => {
	it('responds with "hello world"', async () => {
		const response = await worker.fetch('/');
		expect(await response.text()).toBe('hello world');
	});
});
