import InputTitleControl from "../blocks/input-title/input-title.js";

export default {
    selectors: {


        dataGlobalMeta: '[data-global-meta]',
        dataMetaId: '[data-meta-id]',
        dataObject: '[data-object]',
        dataSchemeName: '[data-schemeName]',
        dataType: '[data-type]',
        getDataMetaId(id) { return `[data-meta-id="${id}"]` },
        globalMeta: '#global-meta',
        index: '[index]',
        leftSidebarId: '#left-sidebar-container',
        plusButtonClass: '.plus-button',
        rightSidebarId: '#right-sidebar-container',
        sidebarItemClass: '.sidebar__item',
        slideTunerCardClass: '.slide-tuner__card',
        slideTunerItemClass: '.slide-tuner__item',
        slideWrapperClass: '.slide-wrapper',
        slideWrapperThumbnailClass: '.slide-wrapper__thumbnail',
        slideWrapperThumbnailTitleClass: '.slide-wrapper__thumbnail-title',

    },

    attributes: {
        dataNodeId: 'data-node-id',
        dataSchemeName: 'data-schemeName',
        dataSchemeContent: 'data-schemeContent',
        dataObject: 'data-object',
        index: 'index',
        dataGlobalMeta: 'data-global-meta',
        dataMetaId: 'data-meta-id',
        dataOrderMax: 'data-order-max'
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
        globalMeta__questionAdded: 'QuestionAdded',
        globalMeta__questionUpdated: 'QuestionUpdated'
    },

    typeToImageMap: {
        info: 'slide-wrapper__thumbnail-picture--info',
        question: 'slide-wrapper__thumbnail-picture--question'
    }

}