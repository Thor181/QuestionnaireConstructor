import { GlobalMeta } from '../shared/GlobalMeta.js';
import BaseComponent from './Base/BaseComponent.js';
import TextInputInterpretated from './TextInputInterpretated.js';
const slideTunerCardSelector = '.slide-tuner__card';
const textInputSelector = '.text-input-wrap';
const dataMetaIdSelector = '[data-meta-id]';
const dataMetaIdAttr = 'data-meta-id';
class SlideTunerCard extends BaseComponent {
    static getDataMetaId() {
        const id = Number($(slideTunerCardSelector).find(dataMetaIdSelector).attr(dataMetaIdAttr));
        return id;
    }
    static setDataMetaId(id) {
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
//# sourceMappingURL=SlideTunerCard.js.map