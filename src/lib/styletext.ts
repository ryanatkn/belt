import {styleText} from 'node:util';

/**
 * Re-exports Node's `styleText` util for convenience.
 */

// TODO consider bright variants? any others?

export const black = styleText.bind(null, 'black');
export const red = styleText.bind(null, 'red');
export const green = styleText.bind(null, 'green');
export const yellow = styleText.bind(null, 'yellow');
export const blue = styleText.bind(null, 'blue');
export const magenta = styleText.bind(null, 'magenta');
export const cyan = styleText.bind(null, 'cyan');
export const white = styleText.bind(null, 'white');
export const gray = styleText.bind(null, 'gray');
export const black_bold = styleText.bind(null, ['black', 'bold']);
export const red_bold = styleText.bind(null, ['red', 'bold']);
export const green_bold = styleText.bind(null, ['green', 'bold']);
export const yellow_bold = styleText.bind(null, ['yellow', 'bold']);
export const blue_bold = styleText.bind(null, ['blue', 'bold']);
export const magenta_bold = styleText.bind(null, ['magenta', 'bold']);
export const cyan_bold = styleText.bind(null, ['cyan', 'bold']);
export const white_bold = styleText.bind(null, ['white', 'bold']);
export const gray_bold = styleText.bind(null, ['gray', 'bold']);
export const bg_black = styleText.bind(null, 'bgBlack');
export const bg_red = styleText.bind(null, 'bgRed');
export const bg_green = styleText.bind(null, 'bgGreen');
export const bg_yellow = styleText.bind(null, 'bgYellow');
export const bg_blue = styleText.bind(null, 'bgBlue');
export const bg_magenta = styleText.bind(null, 'bgMagenta');
export const bg_cyan = styleText.bind(null, 'bgCyan');
export const bg_white = styleText.bind(null, 'bgWhite');
export const bg_gray = styleText.bind(null, 'bgGray');
