import {styleText} from 'node:util';

/**
 * Re-exports Node's `styleText` util for convenience.
 * @see https://nodejs.org/docs/latest/api/util.html#utilstyletextformat-text
 * @see https://nodejs.org/docs/latest/api/util.html#modifiers
 */

// TODO maybe include all modifiers and bright variants? for now just use `styleText` directly

export const black = styleText.bind(null, 'black');
export const red = styleText.bind(null, 'red');
export const green = styleText.bind(null, 'green');
export const yellow = styleText.bind(null, 'yellow');
export const blue = styleText.bind(null, 'blue');
export const magenta = styleText.bind(null, 'magenta');
export const cyan = styleText.bind(null, 'cyan');
export const white = styleText.bind(null, 'white');
export const gray = styleText.bind(null, 'gray');

export const bg_black = styleText.bind(null, 'bgBlack');
export const bg_red = styleText.bind(null, 'bgRed');
export const bg_green = styleText.bind(null, 'bgGreen');
export const bg_yellow = styleText.bind(null, 'bgYellow');
export const bg_blue = styleText.bind(null, 'bgBlue');
export const bg_magenta = styleText.bind(null, 'bgMagenta');
export const bg_cyan = styleText.bind(null, 'bgCyan');
export const bg_white = styleText.bind(null, 'bgWhite');
export const bg_gray = styleText.bind(null, 'bgGray');

export const reset = styleText.bind(null, 'reset');
export const bold = styleText.bind(null, 'bold');
export const italic = styleText.bind(null, 'italic');
export const overlined = styleText.bind(null, 'overlined');
export const doubleunderline = styleText.bind(null, 'doubleunderline');
export const framed = styleText.bind(null, 'framed');
