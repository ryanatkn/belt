export type AsyncStatus = 'initial' | 'pending' | 'success' | 'failure';

export const wait = (duration = 0): Promise<void> =>
	new Promise((resolve) => setTimeout(resolve, duration));
