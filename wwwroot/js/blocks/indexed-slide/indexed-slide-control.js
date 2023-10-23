//@ts-check

import NodeControl from "../base/NodeControl.js";

export default class IndexedSlideControl extends NodeControl {

    /**
     * @type {number}
     */
    index

    constructor() {
        super('/controls/blocks/indexed-slide/indexed-slide.html')
    }
}
