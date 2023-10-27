//@ts-check

import consts from "../../shared/consts.js";
import { GlobalMeta } from "../../shared/globalMeta.js";
import { SlideTunerCard } from "../slide-tuner/__card/slide-tuner__card.js";
import SlideTunerItem from "../slide-tuner/__item/slide-tuner__item.js";
import BaseNewControl from "./BaseNewControl.js";
import ControlBuilder from "./ControlBuilder.js";

export default class IndexSlideNewControl extends BaseNewControl {

    /**
     * @param {number} index
     * @param {string} title
     * @param {string} imageModifier
     * @param {number} metaId
     */
    constructor(index, title, imageModifier, metaId) {
        super('/controls/blocks/indexed-slide/indexed-slide.html', { index, title, imageModifier, metaId });
    }
}

$(consts.selectors.leftSidebarId).on('click', consts.selectors.sidebarItemClass, async function () {
    $(consts.selectors.slideTunerCardClass).children(consts.selectors.slideTunerItemClass).remove();

    let item = $(this);
    let dataId = item.find(consts.selectors.dataMetaId).attr(consts.attributes.dataMetaId);
    let question = GlobalMeta.getQuestion(dataId);
    let parsed = question.data;
    for (var i in parsed) {
        let builder = new ControlBuilder(consts.paths.input_title);
        let type = consts.controlsMap[i.toLowerCase()];

        builder.addText(i, parsed[i], i);
        let control = await builder.build();

        let slideTunerItem = new SlideTunerItem();
        slideTunerItem.innerContent = control;

        $(consts.selectors.slideTunerCardClass).append(await slideTunerItem.getControl());
    }

    SlideTunerCard.setDataMetaId(dataId);

    changeSelectedStatus(item);
});

/**
 * 
 * @param {JQuery<any>} selectedObject
 */
function changeSelectedStatus(selectedObject) {
    $(consts.selectors.leftSidebarId).find(consts.selectors.sidebarItemClass).removeClass(consts.classes.sidebarItemSelected);
    selectedObject.addClass(consts.classes.sidebarItemSelected);
}