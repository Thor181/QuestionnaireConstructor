import { todo } from 'node:test';
import { GlobalMeta } from '../shared/GlobalMeta.js';
import * as consts from '../shared/constants.js';
import BaseComponent from './Base/BaseComponent.js';
import { LeftSidebarContainer } from './LeftSidebarContainer.js';
import SlideTunerCardGenerator from './SlideTunerCardGenerator.js';
import TextInputInterpretated from './TextInputInterpretated.js';
import Button from './Button.js';
import TextInputRemovable from './TextInputRemovable.js';
import generateShortUniq from '../shared/guid.js';
import waitForElm from '../shared/waitforelm.js';

const slideTunerCardSelector: consts.selector = '.slide-tuner__card';
const slideTunerCardItemSelector: consts.selector = '.slide-tuner__item';
const textInputSelector: consts.selector = '.text-input-wrap';
const dataMetaIdSelector: consts.selector = '[data-meta-id]'
const removeForSelector: consts.selector = '[remove-for]';
const removableSelector: consts.selector = '[removable]';
const topLevelSelector: consts.selector = '[top-level]';
const fieldsetInnerContentSelector: consts.selector = '.fieldset__innerContent';
const dataMetaTitleSelector: consts.selector = '[data-meta-title]';

const dataMetaIdAttr: consts.attribute = 'data-meta-id';
const removeForAttr: consts.attribute = 'remove-for';
const topLevelAttr: consts.attribute = 'top-level';
const metaValueAttr: consts.attribute = 'meta-value';
const dataMetaTitleAttribute: consts.attribute = 'data-meta-title';

const removebtnType: consts.componentType = 'removebtn';
const addbtnType: consts.componentType = 'addbtn';
const textType: consts.componentType = 'text';
const toggleswitchType: consts.componentType = 'toggleswitch';

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
        let innerContent = $(consts.combine('top-level', topLevel)).find(fieldsetInnerContentSelector).first();
        let children = innerContent.children(consts.combine('data-type', textType));
        let count = children.length;

        let newButtons = []

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

    $(this).before(await btn.render())
});

$(slideTunerCardSelector).on('change', consts.combine('data-kind', 'singleselect'), function () {
    const id = SlideTunerCard.getDataMetaId();
    const slideData = GlobalMeta.getSlideData(id);
    const metaTitle = $(this).parents(dataMetaTitleSelector).attr(dataMetaTitleAttribute);
    slideData.data[metaTitle] = $(this).is(':checked');
    GlobalMeta.updateSlideData(slideData);
});

function waitFieldsetInnerContent() {
    waitForElm(fieldsetInnerContentSelector).then((element: HTMLElement) => {

        let fieldsetInnerContentMutationObserver = new MutationObserver((mr, o) => {
            let innerContent = $(consts.combine('top-level', consts.availableSaveDataTypes.Buttons)).find(fieldsetInnerContentSelector).first();
            let children = innerContent.children(consts.combine('data-type', textType));
            let count = children.length;
            let topLevel = $(fieldsetInnerContentSelector).attr(topLevelAttr);

            let newButtons = []

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
            slideData.data[topLevel] = newButtons;

            GlobalMeta.updateSlideData(slideData);

        });
        waitForElm(fieldsetInnerContentSelector).then(() => {
            let innerContent = document.querySelector(fieldsetInnerContentSelector);
            fieldsetInnerContentMutationObserver.observe(innerContent, { childList: true });
        })

    });

}

export { waitFieldsetInnerContent };

$(slideTunerCardSelector).on('click', removeForSelector, function () {

    const id = SlideTunerCard.getDataMetaId();
    let slideData = GlobalMeta.getSlideData(id);

    let topLevelFieldset = $(this).parents(topLevelSelector);

    let title = $(this).parent().siblings(consts.combine('data-kind', 'title')).text();
    let topLevel = topLevelFieldset.attr(topLevelAttr);
    let buttons: [] = slideData.data[topLevel];
    slideData.data[topLevel] = buttons.filter(x => x[title] == null);

    GlobalMeta.updateSlideData(slideData);

    let removeForId = $(this).attr(removeForAttr);
    $(consts.combine('removable', removeForId)).remove();
});