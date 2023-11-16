import { GlobalMeta } from '../shared/GlobalMeta.js';
import * as consts from '../shared/constants.js';
import BaseComponent from './Base/BaseComponent.js';
import { LeftSidebarContainer } from './LeftSidebarContainer.js';
import TextInputInterpretated from './TextInputInterpretated.js';
const slideTunerCardSelector = '.slide-tuner__card';
const slideTunerCardItemSelector = '.slide-tuner__item';
const textInputSelector = '.text-input-wrap';
const dataMetaIdSelector = '[data-meta-id]';
const removeForSelector = '[remove-for]';
const removableSelector = '[removable]';
const topLevelSelector = '[top-level]';
const dataMetaIdAttr = 'data-meta-id';
const removeForAttr = 'remove-for';
const topLevelAttr = 'top-level';
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
    let saveType = consts.saveDataTypes.getTypeByValue(title);
    if (saveType == consts.availableSaveDataTypes.NextPrevButtons) {
        let buttonsArray = storageSlideData.data.NextPrevButtons;
        let obj = buttonsArray.filter(x => Object.keys(x).find(y => y == title) != null)[0];
        obj[title] = value;
    }
    else if (saveType == consts.availableSaveDataTypes.Text) {
        storageSlideData.data[title] = value;
    }
    else {
        let topLevel = inter.getChildFor();
        let btns = storageSlideData.data[topLevel];
        let obj = btns.filter(x => Object.keys(x).find(y => y == title) != null)[0];
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
$(slideTunerCardSelector).on('click', removeForSelector, function () {
    const id = SlideTunerCard.getDataMetaId();
    let slideData = GlobalMeta.getSlideData(id);
    let topLevelFieldset = $(this).parents(topLevelSelector);
    let title = $(this).parent().siblings(consts.combine('data-kind', 'title')).text();
    let topLevel = topLevelFieldset.attr(topLevelAttr);
    let buttons = slideData.data[topLevel];
    slideData.data[topLevel] = buttons.filter(x => x[title] == null);
    GlobalMeta.updateSlideData(slideData);
    let removeForId = $(this).attr(removeForAttr);
    $(consts.combine('removable', removeForId)).remove();
});
//# sourceMappingURL=SlideTunerCard.js.map