export interface Storage {
	setup(): Promise<void>;
	reset(): Promise<void>;
}
