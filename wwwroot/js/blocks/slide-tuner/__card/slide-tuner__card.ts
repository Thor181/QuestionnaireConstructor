﻿//@ts-check

import consts from "../../../shared/constsJ.js";

export class SlideTunerCard {

    static setDataMetaId(id: number) {
        $(consts.selectors.slideTunerCardClass).find(consts.selectors.dataMetaId).attr(consts.attributes.dataMetaId, id);
    }

    static getDataMetaId() {
        return $(consts.selectors.slideTunerCardClass).find(consts.selectors.dataMetaId).attr(consts.attributes.dataMetaId);
    }
}
