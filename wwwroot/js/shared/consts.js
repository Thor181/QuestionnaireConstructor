import InputTitleControl from "../blocks/input-title/input-title.js";

export default {
    selectors: {
        rightSidebarId: '#right-sidebar-container',
        leftSidebarId: '#left-sidebar-container',
        plusButtonClass: '.plus-button',
        slideWrapperClass: '.slide-wrapper',
        sidebarItemClass: '.sidebar__item',
        slideTunerCardClass: '.slide-tuner__card',
        slideTunerItemClass: '.slide-tuner__item',
        dataObject: '[data-object]',
        index: '[index]',
        dataSchemeName: '[data-schemeName]',
        dataType: '[data-type]',
        dataGlobalMeta: '[data-global-meta]',
        globalMeta: '#global-meta',
        dataMetaId: '[data-meta-id]'

    },

    attributes: {
        dataNodeId: 'data-node-id',
        dataSchemeName: 'data-schemeName',
        dataSchemeContent: 'data-schemeContent',
        dataObject: 'data-object',
        index: 'index',
        dataGlobalMeta: 'data-global-meta',
        dataMetaId: 'data-meta-id'
    },

    shared: {
        asHeader: "$Header",
    },

    controlsMap: {
        title: 'text',
        subtitle: 'text',
        infotitle: 'text',
        infotext: 'text',
    },

    paths: {
        input_title: '/controls/blocks/input-title/input-title.html',
    },

    classes: {
        sidebarItemSelected: 'sidebar__item--selected'
    },

    events: {
        globalMeta__questionAdded: 'QuestionAdded'
    },

    typeToImageMap: {
        info: 'slide-wrapper__thumbnail-picture--info',
        question: 'slide-wrapper__thumbnail-picture--question'
    }

}