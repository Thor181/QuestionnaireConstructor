var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { GlobalMeta } from '../shared/GlobalMeta.js';
import * as consts from '../shared/constants.js';
import BaseComponent from './Base/BaseComponent.js';
import { LeftSidebarContainer } from './LeftSidebarContainer.js';
import TextInputInterpretated from './TextInputInterpretated.js';
import TextInputRemovable from './TextInputRemovable.js';
import generateShortUniq from '../shared/guid.js';
import waitForElm from '../shared/waitforelm.js';
const slideTunerCardSelector = '.slide-tuner__card';
const slideTunerCardItemSelector = '.slide-tuner__item';
const textInputSelector = '.text-input-wrap';
const dataMetaIdSelector = '[data-meta-id]';
const removeForSelector = '[remove-for]';
const removableSelector = '[removable]';
const topLevelSelector = '[top-level]';
const fieldsetInnerContentSelector = '.fieldset__innerContent';
const dataMetaIdAttr = 'data-meta-id';
const removeForAttr = 'remove-for';
const topLevelAttr = 'top-level';
const metaValueAttr = 'meta-value';
const removebtnType = 'removebtn';
const addbtnType = 'addbtn';
const textType = 'text';
const addImagePath = '/img/add.svg';
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
        let innerContent = $(consts.combine('top-level', topLevel)).find(fieldsetInnerContentSelector).first();
        let children = innerContent.children(consts.combine('data-type', textType));
        let count = children.length;
        let newButtons = [];
        for (var i = 0; i < count; i++) {
            let child = children.eq(i);
            let newTitle = 'Variant ' + (i + 1);
            let oldTitle = child.find(consts.combine('data-kind', 'title')).text();
            child.find(consts.combine('data-kind', 'title')).text(newTitle);
            let valueEl = child.find(consts.combine('data-kind', 'value'));
            valueEl.attr('placeholder', newTitle);
            valueEl.attr(metaValueAttr, i + 1);
            let value = valueEl.val();
            newButtons.push({ [newTitle]: value, Value: i + 1 });
        }
        storageSlideData.data[topLevel] = newButtons;
    }
    GlobalMeta.updateSlideData(storageSlideData);
});
$(slideTunerCardSelector).on('click', consts.combine('data-type', removebtnType), function () {
    const id = SlideTunerCard.getDataMetaId();
    GlobalMeta.removeSlideDataById(id);
    SlideTunerCard.clear();
    LeftSidebarContainer.removeItem(id);
});
$(slideTunerCardSelector).on('click', consts.combine('data-type', addbtnType), function () {
    return __awaiter(this, void 0, void 0, function* () {
        const id = SlideTunerCard.getDataMetaId();
        let count = $(this).parents(fieldsetInnerContentSelector).children(consts.combine('data-type', 'text')).length;
        let btn = new TextInputRemovable();
        btn.removeFor = generateShortUniq();
        btn.rendered.title = `Variant ${count + 1}`;
        btn.rendered.inputValue = '';
        btn.rendered.placeholder = `Variant ${count + 1}`;
        btn.rendered.childFor = $(this).parents(topLevelSelector).attr(topLevelAttr);
        btn.rendered.metaValue = count + 1;
        $(this).before(yield btn.render());
    });
});
function waitFieldsetInnerContent() {
    waitForElm(fieldsetInnerContentSelector).then((element) => {
        let fieldsetInnerContentMutationObserver = new MutationObserver((mr, o) => {
            let innerContent = $(consts.combine('top-level', consts.availableSaveDataTypes.Buttons)).find(fieldsetInnerContentSelector).first();
            let children = innerContent.children(consts.combine('data-type', textType));
            let count = children.length;
            let newButtons = [];
            for (var i = 0; i < count; i++) {
                let child = children.eq(i);
                let newTitle = 'Variant ' + (i + 1);
                let oldTitle = child.find(consts.combine('data-kind', 'title')).text();
                child.find(consts.combine('data-kind', 'title')).text(newTitle);
                let valueEl = child.find(consts.combine('data-kind', 'value'));
                valueEl.attr('placeholder', newTitle);
                valueEl.attr(metaValueAttr, i + 1);
                let value = valueEl.val();
                newButtons.push({ [newTitle]: value, Value: i + 1 });
            }
            let id = SlideTunerCard.getDataMetaId();
            let slideData = GlobalMeta.getSlideData(id);
            slideData.data['Buttons'] = newButtons;
            GlobalMeta.updateSlideData(slideData);
        });
        waitForElm(fieldsetInnerContentSelector).then(() => {
            let innerContent = document.querySelector(fieldsetInnerContentSelector);
            fieldsetInnerContentMutationObserver.observe(innerContent, { childList: true });
        });
    });
}
export { waitFieldsetInnerContent };
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