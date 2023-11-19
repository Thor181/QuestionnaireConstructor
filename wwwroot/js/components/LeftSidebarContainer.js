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
import { GlobalMeta } from '../shared/GlobalMeta.js';
import IndexedSlide from './IndexedSlide.js';
import IndexedSlideInterpretated from './IndexedSlideInterpretated.js';
import SidebarItem from './SidebarItem.js';
import SlideTunerCard, { waitFieldsetInnerContent } from './SlideTunerCard.js';
import SlideTunerCardGenerator from './SlideTunerCardGenerator.js';
const leftContainerSelector = '#left-sidebar-container';
const indexSelector = '[index]';
const dataOrderMaxSelector = '[data-order-max]';
const sidebarItemSelector = '.sidebar__item';
const dataMetaIdSelector = '[data-meta-id]';
const dataMetaOrderSelector = '[data-meta-order]';
const slideTunerCardSelector = '.slide-tuner__card';
const slideTunerItem = '.slide-tuner__item';
const dataKindSelector = '[data-kind]';
const globalMeta = '#global-meta';
const indexAttr = 'index';
const dataOrderMaxAttr = 'data-order-max';
const dataMetaIdAttr = 'data-meta-id';
const dataMetaOrderAttr = 'data-meta-order';
const dataKindAttr = 'data-kind';
const dataOrderMax = 'data-order-max';
const slideUpdatedEvent = 'SlideUpdated';
const textType = 'text';
const nextPrevButtonsType = 'nextprevbuttons';
const removebtnType = 'removebtn';
const buttonsType = 'buttons';
const multiselectType = 'multiselect';
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
            slide.rendered.title = slideData.data.Title;
            const sidebarItem = new SidebarItem();
            sidebarItem.rendered.innerContent = yield slide.render();
            leftSidebarContainer.append(yield sidebarItem.render());
            let sidebarChildren = Array.from(leftSidebarContainer.children());
            let sorted = sidebarChildren.sort(function (a, b) {
                return $(a).find(dataMetaOrderSelector)[0].getAttribute(dataMetaOrderAttr) - $(b).find(dataMetaOrderSelector)[0].getAttribute(dataMetaOrderAttr);
            });
            sorted.forEach(x => leftSidebarContainer.append(x));
        });
    }
    static removeItem(id) {
        let a = consts.combine('data-meta-id', id.toString());
        $(leftContainerSelector).children(sidebarItemSelector).has(a).remove();
    }
    static getOrderMax() {
        const leftSidebarContainer = document.querySelector(leftContainerSelector);
        return Number(leftSidebarContainer.getAttribute(dataOrderMax));
    }
}
$(leftContainerSelector).on('click', sidebarItemSelector, function () {
    return __awaiter(this, void 0, void 0, function* () {
        waitFieldsetInnerContent();
        const inter = new IndexedSlideInterpretated($(this).children().first());
        const slideTunerCard = $(slideTunerCardSelector);
        SlideTunerCard.clear();
        const slideId = inter.getMetaDataId();
        const slideData = GlobalMeta.getSlideData(slideId);
        const generator = new SlideTunerCardGenerator();
        const data = slideData.data;
        for (let propName in data) {
            let type = consts.renderTypes.getValueByKey(propName);
            if (type == textType) {
                yield generator.addTextComponent(propName, data[propName], propName);
            }
            else if (type == nextPrevButtonsType) {
                let buttonsInfo = data[propName];
                let nextBtnInfo = buttonsInfo[0];
                let nextBtnTitle = Object.keys(nextBtnInfo)[0];
                let nextBtn = { title: nextBtnTitle, inputValue: nextBtnInfo[nextBtnTitle], placeholder: nextBtnTitle };
                let prevBtnInfo = buttonsInfo[1];
                let prevBtnTitle = Object.keys(prevBtnInfo)[0];
                let prevBtn = { title: prevBtnTitle, inputValue: prevBtnInfo[prevBtnTitle], placeholder: prevBtnTitle };
                yield generator.addButtonsNextAndPrevious(nextBtn, prevBtn);
            }
            else if (type == buttonsType) {
                let buttons = data[propName];
                let buttonsConfigs = [];
                for (var i = 0; i < buttons.length; i++) {
                    let button = buttons[i];
                    let buttonKeys = Object.keys(button);
                    let notValueKey = buttonKeys.find(x => x != 'Value');
                    let removable = slideData.meta.type == multiselectType && i > 0;
                    let config = { title: notValueKey, inputValue: button[notValueKey], placeholder: notValueKey, removable: removable };
                    buttonsConfigs.push(config);
                }
                yield generator.addButtons(buttonsConfigs, 'Variants', slideData.meta.type == multiselectType);
            }
        }
        yield generator.addRemoveButton();
        const renderedCardChildren = yield generator.render();
        slideTunerCard.append(renderedCardChildren);
        SlideTunerCard.setDataMetaId(slideId);
        inter.setSelectedStatus();
    });
});
$(globalMeta).on(slideUpdatedEvent, function (e) {
    const detail = e.detail;
    const data = GlobalMeta.getSlideData(detail.slideId);
    let item = $(leftContainerSelector).find(consts.combine(dataMetaIdAttr, detail.slideId));
    let titleElement = item.siblings().find(consts.combine(dataKindAttr, 'title'));
    titleElement.text(data.data.Title);
});
//# sourceMappingURL=LeftSidebarContainer.js.map