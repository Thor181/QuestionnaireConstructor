import { GlobalMeta } from '../shared/GlobalMeta.js';
import * as consts from '../shared/constants.js';
import BaseComponent from './Base/BaseComponent.js';
import TextInputInterpretated from './TextInputInterpretated.js';

const slideTunerCardSelector: consts.selector = '.slide-tuner__card';
const textInputSelector: consts.selector = '.text-input-wrap';
const dataMetaIdSelector: consts.selector = '[data-meta-id]'
const dataMetaIdAttr: consts.attribute = 'data-meta-id';

class SlideTunerCard extends BaseComponent {

    static getDataMetaId(): number {
        const id = Number($(slideTunerCardSelector).find(dataMetaIdSelector).attr(dataMetaIdAttr));
        return id;
    }

    static setDataMetaId(id: number) {
        $(slideTunerCardSelector).find(dataMetaIdSelector).attr(dataMetaIdAttr, id);
    }

}

export default SlideTunerCard;

$(slideTunerCardSelector).on('change', textInputSelector, function () {

    const id = SlideTunerCard.getDataMetaId();
    const storageSlideData = GlobalMeta.getSlideData(id);
    const inter = new TextInputInterpretated($(this));
    let title = inter.getTitle();
    let value = inter.getValue();

    storageSlideData.data[title] = value;
    GlobalMeta.updateSlideData(storageSlideData);
});