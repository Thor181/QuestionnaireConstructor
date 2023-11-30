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
import ImageSelect from './ImageSelect.js';
import ColorSelect from './ColorSelect.js';
const slideTunerCardSelector = '.slide-tuner__card';
const slideTunerCardItemSelector = '.slide-tuner__item';
const textInputSelector = '.text-input-wrap';
const dataMetaIdSelector = '[data-meta-id]';
const removeForSelector = '[remove-for]';
const removableSelector = '[removable]';
const topLevelSelector = '[top-level]';
const fieldsetInnerContentSelector = '.fieldset__innerContent';
const dataMetaTitleSelector = '[data-meta-title]';
const dataTypeSelector = '[data-type]';
const fieldsetSelector = '.fieldset';
const inputFileInnerImageSelector = '.input-file__inner-image';
const colorInputSelector = '.color-wrapper__color-input';
const dataMetaIdAttr = 'data-meta-id';
const removeForAttr = 'remove-for';
const topLevelAttr = 'top-level';
const metaValueAttr = 'meta-value';
const dataMetaTitleAttribute = 'data-meta-title';
const dataTypeAttr = 'data-type';
const removebtnType = 'removebtn';
const addbtnType = 'addbtn';
const textType = 'text';
const toggleswitchType = 'toggleswitch';
const addImageBtnType = 'addImageBtn';
const addColorBtnType = 'addColor';
const colorType = 'color';
const inputfileType = consts.renderTypes.InputFile;
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
    static getSlideType() {
        let slideData = this.getSlideData();
        let slideType = slideData.meta.type;
        return slideType;
    }
    static getSlideData() {
        let slideId = SlideTunerCard.getDataMetaId();
        let slideData = GlobalMeta.getSlideData(slideId);
        return slideData;
    }
    render() {
        return __awaiter(this, void 0, void 0, function* () {
            throw new Error('Method not implemented.');
        });
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
        let newButtons = updateMultipleInputs(topLevel);
        storageSlideData.data[topLevel] = newButtons;
    }
    GlobalMeta.updateSlideData(storageSlideData);
});
function updateMultipleInputs(topLevel) {
    let innerContent = $(consts.combine('top-level', topLevel)).find(fieldsetInnerContentSelector).first();
    let children = innerContent.children('.wrap-container').children(dataTypeSelector).not('button');
    let count = children.length;
    let slideData = SlideTunerCard.getSlideData();
    let slideType = SlideTunerCard.getSlideType();
    let newButtons = [];
    if (slideType == colorType) {
        for (var i = 0; i < count; i++) {
            let child = children.eq(i);
            let value = child.attr('Value');
            let color = child.find('input').val();
            let btns = slideData.data[topLevel];
            newButtons.push({ Color: color, Value: value });
        }
    }
    else {
        for (var i = 0; i < count; i++) {
            let child = children.eq(i);
            let newTitle = 'Variant ' + (i + 1);
            child.find(consts.combine('data-kind', 'title')).text(newTitle);
            let valueEl = child.find(consts.combine('data-kind', 'value'));
            valueEl.attr('placeholder', newTitle);
            valueEl.attr(metaValueAttr, i + 1);
            let value = valueEl.val();
            let newObj = { [newTitle]: value, Value: i + 1 };
            if (topLevel == 'ImageButtons') {
                let img = child.find(inputFileInnerImageSelector).find('img');
                let path = img.attr('src');
                newObj["ImagePath"] = path;
            }
            newButtons.push(newObj);
        }
    }
    return newButtons;
}
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
        $(this).siblings('.wrap-container').append(yield btn.render());
    });
});
$(slideTunerCardSelector).on('click', consts.combine('data-type', addImageBtnType), function () {
    return __awaiter(this, void 0, void 0, function* () {
        let count = $(this).parents(fieldsetInnerContentSelector).children(consts.combine('data-type', inputfileType)).length;
        let removeFor = generateShortUniq();
        let newValue = count + 1;
        let inputRemovable = new TextInputRemovable();
        inputRemovable.removeFor = removeFor;
        inputRemovable.rendered.childFor = $(this).parents(topLevelSelector).attr(topLevelAttr);
        inputRemovable.rendered.inputValue = '';
        inputRemovable.rendered.metaValue = newValue;
        inputRemovable.rendered.placeholder = `Variant ${newValue}`;
        inputRemovable.rendered.title = `Variant ${newValue}`;
        let imageSelect = new ImageSelect();
        imageSelect.rendered.removeFor = removeFor;
        imageSelect.rendered.metaValue = newValue;
        imageSelect.components.TextInput = inputRemovable;
        $(this).siblings('.wrap-container').append(yield imageSelect.render());
    });
});
$(slideTunerCardSelector).on('click', consts.combine('data-type', addColorBtnType), function () {
    return __awaiter(this, void 0, void 0, function* () {
        let count = $(fieldsetInnerContentSelector).find(colorInputSelector).length;
        let removeFor = generateShortUniq();
        let colorSelect = new ColorSelect();
        colorSelect.rendered = { removeFor: removeFor, color: '#fae3c9', value: String(count + 1) };
        $(this).siblings('.wrap-container').first().append(yield colorSelect.render());
    });
});
$(slideTunerCardSelector).on('change', consts.combine('data-kind', 'singleselect'), function () {
    const id = SlideTunerCard.getDataMetaId();
    const slideData = GlobalMeta.getSlideData(id);
    const metaTitle = $(this).parents(dataMetaTitleSelector).attr(dataMetaTitleAttribute);
    slideData.data[metaTitle] = $(this).is(':checked');
    GlobalMeta.updateSlideData(slideData);
});
$(slideTunerCardSelector).on('change', '.input-file__base-input', function () {
    return __awaiter(this, void 0, void 0, function* () {
        let input = $(this)[0];
        if (input.files.length == 1) {
            let form = input.closest('form');
            let formData = new FormData(form);
            let response = yield fetch(form.action, { method: 'POST', body: formData });
            let imageServerPath = yield response.text();
            let topLevel = input.closest(topLevelSelector).getAttribute(topLevelAttr);
            let img = $(input).closest('[data-type="inputfile"]').find(inputFileInnerImageSelector).find('img');
            $(img).attr('src', imageServerPath);
            let metaValue = input.getAttribute(metaValueAttr);
            const slideId = SlideTunerCard.getDataMetaId();
            const slideData = GlobalMeta.getSlideData(slideId);
            const data = slideData.data;
            let btns = data[topLevel];
            let obj = btns.filter(x => x["Value"] == metaValue)[0];
            obj.ImagePath = imageServerPath;
            GlobalMeta.updateSlideData(slideData);
        }
    });
});
function waitFieldsetInnerContent() {
    waitForElm('.fieldset__innerContent .wrap-container').then((element) => {
        let fieldsetInnerContentMutationObserver = new MutationObserver((mr, o) => {
            let fieldset = $(fieldsetSelector + topLevelSelector);
            let topLevel = fieldset.attr(topLevelAttr);
            let newButtons = updateMultipleInputs(topLevel);
            let id = SlideTunerCard.getDataMetaId();
            let slideData = GlobalMeta.getSlideData(id);
            slideData.data[topLevel] = newButtons;
            GlobalMeta.updateSlideData(slideData);
        });
        waitForElm('.fieldset__innerContent .wrap-container').then(() => {
            let innerContent = document.querySelector('.fieldset__innerContent .wrap-container');
            fieldsetInnerContentMutationObserver.observe(innerContent, { childList: true });
        });
    });
}
export { waitFieldsetInnerContent };
$(slideTunerCardSelector).on('click', 'button' + removeForSelector, function () {
    let removeForId = $(this).attr(removeForAttr);
    $(consts.combine('remove-for', removeForId)).remove();
});
$(slideTunerCardSelector).on('change', 'input[type="color"]', function () {
    let id = $(this).attr('id');
    let label = $(`[for="${id}"]`);
    let colorInput = label.parent();
    let value = colorInput.attr('value');
    let color = $(this).val();
    label.css('background', color);
    let topLevel = $(this).parents(topLevelSelector).attr(topLevelAttr);
    let slideId = SlideTunerCard.getDataMetaId();
    let slideData = GlobalMeta.getSlideData(slideId);
    let data = slideData.data[topLevel];
    let element = data.find(x => x['Value'] == value);
    if (element != undefined) {
        element.Color = color;
        GlobalMeta.updateSlideData(slideData);
    }
    ;
});
//# sourceMappingURL=SlideTunerCard.js.map