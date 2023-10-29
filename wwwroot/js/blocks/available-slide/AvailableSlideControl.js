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

$(consts.selectors.rightSidebarId).on('click', consts.selectors.plusButtonClass, async function (e) {

    let schemeTag = $(this).closest(consts.selectors.slideWrapperClass).find(consts.selectors.dataSchemeName);

    let schemeName = schemeTag.attr(consts.attributes.dataSchemeName);
    let schemeContent = JSON.parse(schemeTag.html());

    let order = getOrderMax();

    let qData = new QuestionData();
    qData.meta.id = generateRandomNumber();
    qData.meta.type = schemeName;
    qData.data = schemeContent;
    qData.meta.order = order + 1;

    GlobalMeta.addOrUpdateQuestion(qData)
});


