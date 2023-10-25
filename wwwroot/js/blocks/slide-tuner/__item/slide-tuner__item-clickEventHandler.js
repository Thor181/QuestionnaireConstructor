//@ts-check

import consts from "../../../shared/consts.js";
import ControlBuilder from "../../base/ControlBuilder.js";
import SlideTunerItem from "./slide-tuner__item.js";

$(consts.selectors.leftSidebarId).on('click', consts.selectors.sidebarItemClass, async function () {
    $(consts.selectors.slideTunerCardClass).children().remove();

    let obj = $(this).find(consts.selectors.schemeName);
    let schemeName = obj.attr(consts.attributes.dataSchemeName);
    let schemeContent = obj.text();

    let parsed = JSON.parse(schemeContent);
    for (var i in parsed) {
        let builder = new ControlBuilder(consts.paths.input_title);
        let type = consts.controlsMap[i.toLowerCase()];

        builder.addText(i, parsed[i])
        let control = await builder.build();

        let slideTunerItem = new SlideTunerItem();
        slideTunerItem.innerContent = control;

        $(consts.selectors.slideTunerCardClass).append(await slideTunerItem.getControl());

    }

    $(consts.selectors.slideTunerCardClass).attr(consts.attributes.dataObject, JSON.stringify(schemeContent))
});