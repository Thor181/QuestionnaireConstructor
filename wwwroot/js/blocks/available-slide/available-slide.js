//@ts-check

import { getControl } from "../base/getControl.js";


/**
 * @param {string} title
 * @param {string} imageModifier
 * @param {string} [schemeName=''] 
 * @param {string} [schemeContent=''] 
 * @param {(e) => void} onclickEvent
 */
export default async function available_slide(title, imageModifier, onclickEvent, schemeName = '', schemeContent = '') {
    let nodeId = Math.floor(Math.random() * 10000000000);
    return await getControl('/controls/blocks/available-slide/available-slide.html', { title, imageModifier, schemeName, schemeContent, onclickEvent, nodeId });
}