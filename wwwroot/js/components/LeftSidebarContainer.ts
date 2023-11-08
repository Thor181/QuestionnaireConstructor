import * as consts from '../shared/constants.js';
import { GlobalMeta, SlideData } from '../shared/GlobalMeta.js';
import IndexedSlide from './IndexedSlide.js';
import SidebarItem from './SidebarItem.js';
import SlideTunerCardGenerator from './SlideTunerCardGenerator.js';

const leftContainerSelector: consts.selector = '#left-sidebar-container';
const indexSelector: consts.selector = '[index]';
const dataOrderMaxSelector: consts.selector = '[data-order-max]';
const sidebarItemSelector: consts.selector = '.sidebar__item';
const dataMetaIdSelector: consts.selector = '[data-meta-id]';
const slideTunerCardSelector: consts.selector = '.slide-tuner__card';
const slideTunerItem: consts.selector = '.slide-tuner__item';

const indexAttr: consts.attribute = 'index';
const dataOrderMaxAttr: consts.attribute = 'data-order-max';
const dataMetaIdAttr: consts.attribute = 'data-meta-id';

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
        slide.rendered.title = slideData.data.title;

        const sidebarItem = new SidebarItem();
        sidebarItem.rendered.innerContent = await slide.render();

        leftSidebarContainer.append(await sidebarItem.render());
    }
}

//
//$(consts.selectors.globalMeta).on(consts.events.globalMeta__questionAdded, async function (e) {


//    //Сортировка
//    let sidebarChildren = Array.from($(consts.selectors.leftSidebarId).children());
//    //@ts-ignore
//    let sorted = sidebarChildren.sort(function (a, b) { return $(a).find('[data-meta-order]')[0].getAttribute('data-meta-order') - $(b).find('[data-meta-order]')[0].getAttribute('data-meta-order'); })
//    sorted.forEach(x => leftSidebar.append(x))
//});

$(leftContainerSelector).on('click', sidebarItemSelector, async function () {
    const slideTunerCard = $(slideTunerCardSelector);
    slideTunerCard.children().remove(slideTunerItem);

    const thisElement = $(this);
    const generator = new SlideTunerCardGenerator();
    const slideId = Number(thisElement.find(dataMetaIdSelector).attr(dataMetaIdAttr));
    const slideData = GlobalMeta.getSlideData(slideId);
    const data = slideData.data;

    for (let i in data) {
        await generator.addTextComponent(i, data[i], i);
    }

    const renderedCardChildren = await generator.render();

    slideTunerCard.append(renderedCardChildren);
    slideTunerCard.find(dataMetaIdSelector).attr(dataMetaIdAttr, slideId);
});