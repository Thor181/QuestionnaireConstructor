//@ts-check

import { getControl } from "../base/getControl.js";

export async function slide_wrapper(index: number, title: string) {
    return await getControl('/controls/blocks/index.html', {index, title})
};