import { GlobalMeta } from '../shared/GlobalMeta';
import * as consts from '../shared/constants.js';
import BaseComponent from './Base/BaseComponent';

const slideTunerCardSelector: consts.selector = '.slide-tuner__card';
const textInputSelector: consts.selector = '.text-input-wrap';
const dataMetaIdSelector: consts.selector = '[data-meta-id]'
const dataMetaIdAttr: consts.attribute = 'data-meta-id';

class SlideTunerCard extends BaseComponent {

    static getDataMetaId(): number {
        const id = Number($(slideTunerCardSelector).find(dataMetaIdSelector).attr(dataMetaIdAttr));
        return id;
    }

}

export default SlideTunerCard;

$(slideTunerCardSelector).on('change', textInputSelector, function () {

    const id = SlideTunerCard.getDataMetaId();
    const storageSlideData = GlobalMeta.getSlideData(id);
    const thisElement = $(this); 




});