﻿type imageModifier = 'slide-wrapper__thumbnail-picture--info'
    | 'slide-wrapper__thumbnail-picture--question'
    | 'slide-wrapper__thumbnail-picture--yesno'


type componentPath = '/js/components/AvailableSlide.html'
    | '/js/components/SidebarItem.html'
    | '/js/components/IndexedSlide.html'
    | '/js/components/SlideTunerCardItem.html'
    | '/js/components/TextInput.html'
    | ''

type attribute = 'data-order-max'
    | 'data-schemename'
    | 'index'
    | 'data-meta-id'
    | ''

type selector = '#right-sidebar-container'
    | '.plus-button'
    | '.slide-wrapper'
    | `[${attribute}]`
    | '#left-sidebar-container'
    | '#global-meta'
    | '.slide-tuner__card'
    | '.slide-tuner__item'
    | '.sidebar__item'
    | '.text-input-wrap'
    | ''

type event = 'SlideAdded'
    | 'SlideUpdated'
    | ''

type componentType = 'text'
    | ''


const slideType = {
    info: 'info',
    question: 'question',
    yesno: 'yesno',
}

export {
    imageModifier,
    componentPath,
    selector,
    attribute,
    event,
    componentType
}

const map = new Map<string, imageModifier>();
map.set(slideType.info, "slide-wrapper__thumbnail-picture--info");
map.set(slideType.question, "slide-wrapper__thumbnail-picture--question");
map.set(slideType.yesno, "slide-wrapper__thumbnail-picture--yesno");

export function mapTypeToImageModifier(type: string): imageModifier {
    return map.get(type);
}

