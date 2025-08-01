import {z} from 'zod';

import {strip_end, strip_start} from '$lib/string.js';
import type {Flavored} from '$lib/types.js';

/**
 * Formats a URL by removing 'https://', 'www.', and trailing slashes.
 * Notably it does not remove 'http://', so the user can see that it's insecure.
 */
export const format_url = (url: string): string =>
	strip_end(strip_start(strip_start(url, 'https://'), 'www.'), '/');

// TODO @many belongs elsewhere
export const Url = z.string();
export type Url = Flavored<z.infer<typeof Url>, 'Url'>;
