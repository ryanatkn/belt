export const is_editable = (el: any): boolean => {
	if (!el) return false;
	const {tagName} = el;
	if (tagName === 'INPUT') {
		const {type} = el;
		return (
			type === 'text' ||
			type === 'number' ||
			type === 'password' ||
			type === 'email' ||
			type === 'search' ||
			type === 'url'
		);
	}
	return (
		tagName === 'TEXTAREA' ||
		(!!el.getAttribute?.('contenteditable') && el.getAttribute('contenteditable') !== 'false')
	);
};

export const inside_editable = (el: HTMLElement | SVGElement): boolean => {
	const found = el.closest('[contenteditable]');
	return found !== null && found.getAttribute('contenteditable') !== 'false';
};

/**
 * Stops an event from bubbling and doing default behavior.
 * @param event
 * @param immediate Defaults to `true` to use `stopImmediatePropagation` over `stopPropagation`.
 * @param preventDefault Defaults to `true`.
 * @returns
 */
export const swallow = <
	T extends Pick<Event, 'preventDefault' | 'stopPropagation' | 'stopImmediatePropagation'>,
>(
	event: T,
	immediate = true,
	preventDefault = true,
): T => {
	if (preventDefault) event.preventDefault();
	if (immediate) {
		event.stopImmediatePropagation();
	} else {
		event.stopPropagation();
	}
	return event;
};

// TODO improve these types, the motivation was the strictness of Svelte DOM types
export const handle_target_value =
	(cb: (value: any, event: any) => void, swallow_event = true) =>
	(e: any): void => {
		if (swallow_event) swallow(e);
		cb(e.target.value, e);
	};

/**
 * Returns a boolean indicating if the current browser window, if any, is iframed inside of another.
 */
export const is_iframed = (): boolean => {
	if (typeof window === 'undefined') return false;
	try {
		return window.self !== window.top; // some browsers may throw here due to the same origin policy
	} catch (err) {
		return false;
	}
};
