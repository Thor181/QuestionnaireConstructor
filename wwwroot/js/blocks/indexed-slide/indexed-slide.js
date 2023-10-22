//@ts-check

import { getControl } from "../base/getControl.js";


/**
 * @param {number} index
 * @param {string} title
 * @param {string} imageModifier
 */
export default async function indexed_slide(index, title, imageModifier, schemeName = '', schemeContent = '') {
    return await getControl('/controls/blocks/indexed-slide/indexed-slide.html', { index, title, imageModifier, schemeName, schemeContent });
}

