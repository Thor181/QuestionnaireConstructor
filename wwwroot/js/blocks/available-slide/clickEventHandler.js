//@ts-check

import consts from "../../shared/consts.js";
import { GlobalMeta } from "../../shared/globalMeta.js";
import IndexedSlideControl from "../indexed-slide/indexed-slide-control.js";
import SidebarItemControl from "../sidebar/__item/sidebar__item-control.js";
import AvailableSlideControl from "./available-slide-control.js";

$(consts.selectors.rightSidebarId).on('click', consts.selectors.plusButtonClass, async function (e) {

    /**
     * @type {AvailableSlideControl}
    */
    let availableSlideControl = JSON.parse($(this).closest(consts.selectors.slideWrapperClass).find(consts.selectors.dataObject).html());

    let indexedSlide = new IndexedSlideControl();

    indexedSlide.title = availableSlideControl.title;
    indexedSlide.imageModifier = availableSlideControl.imageModifier;
    indexedSlide.schemeContent = availableSlideControl.schemeContent;
    indexedSlide.schemeName = availableSlideControl.schemeName;
    indexedSlide.index = 0;

    let item = new SidebarItemControl();
    item.innerContent = await indexedSlide.getControl();

    $(consts.selectors.leftSidebarId).append(await item.getControl());

    GlobalMeta.addQuestion(availableSlideControl.schemeContent)
});
