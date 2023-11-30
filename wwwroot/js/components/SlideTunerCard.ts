
import { GlobalMeta, SlideData } from '../shared/GlobalMeta.js';
import * as consts from '../shared/constants.js';
import BaseComponent from './Base/BaseComponent.js';
import { LeftSidebarContainer } from './LeftSidebarContainer.js';
import SlideTunerCardGenerator from './SlideTunerCardGenerator.js';
import TextInputInterpretated from './TextInputInterpretated.js';
import Button from './Button.js';
import TextInputRemovable from './TextInputRemovable.js';
import generateShortUniq from '../shared/guid.js';
import waitForElm from '../shared/waitforelm.js';
import ImageSelect from './ImageSelect.js';
import TextInputBase from './Base/TextInputBase.js';
import ColorSelect from './ColorSelect.js';

const slideTunerCardSelector: consts.selector = '.slide-tuner__card';
const slideTunerCardItemSelector: consts.selector = '.slide-tuner__item';
const textInputSelector: consts.selector = '.text-input-wrap';
const dataMetaIdSelector: consts.selector = '[data-meta-id]'
const removeForSelector: consts.selector = '[remove-for]';
const removableSelector: consts.selector = '[removable]';
const topLevelSelector: consts.selector = '[top-level]';
const fieldsetInnerContentSelector: consts.selector = '.fieldset__innerContent';
const dataMetaTitleSelector: consts.selector = '[data-meta-title]';
const dataTypeSelector: consts.selector = '[data-type]';
const fieldsetSelector: consts.selector = '.fieldset';
const inputFileInnerImageSelector: consts.selector = '.input-file__inner-image';
const colorInputSelector: consts.selector = '.color-wrapper__color-input';

const dataMetaIdAttr: consts.attribute = 'data-meta-id';
const removeForAttr: consts.attribute = 'remove-for';
const topLevelAttr: consts.attribute = 'top-level';
const metaValueAttr: consts.attribute = 'meta-value';
const dataMetaTitleAttribute: consts.attribute = 'data-meta-title';
const dataTypeAttr: consts.attribute = 'data-type';

const removebtnType: consts.componentType = 'removebtn';
const addbtnType: consts.componentType = 'addbtn';
const textType: consts.componentType = 'text';
const toggleswitchType: consts.componentType = 'toggleswitch';
const addImageBtnType: consts.componentType = 'addImageBtn';
const addColorBtnType: consts.componentType = 'addColor'
const colorType: consts.componentType = 'color'

const inputfileType = consts.renderTypes.InputFile;

const addImagePath: consts.imagePath = '/img/add.svg';

class SlideTunerCard extends BaseComponent {

    components: { [key: string]: BaseComponent; };
    rendered: { [key: string]: any; };

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

    static getSlideType(): string {
        let slideData = this.getSlideData();
        let slideType = slideData.meta.type;
        return slideType;
    }

    static getSlideData(): SlideData {
        let slideId = SlideTunerCard.getDataMetaId();
        let slideData = GlobalMeta.getSlideData(slideId);

        return slideData;
    }

    async render(): Promise<string> {
        throw new Error('Method not implemented.');
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

        let newButtons = updateMultipleInputs(topLevel);

        storageSlideData.data[topLevel] = newButtons;
    }

    GlobalMeta.updateSlideData(storageSlideData);
});

function updateMultipleInputs(topLevel: string) {
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
            let btns: [] = slideData.data[topLevel];

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

$(slideTunerCardSelector).on('click', consts.combine('data-type', addbtnType), async function () {
    const id = SlideTunerCard.getDataMetaId();

    let count = $(this).parents(fieldsetInnerContentSelector).children(consts.combine('data-type', 'text')).length;
    let btn = new TextInputRemovable();
    btn.removeFor = generateShortUniq();
    btn.rendered.title = `Variant ${count + 1}`;
    btn.rendered.inputValue = '';
    btn.rendered.placeholder = `Variant ${count + 1}`;
    btn.rendered.childFor = $(this).parents(topLevelSelector).attr(topLevelAttr);
    btn.rendered.metaValue = count + 1;

    $(this).siblings('.wrap-container').append(await btn.render());
    //$(this).before(await btn.render());
});

$(slideTunerCardSelector).on('click', consts.combine('data-type', addImageBtnType), async function () {
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

    $(this).siblings('.wrap-container').append(await imageSelect.render());
});

$(slideTunerCardSelector).on('click', consts.combine('data-type', addColorBtnType), async function () {
    let count = $(fieldsetInnerContentSelector).find(colorInputSelector).length;
    let removeFor = generateShortUniq();
    let colorSelect = new ColorSelect();
    colorSelect.rendered = { removeFor: removeFor, color: '#fae3c9', value: String(count + 1) };
    $(this).siblings('.wrap-container').first().append(await colorSelect.render());
});

$(slideTunerCardSelector).on('change', consts.combine('data-kind', 'singleselect'), function () {
    const id = SlideTunerCard.getDataMetaId();
    const slideData = GlobalMeta.getSlideData(id);
    const metaTitle = $(this).parents(dataMetaTitleSelector).attr(dataMetaTitleAttribute);
    slideData.data[metaTitle] = $(this).is(':checked');
    GlobalMeta.updateSlideData(slideData);
});

$(slideTunerCardSelector).on('change', '.input-file__base-input', async function () {
    let input = $(this)[0];
    if (input.files.length == 1) {

        let form = input.closest('form')
        let formData = new FormData(form);
        let response = await fetch(form.action, { method: 'POST', body: formData });
        let imageServerPath = await response.text();

        let topLevel = input.closest(topLevelSelector).getAttribute(topLevelAttr);

        let img = $(input).closest('[data-type="inputfile"]').find(inputFileInnerImageSelector).find('img');
        $(img).attr('src', imageServerPath)

        let metaValue = input.getAttribute(metaValueAttr);

        const slideId = SlideTunerCard.getDataMetaId();
        const slideData = GlobalMeta.getSlideData(slideId);
        const data = slideData.data;

        let btns: [] = data[topLevel];
        let obj: { ImagePath: string } = btns.filter(x => x["Value"] == metaValue)[0];

        obj.ImagePath = imageServerPath;
        GlobalMeta.updateSlideData(slideData);
    }
})

function waitFieldsetInnerContent() {
    //NOT WRAP CONTAINER
    //waitForElm(fieldsetInnerContentSelector).then((element: HTMLElement) => {

    //    let fieldsetInnerContentMutationObserver = new MutationObserver((mr, o) => {
    //        let fieldset = $(fieldsetSelector + topLevelSelector);
    //        let topLevel = fieldset.attr(topLevelAttr);

    //        let newButtons = updateMultipleInputs(topLevel);

    //        let id = SlideTunerCard.getDataMetaId();
    //        let slideData = GlobalMeta.getSlideData(id);
    //        slideData.data[topLevel] = newButtons;

    //        GlobalMeta.updateSlideData(slideData);

    //    });
    //    waitForElm(fieldsetInnerContentSelector).then(() => {
    //        let innerContent = document.querySelector(fieldsetInnerContentSelector);
    //        fieldsetInnerContentMutationObserver.observe(innerContent, { childList: true });
    //    })

    //});

    //WRAP CONTAINER
    waitForElm('.fieldset__innerContent .wrap-container').then((element: HTMLElement) => {

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
        })

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
    let data: [] = slideData.data[topLevel];
    let element: { Color: string } = data.find(x => x['Value'] == value);
    if (element != undefined) {
        element.Color = color;
        GlobalMeta.updateSlideData(slideData);
    };
});