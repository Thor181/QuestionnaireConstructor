//@ts-check

import consts from "../../shared/consts.js";
import { GlobalMeta, QuestionData } from "../../shared/globalMeta.js";
import generateRandomNumber from "../../shared/random.js";
import NodeControl from "../base/NodeControl.js";
import { getOrderMax } from "../sidebar/__container/sidebar__container.js";


export default class AvailableSlideControl extends NodeControl {

    title
    imageModifier

    constructor() {
        super('/controls/blocks/available-slide/available-slide.html');
    }
}




