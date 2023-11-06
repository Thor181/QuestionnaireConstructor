import * as consts from '../shared/constants.js';
import { SlideData } from '../shared/GlobalMeta.js';
import IndexedSlide from './IndexedSlide.js';
import SidebarItem from './SidebarItem.js';

const leftContainer: consts.selector = '#left-sidebar-container';


export class LeftSidebarContainer {


    static async addIndexedSlide(slideData: SlideData) {
        const leftSidebarContainer = $(leftContainer);

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

////создание итемов (IndexedSlide) при событии QuestionAdded
//$(consts.selectors.globalMeta).on(consts.events.globalMeta__questionAdded, async function (e) {

//    //@ts-ignore
//    let slide = new IndexSlideNewControl('0', questionData.data.Title, consts.typeToImageMap[questionData.meta.type], questionData.meta.id, questionData.meta.order);
//    let control = await slide.getControl();

//    let leftSidebar = $(consts.selectors.leftSidebarId);
//    let item = new SidebarItemControl();
//    item.innerContent = control;
//    leftSidebar.append(await item.getControl());

//    //Сортировка
//    let sidebarChildren = Array.from($(consts.selectors.leftSidebarId).children());
//    //@ts-ignore
//    let sorted = sidebarChildren.sort(function (a, b) { return $(a).find('[data-meta-order]')[0].getAttribute('data-meta-order') - $(b).find('[data-meta-order]')[0].getAttribute('data-meta-order'); })
//    sorted.forEach(x => leftSidebar.append(x))
//});