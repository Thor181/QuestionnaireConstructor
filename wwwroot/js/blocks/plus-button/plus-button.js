//@ts-check

import { getControl } from "../base/getControl.js";

/**
 * 
 * 
 */
export async function plus_button() {
    return await getControl('/controls/blocks/plus-button/plus-button.html');
}