//@ts-check

import consts from "../../../shared/consts.js";
import { GlobalMeta, QuestionData } from "../../../shared/globalMeta.js";
import ContainerControl from "../../base/ContainerControl.js";
import { SlideTunerCard } from "../__card/slide-tuner__card.js";

export default class SlideTunerItem extends ContainerControl {
    constructor() {
        super('/controls/blocks/slide-tuner/__item/slide-tuner__item.html', {});
    }
}

$(consts.selectors.slideTunerCardClass).on('change', consts.selectors.dataType, async function () {

    const card = $(this).closest(consts.selectors.slideTunerCardClass);
    const id = SlideTunerCard.getDataMetaId();
    /**@type {QuestionData}*/
    let currentDataObject = GlobalMeta.getQuestion(id);

    let controls = card.find(consts.selectors.dataType);

    for (var i in currentDataObject) {
        let control = controls.filter(`[data-title="${i}"]`);
        currentDataObject.data[i] = control.val();
    }

    GlobalMeta.addOrUpdateQuestion(currentDataObject);
    //SlideTunerCard.setDataObjectFromObject(currentDataObject);
});