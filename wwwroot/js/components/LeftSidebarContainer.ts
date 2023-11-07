import * as consts from '../shared/constants.js';
import { SlideData } from '../shared/GlobalMeta.js';
import IndexedSlide from './IndexedSlide.js';
import SidebarItem from './SidebarItem.js';

const leftContainerSelector: consts.selector = '#left-sidebar-container';
const indexSelector: consts.selector = '[index]';
const indexAttr: consts.attribute = 'index';
const dataOrderMaxSelector: consts.selector = '[data-order-max]';
const dataOrderMaxAttr: consts.attribute = 'data-order-max';

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