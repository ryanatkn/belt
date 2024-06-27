import {strip_end, strip_start} from '$lib/string.js';

export const format_url = (url: string): string =>
	strip_end(strip_start(strip_start(url, 'https://'), 'www.'), '/');
