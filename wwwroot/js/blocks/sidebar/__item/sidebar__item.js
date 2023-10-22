//@ts-check

import { getControl } from "../../base/getControl.js";

/**
 * @param {string} innerContent
 * 
 */
export default async function sidebar__item(innerContent) {
    
    return await getControl('/controls/blocks/sidebar/__item/sidebar__item.html', { innerContent });
}
