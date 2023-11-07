var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import * as consts from '../shared/constants.js';
import IndexedSlide from './IndexedSlide.js';
import SidebarItem from './SidebarItem.js';
const leftContainerSelector = '#left-sidebar-container';
const indexSelector = '[index]';
const indexAttr = 'index';
const dataOrderMaxSelector = '[data-order-max]';
const dataOrderMaxAttr = 'data-order-max';
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
    static addIndexedSlide(slideData) {
        return __awaiter(this, void 0, void 0, function* () {
            const leftSidebarContainer = $(leftContainerSelector);
            const slide = new IndexedSlide();
            slide.rendered.index = 0;
            slide.rendered.imageModifier = consts.mapTypeToImageModifier(slideData.meta.type);
            slide.rendered.metaId = slideData.meta.id;
            slide.rendered.metaOrder = slideData.meta.order;
            slide.rendered.title = slideData.data.title;
            const sidebarItem = new SidebarItem();
            sidebarItem.rendered.innerContent = yield slide.render();
            leftSidebarContainer.append(yield sidebarItem.render());
        });
    }
}
//# sourceMappingURL=LeftSidebarContainer.js.map