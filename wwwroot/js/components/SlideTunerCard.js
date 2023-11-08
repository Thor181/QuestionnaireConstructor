import { GlobalMeta } from '../shared/GlobalMeta';
import BaseComponent from './Base/BaseComponent';
const slideTunerCardSelector = '.slide-tuner__card';
const textInputSelector = '.text-input-wrap';
const dataMetaIdSelector = '[data-meta-id]';
const dataMetaIdAttr = 'data-meta-id';
class SlideTunerCard extends BaseComponent {
    static getDataMetaId() {
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
//# sourceMappingURL=SlideTunerCard.js.map