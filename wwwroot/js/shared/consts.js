import InputTitleControl from "../blocks/input-title/input-title.js";

export default {
    selectors: {
        rightSidebarId: '#right-sidebar-container',
        leftSidebarId: '#left-sidebar-container',
        plusButtonClass: '.plus-button',
        slideWrapperClass: '.slide-wrapper',
        sidebarItemClass: '.sidebar__item',
        slideTunerCardClass: '.slide-tuner__card',
        dataObject: '[data-object]',
        index: '[index]',
        schemeName: '[scheme-name]'
    },

    attributes: {
        dataNodeId: 'data-node-id',
        dataSchemeName: 'scheme-name',
        dataSchemeContent: 'data-schemeContent',
        dataObject: 'data-object',
        index: 'index'
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
    }

}