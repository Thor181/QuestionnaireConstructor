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

const slideTunerCardSelector: consts.selector = '.slide-tuner__card';
const slideTunerCardItemSelector: consts.selector = '.slide-tuner__item';
const textInputSelector: consts.selector = '.text-input-wrap';
const dataMetaIdSelector: consts.selector = '[data-meta-id]'
const removeForSelector: consts.selector = '[remove-for]';
const removableSelector: consts.selector = '[removable]';
const topLevelSelector: consts.selector = '[top-level]';

const dataMetaIdAttr: consts.attribute = 'data-meta-id';
const removeForAttr: consts.attribute = 'remove-for';
const topLevelAttr: consts.attribute = 'top-level';

const removebtnType: consts.componentType = 'removebtn';
const addbtnType: consts.componentType = 'addbtn';

const addImagePath: consts.imagePath = '/img/add.svg';

class SlideTunerCard extends BaseComponent {

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
        let btns: [] = storageSlideData.data[topLevel];


        let obj: object = btns.filter(x => Object.keys(x).find(y => y == title) != null)[0];

        if (obj != null) {
            //@ts-ignore
            obj[title] = value;
        }
        else {
            let count = $(removableSelector).length;
            let newPropTitle = `Variant ${count}`;
            let newObject = { [newPropTitle]: value, Value: count };

            //@ts-ignore
            btns.push(newObject);
        }
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

    let count = $(this).parents('.fieldset__innerContent').children(consts.combine('data-type', 'text')).length;
    let btn = new TextInputRemovable();
    btn.removeFor = generateShortUniq();
    btn.rendered.title = `Variant ${count + 1}`;
    btn.rendered.inputValue = '';
    btn.rendered.placeholder = `Variant ${count + 1}`;
    btn.rendered.childFor = $(this).parents(topLevelSelector).attr(topLevelAttr);

    $(this).before(await btn.render())
});

$(slideTunerCardSelector).on('click', removeForSelector, function () {

    const id = SlideTunerCard.getDataMetaId();
    let slideData = GlobalMeta.getSlideData(id);
  
    let topLevelFieldset = $(this).parents(topLevelSelector);

    let title = $(this).parent().siblings(consts.combine('data-kind', 'title')).text();
    let topLevel = topLevelFieldset.attr(topLevelAttr);
    let buttons:[] = slideData.data[topLevel];
    slideData.data[topLevel] = buttons.filter(x => x[title] == null);

    GlobalMeta.updateSlideData(slideData);

    let removeForId = $(this).attr(removeForAttr);
    $(consts.combine('removable', removeForId)).remove();
});