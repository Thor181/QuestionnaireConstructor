import { GlobalMeta } from '../shared/GlobalMeta.js';
import * as consts from '../shared/constants.js';
import BaseComponent from './Base/BaseComponent.js';
import { LeftSidebarContainer } from './LeftSidebarContainer.js';
import TextInputInterpretated from './TextInputInterpretated.js';
const slideTunerCardSelector = '.slide-tuner__card';
const slideTunerCardItemSelector = '.slide-tuner__item';
const textInputSelector = '.text-input-wrap';
const dataMetaIdSelector = '[data-meta-id]';
const dataMetaIdAttr = 'data-meta-id';
const removebtnType = 'removebtn';
class SlideTunerCard extends BaseComponent {
    static getDataMetaId() {
        const id = Number($(slideTunerCardSelector).find(dataMetaIdSelector).attr(dataMetaIdAttr));
        return id;
    }
    static setDataMetaId(id) {
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
    storageSlideData.data[title] = value;
    GlobalMeta.updateSlideData(storageSlideData);
});
$(slideTunerCardSelector).on('click', consts.combine('data-type', removebtnType), function () {
    const id = SlideTunerCard.getDataMetaId();
    GlobalMeta.removeSlideDataById(id);
    SlideTunerCard.clear();
    LeftSidebarContainer.removeItem(id);
});
//# sourceMappingURL=SlideTunerCard.js.map