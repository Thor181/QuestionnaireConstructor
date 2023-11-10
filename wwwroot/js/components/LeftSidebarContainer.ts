import * as consts from '../shared/constants.js';
import { GlobalMeta, SlideData } from '../shared/GlobalMeta.js';
import IndexedSlide from './IndexedSlide.js';
import IndexedSlideInterpretated from './IndexedSlideInterpretated.js';
import SidebarItem from './SidebarItem.js';
import SlideTunerCard from './SlideTunerCard.js';
import SlideTunerCardGenerator from './SlideTunerCardGenerator.js';

const leftContainerSelector: consts.selector = '#left-sidebar-container';
const indexSelector: consts.selector = '[index]';
const dataOrderMaxSelector: consts.selector = '[data-order-max]';
const sidebarItemSelector: consts.selector = '.sidebar__item';
const dataMetaIdSelector: consts.selector = '[data-meta-id]';
const dataMetaOrderSelector: consts.selector = '[data-meta-order]';
const slideTunerCardSelector: consts.selector = '.slide-tuner__card';
const slideTunerItem: consts.selector = '.slide-tuner__item';
const dataKindSelector: consts.selector = '[data-kind]';


const globalMeta: consts.selector = '#global-meta';

const indexAttr: consts.attribute = 'index';
const dataOrderMaxAttr: consts.attribute = 'data-order-max';
const dataMetaIdAttr: consts.attribute = 'data-meta-id';
const dataMetaOrderAttr: consts.attribute = 'data-meta-order';
const dataKindAttr: consts.attribute = 'data-kind'

const slideUpdatedEvent: consts.event = 'SlideUpdated';

const leftContainer = document.querySelector(leftContainerSelector);

const leftSidebarMutationObserver = new MutationObserver((mr, o) => {
    const indexSpan = $(leftContainerSelector).find(indexSelector);

    let i = 0;
    while (i < indexSpan.length) {
        let item = indexSpan.eq(i);
        item.text(i + 1);
        item.attr(indexAttr, i + 1);
        i++;
    }

    leftContainer.setAttribute(dataOrderMaxAttr, i.toString());
});

leftSidebarMutationObserver.observe(leftContainer, { childList: true });

export class LeftSidebarContainer {


    static async addIndexedSlide(slideData: SlideData) {
        const leftSidebarContainer = $(leftContainerSelector);

        const slide = new IndexedSlide();
        slide.rendered.index = 0;
        slide.rendered.imageModifier = consts.mapTypeToImageModifier(slideData.meta.type);
        slide.rendered.metaId = slideData.meta.id;
        slide.rendered.metaOrder = slideData.meta.order;
        slide.rendered.title = slideData.data.Title;

        const sidebarItem = new SidebarItem();
        sidebarItem.rendered.innerContent = await slide.render();

        leftSidebarContainer.append(await sidebarItem.render());

        //Сортировка
        let sidebarChildren = Array.from(leftSidebarContainer.children());
        let sorted = sidebarChildren.sort(function (a, b) {
            //@ts-ignore
            return $(a).find(dataMetaOrderSelector)[0].getAttribute(dataMetaOrderAttr) - $(b).find(dataMetaOrderSelector)[0].getAttribute(dataMetaOrderAttr);
        });
        sorted.forEach(x => leftSidebarContainer.append(x))
    }
}

$(leftContainerSelector).on('click', sidebarItemSelector, async function () {
    const inter = new IndexedSlideInterpretated($(this).children().first());

    const slideTunerCard = $(slideTunerCardSelector);
    slideTunerCard.children().remove(slideTunerItem);

    const slideId = inter.getMetaDataId();
    const slideData = GlobalMeta.getSlideData(slideId);

    const generator = new SlideTunerCardGenerator();
    const data = slideData.data;

    for (let i in data) {
        await generator.addTextComponent(i, data[i], i);
    }

    const renderedCardChildren = await generator.render();

    slideTunerCard.append(renderedCardChildren);

    SlideTunerCard.setDataMetaId(slideId);

    inter.setSelectedStatus();

});

$(globalMeta).on(slideUpdatedEvent, function (e) {
    //@ts-ignore
    const detail: EventData = e.detail;
    const data: SlideData = GlobalMeta.getSlideData(detail.slideId);

    let item = $(leftContainerSelector).find(`[${dataMetaIdAttr}='${detail.slideId}']`)
    let titleElement = item.siblings().find(`[${dataKindAttr}='title']`);
    titleElement.text(data.data.Title);
});