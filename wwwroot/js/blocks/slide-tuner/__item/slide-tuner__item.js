//@ts-check

import { getControl } from "../../base/getControl";

/**
 * @param {string} innerContent
 */
export async function slide_tuner__item(innerContent) {
    return await getControl('/controls/blocks/slide-tuner/__item/slide-tuner__item.html', { innerContent});
}