//@ts-check

import consts from "../../../shared/consts.js";
import { SlideTunerCard } from "../__card/slide-tuner__card.js";

$(consts.selectors.slideTunerCardClass).on('change', consts.selectors.dataType, async function () {

    const card = $(this).closest(consts.selectors.slideTunerCardClass);

    /**@type {object}*/
    let currentDataObject = SlideTunerCard.getDataObject();

    let controls = card.find(consts.selectors.dataType);

    for (var i in currentDataObject) {
        let control = controls.filter(`[data-title="${i}"]`);
        currentDataObject[i] = control.val();
    }

    SlideTunerCard.setDataObjectFromObject(currentDataObject);
});