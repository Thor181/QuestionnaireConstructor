//@ts-check

import consts from "../../../shared/constsJ.js";
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
    let currentDataObject = GlobalMeta.getSlide(id);

    let controls = card.find(consts.selectors.dataType);

    for (var i in currentDataObject.data) {

        if (i.toLowerCase() == consts.types.buttons) {
            let buttons = Array.from(currentDataObject.data[i]);

            for (var btn = 0; btn < buttons.length; btn++) {
                let keys = Object.keys(buttons[btn]);

                let control = controls.filter(`[data-title='Button \"${buttons[btn][keys[0]]}\"']`);
                currentDataObject.data[i] = control.val();
            }
        }
        else {
            let control = controls.filter(`[data-title="${i}"]`);
            currentDataObject.data[i] = control.val();
        }
    }

    GlobalMeta.updateQuestion(currentDataObject);
});