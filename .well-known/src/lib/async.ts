export type Async_Status = 'initial' | 'pending' | 'success' | 'failure';

export const wait = (duration = 0): Promise<void> =>
	new Promise((resolve) => setTimeout(resolve, duration));
