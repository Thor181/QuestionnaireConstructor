//@ts-check

import consts from "../../shared/consts.js";
import { GlobalMeta } from "../../shared/globalMeta.js";
import ControlBuilder from "../base/ControlBuilder.js";
import NodeControl from "../base/NodeControl.js";
import { SlideTunerCard } from "../slide-tuner/__card/slide-tuner__card.js";
import SlideTunerItem from "../slide-tuner/__item/slide-tuner__item.js";

export default class IndexedSlideControl extends NodeControl {

    /**
     * @type {number}
     */
    index

    constructor() {
        super('/controls/blocks/indexed-slide/indexed-slide.html')
    }
}

