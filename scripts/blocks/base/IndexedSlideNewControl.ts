//@ts-check

import consts from "../../shared/constsJ.js";
import {GlobalMeta, SlideData} from "../../shared/GlobalMeta.js";
import { SlideTunerCard } from "../slide-tuner/__card/slide-tuner__card.js";
import SlideTunerItem from "../slide-tuner/__item/slide-tuner__item.js";
import BaseNewControl from "./BaseNewControl.js";
import ControlBuilder from "./ControlBuilder.js";

export default class IndexSlideNewControl extends BaseNewControl {


    constructor(index: string, title: string, imageModifier: string, metaId: string, metaOrder: string) {
        super('/controls/blocks/indexed-slide/indexed-slide.html', { index, title, imageModifier, metaId, metaOrder });
    }
}

$(consts.selectors.leftSidebarId).on('click', consts.selectors.sidebarItemClass, async function () {
    // $(consts.selectors.slideTunerCardClass).children(consts.selectors.slideTunerItemClass).remove();
    //
    // let item = $(this);
    // let dataId = Number(item.find(consts.selectors.dataMetaId).attr(consts.attributes.dataMetaId));
    // let slide = GlobalMeta.getSlide(dataId);
    // let parsedData = slide.data;
    // for (let prop in parsedData) {
    //     let type = consts.controlsMap[prop.toLowerCase()];
    //
    //     if (type == consts.types.text) {
    //         let builder = new ControlBuilder(consts.paths.input_title);
    //         builder.addText(prop, parsedData[prop], prop);
    //
    //         let control = await builder.build();
    //         let slideTunerItem = new SlideTunerItem();
    //         slideTunerItem.innerContent = control;
    //
    //         $(consts.selectors.slideTunerCardClass).append(await slideTunerItem.getControl());
    //     }
    //     else if (type == consts.types.buttons) {
    //         let buttons = Array.from(parsedData[prop]);
    //         for (var i = 0; i < buttons.length; i++) {
    //
    //             let builder = new ControlBuilder(consts.paths.input_title);
    //             let btn = buttons[i];
    //             let btnKeyNames = Object.keys(btn);
    //             let a = btn[btnKeyNames[0]];
    //             builder.addButton(a, a, a);
    //
    //
    //             let control = await builder.build();
    //             let slideTunerItem = new SlideTunerItem();
    //             slideTunerItem.innerContent = control;
    //
    //             $(consts.selectors.slideTunerCardClass).append(await slideTunerItem.getControl());
    //         }
    //     }
    // }
    //
    // SlideTunerCard.setDataMetaId(dataId);
    //
    // changeSelectedStatus(item);
});

function changeSelectedStatus(selectedObject: JQuery<any>) {
    $(consts.selectors.leftSidebarId).find(consts.selectors.sidebarItemClass).removeClass(consts.classes.sidebarItemSelected);
    selectedObject.addClass(consts.classes.sidebarItemSelected);
}

//Обновление заголовка 

$(consts.selectors.globalMeta).on(consts.events.globalMeta__questionUpdated, function (e) {
    //@ts-ignore
    const id = e.detail.questionId;
    const data: SlideData = GlobalMeta.getSlideData(id);
    $(consts.selectors.leftSidebarId).find(consts.selectors.getDataMetaId(id)).siblings(consts.selectors.slideWrapperThumbnailClass)
        .find(consts.selectors.slideWrapperThumbnailTitleClass)
        //@ts-ignore
        .text(data.data.Title);
});