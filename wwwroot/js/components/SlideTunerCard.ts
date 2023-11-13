import { GlobalMeta } from '../shared/GlobalMeta.js';
import * as consts from '../shared/constants.js';
import BaseComponent from './Base/BaseComponent.js';
import { LeftSidebarContainer } from './LeftSidebarContainer.js';
import TextInputInterpretated from './TextInputInterpretated.js';

const slideTunerCardSelector: consts.selector = '.slide-tuner__card';
const slideTunerCardItemSelector: consts.selector = '.slide-tuner__item';
const textInputSelector: consts.selector = '.text-input-wrap';
const dataMetaIdSelector: consts.selector = '[data-meta-id]'
const dataMetaIdAttr: consts.attribute = 'data-meta-id';
const removebtnType: consts.componentType = 'removebtn';

class SlideTunerCard extends BaseComponent {

    static getDataMetaId(): number {
        const id = Number($(slideTunerCardSelector).find(dataMetaIdSelector).attr(dataMetaIdAttr));
        return id;
    }

    static setDataMetaId(id: number) {
        $(slideTunerCardSelector).find(dataMetaIdSelector).attr(dataMetaIdAttr, id);
    }

    static clear() {
        $(slideTunerCardSelector).children(slideTunerCardItemSelector).remove();
    }
}

export default SlideTunerCard;

$(slideTunerCardSelector).on('change', textInputSelector, function () {

    const id = SlideTunerCard.getDataMetaId();
    const storageSlideData = GlobalMeta.getSlideData(id);
    const inter = new TextInputInterpretated($(this));
    let title = inter.getTitle();
    let value = inter.getValue();

    let saveType = consts.saveDataTypes.getTypeByValue(title);

    if (saveType == consts.availableSaveDataTypes.NextPrevButtons) {
        let buttonsArray: [] = storageSlideData.data.NextPrevButtons;
        let obj: object = buttonsArray.filter(x => Object.keys(x).find(y => y == title) != null)[0];
        //@ts-ignore
        obj[title] = value;
    }
    else if (saveType == consts.availableSaveDataTypes.Text) {
        storageSlideData.data[title] = value;
    }
    else {
        let topLevel = inter.getChildFor();
        let btns: [] = storageSlideData.data[topLevel];
        let obj: object = btns.filter(x => Object.keys(x).find(y => y == title) != null)[0];
        //@ts-ignore
        obj[title] = value;
    }

    GlobalMeta.updateSlideData(storageSlideData);
});

$(slideTunerCardSelector).on('click', consts.combine('data-type', removebtnType), function () {
    const id = SlideTunerCard.getDataMetaId();
    GlobalMeta.removeSlideDataById(id);
    SlideTunerCard.clear();
    LeftSidebarContainer.removeItem(id);
});