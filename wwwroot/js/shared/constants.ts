type imageModifier = 'slide-wrapper__thumbnail-picture--info'
    | 'slide-wrapper__thumbnail-picture--question'
    | 'slide-wrapper__thumbnail-picture--yesno'

type stateModifier = 'sidebar__item--selected'

type styleModifier = 'button--gapped'

type componentPath = '/js/components/AvailableSlide.html'
    | '/js/components/SidebarItem.html'
    | '/js/components/IndexedSlide.html'
    | '/js/components/SlideTunerCardItem.html'
    | '/js/components/TextInput.html'
    | '/js/components/Button.html'
    | '/js/components/SlideTunerCardExpandItem.html'

type imagePath = '/img/delete.svg'

type attribute = 'data-order-max'
    | 'data-schemename'
    | 'index'
    | 'data-meta-id'
    | 'data-meta-order'
    | 'data-kind'
    | 'data-type'

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

type event = 'SlideAdded'
    | 'SlideUpdated'
    | 'SlideRemoved'

type componentType = 'text'
    | 'removebtn'
    | 'nextprevbuttons'

const renderTypes = {
    'Title': 'text',
    'Subtitle': 'text',
    'Infotitle': 'text',
    'Infotext': 'text',
    'Question': 'text',
    'Assistive text': 'text',
    'NextPrevButtons': 'nextprevbuttons',
}

type buttonConfig = { title: string, inputValue: string, placeholder: string };

const slideType = {
    info: 'info',
    question: 'question',
    yesno: 'yesno',
}

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
    renderTypes
}

const map = new Map<string, imageModifier>();
map.set(slideType.info, "slide-wrapper__thumbnail-picture--info");
map.set(slideType.question, "slide-wrapper__thumbnail-picture--question");
map.set(slideType.yesno, "slide-wrapper__thumbnail-picture--yesno");

export function mapTypeToImageModifier(type: string): imageModifier {
    return map.get(type);
}

