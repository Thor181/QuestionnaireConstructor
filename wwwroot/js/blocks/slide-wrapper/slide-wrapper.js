//@ts-check

import { getControl } from "../base/getControl.js";

/**
 * @param {number} index
 * @param {string} title
 */
export async function slide_wrapper(index, title) {
    return await getControl('/controls/blocks/index.html', {index, title})
};