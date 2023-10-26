//@ts-check

import consts from "../../../shared/consts.js";
import ControlBuilder from "../../base/ControlBuilder.js";
import { SlideTunerCard } from "../../slide-tuner/__card/slide-tuner__card.js";
import SlideTunerItem from "../../slide-tuner/__item/slide-tuner__item.js";

$(consts.selectors.leftSidebarId).on('click', consts.selectors.sidebarItemClass, async function () {
    $(consts.selectors.slideTunerCardClass).children(consts.selectors.slideTunerItemClass).remove();

    let item = $(this);

    let obj = item.find(consts.selectors.schemeName);
    let schemeName = obj.attr(consts.attributes.dataSchemeName);
    let schemeContent = obj.text();
    let parsed = JSON.parse(schemeContent);
    for (var i in parsed) {
        let builder = new ControlBuilder(consts.paths.input_title);
        let type = consts.controlsMap[i.toLowerCase()];

        builder.addText(i, parsed[i], i);
        let control = await builder.build();

        let slideTunerItem = new SlideTunerItem();
        slideTunerItem.innerContent = control;

        $(consts.selectors.slideTunerCardClass).append(await slideTunerItem.getControl());
    }
   
    SlideTunerCard.setDataObjectFromString(schemeContent);

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