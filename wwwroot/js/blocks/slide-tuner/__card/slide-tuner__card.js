//@ts-check

import consts from "../../../shared/consts.js";

export class SlideTunerCard {

    /**
     * 
     * @param {string} data
     */
    static setDataObjectFromString(data) {
        //let json = JSON.stringify(data);
        $(consts.selectors.slideTunerCardClass).find(consts.selectors.dataObject).text(data);
    }

    /**
     * 
     * @param {object} object
     */
    static setDataObjectFromObject(object) {
        let json = JSON.stringify(object);
        $(consts.selectors.slideTunerCardClass).find(consts.selectors.dataObject).text(json);
    }

    static getDataObject() {
        let json = $(consts.selectors.slideTunerCardClass).find(consts.selectors.dataObject).text();
        return JSON.parse(json);
    }
}

