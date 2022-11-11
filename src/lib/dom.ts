export const isEditable = (el: any): boolean =>
	!!el &&
	(el.tagName === 'INPUT'
		? el.type !== 'checkbox' && el.type !== 'radio' && el.type !== 'range'
		: el.tagName === 'TEXTAREA' || el.contentEditable === 'true');

/**
 * Stops an event from bubbling and doing default behavior.
 * @param event
 * @param immediate Defaults to `true` to use `stopImmediatePropagation` over `stopPropagation`.
 * @param preventDefault Defaults to `true`.
 * @returns
 */
export const swallow = <T extends Event>(event: T, immediate = true, preventDefault = true): T => {
	if (preventDefault) event.preventDefault();
	if (immediate) {
		event.stopImmediatePropagation();
	} else {
		event.stopPropagation();
	}
	return event;
};
