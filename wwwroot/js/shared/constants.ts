﻿import { log } from "./Logger.js"

type imageModifier = 'slide-wrapper__thumbnail-picture--info'
    | 'slide-wrapper__thumbnail-picture--question'
    | 'slide-wrapper__thumbnail-picture--yesno'
    | 'slide-wrapper__thumbnail-picture--multi'
    | 'slide-wrapper__thumbnail-picture--image'

type stateModifier = 'sidebar__item--selected'

type styleModifier = 'button--gapped'

type componentPath = '/js/components/AvailableSlide.html'
    | '/js/components/SidebarItem.html'
    | '/js/components/IndexedSlide.html'
    | '/js/components/SlideTunerCardItem.html'
    | '/js/components/TextInput.html'
    | '/js/components/Button.html'
    | '/js/components/SlideTunerCardExpandItem.html'
    | '/js/components/Fieldset.html'
    | '/js/components/TextInputRemovable.html'
    | '/js/components/ToggleSwitch.html'
    | '/js/components/ImageSelect.html'


type imagePath = '/img/delete.svg'
    | '/img/add.svg'

type attribute = 'data-order-max'
    | 'data-schemename'
    | 'index'
    | 'data-meta-id'
    | 'data-meta-order'
    | 'data-kind'
    | 'data-type'
    | 'child-for'
    | 'remove-for'
    | 'removable'
    | 'top-level'
    | 'meta-value'
    | 'data-meta-title'
    | 'top-level'

type selector = '#right-sidebar-container'
    | '.plus-button'
    | '.slide-wrapper'
    | '#left-sidebar-container'
    | '#global-meta'
    | '.slide-tuner__card'
    | '.slide-tuner__item'
    | '.sidebar__item'
    | '.fieldset'
    | '.fieldset__innerContent'
    | '.text-input-wrap'
    | '.input-file__inner-image'
    | `[${attribute}]`

type event = 'SlideAdded'
    | 'SlideUpdated'
    | 'SlideRemoved'

type componentType = 'text'
    | 'removebtn'
    | 'nextprevbuttons'
    | 'buttons'
    | 'fieldset'
    | 'addbtn'
    | 'multiselect'
    | 'toggleswitch'
    | 'imageselection'
    | 'addImageBtn'


const renderTypes = {
    'Title': 'text',
    'Subtitle': 'text',
    'Infotitle': 'text',
    'Infotext': 'text',
    'Question': 'text',
    'Assistive text': 'text',
    'NextPrevButtons': 'nextprevbuttons',
    'Buttons': 'buttons',
    'Single select': 'toggleswitch',
    'ImageButtons': 'imagebuttons',
    'InputFile': 'inputfile',

    //@ts-ignore
    getValueByKey(key: string) { return renderTypes[key]; },

    //@ts-ignore
    getKeyByValue(value: string) { return Object.keys(renderTypes).find(x => renderTypes[x] === value); }
}

const availableSaveDataTypes = {
    Text: 'Text',
    NextPrevButtons: 'NextPrevButtons',
    Buttons: 'Buttons'
}

const saveDataTypes = {
    [availableSaveDataTypes.Text]: ['Title', 'Subtitle', 'Infotitle', 'Infotext', 'Question', 'Assistive text'],
    [availableSaveDataTypes.NextPrevButtons]: ['Button next', 'Button previous'],
    [availableSaveDataTypes.Buttons]: [''],

    getTypeByValue(value: string) {

        for (let i in saveDataTypes) {
            if (i == saveDataTypes.getTypeByValue.name)
                continue;

            //@ts-ignore
            let data: [] = saveDataTypes[i];

            if (data.find(x => x === value) != null) {
                return i;
            }
        }
    }
}

type buttonConfig = { title: string, inputValue: string, placeholder: string, removable: boolean };
type imageSelectConfig = { title: string, inputValue: string, placeholder: string, removable: boolean, imagePath: string };

const combine = (attribute: attribute, value: string) => {
    return `[${attribute}='${value}']`
};

export {
    imageModifier,
    componentPath,
    selector,
    attribute,
    event,
    componentType,
    stateModifier,
    styleModifier,
    imagePath,
    combine,
    buttonConfig,
    renderTypes,
    saveDataTypes,
    availableSaveDataTypes,
    imageSelectConfig
}

const slideType = {
    info: 'info',
    question: 'question',
    yesno: 'yesno',
    multiselect: 'multiselect',
    imageselection: 'imageselection'
}

const map = new Map<string, imageModifier>();
map.set(slideType.info, "slide-wrapper__thumbnail-picture--info");
map.set(slideType.question, "slide-wrapper__thumbnail-picture--question");
map.set(slideType.yesno, "slide-wrapper__thumbnail-picture--yesno");
map.set(slideType.multiselect, "slide-wrapper__thumbnail-picture--multi");
map.set(slideType.imageselection, "slide-wrapper__thumbnail-picture--image");

export function mapTypeToImageModifier(type: string): imageModifier {
    let t = map.get(type);

    if (t == null)
        log("warn", "Type " + type + " not found in imageModifier map");

    return t;
}

