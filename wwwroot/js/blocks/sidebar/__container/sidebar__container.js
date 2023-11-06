var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import consts from "../../../shared/constsJ.js";
import { GlobalMeta, SlideData } from "../../../shared/GlobalMeta.js";
import generateRandomNumber from "../../../shared/random.js";
import IndexSlideNewControl from "../../base/IndexedSlideNewControl.js";
import SidebarItemControl from "../__item/sidebar__item-control.js";
let sidebar = document.querySelector(consts.selectors.leftSidebarId);
let leftSidebarMutationObserver = new MutationObserver((mr, o) => {
    let indexSpan = $(sidebar).find(consts.selectors.index);
    let i = 0;
    while (i < indexSpan.length) {
        let item = indexSpan.eq(i);
        item.text(i + 1);
        item.attr(consts.attributes.index, i + 1);
        i++;
    }
    sidebar.setAttribute(consts.attributes.dataOrderMax, i.toString());
});
leftSidebarMutationObserver.observe(sidebar, { childList: true });
export function getOrderMax() {
    return Number(sidebar.getAttribute(consts.attributes.dataOrderMax));
}
$(consts.selectors.globalMeta).on(consts.events.globalMeta__questionAdded, function (e) {
    return __awaiter(this, void 0, void 0, function* () {
        let questionData = GlobalMeta.getSlideData(e.detail.questionId);
        if (questionData == null) {
            console.log('В хранилище не найдена запись для ID: ' + e.detail.questionId);
            return;
        }
        let slide = new IndexSlideNewControl('0', questionData.data.Title, consts.typeToImageMap[questionData.meta.type], questionData.meta.id, questionData.meta.order);
        let control = yield slide.getControl();
        let leftSidebar = $(consts.selectors.leftSidebarId);
        let item = new SidebarItemControl();
        item.innerContent = control;
        leftSidebar.append(yield item.getControl());
        let sidebarChildren = Array.from($(consts.selectors.leftSidebarId).children());
        let sorted = sidebarChildren.sort(function (a, b) { return $(a).find('[data-meta-order]')[0].getAttribute('data-meta-order') - $(b).find('[data-meta-order]')[0].getAttribute('data-meta-order'); });
        sorted.forEach(x => leftSidebar.append(x));
    });
});
$(consts.selectors.rightSidebarId).on('click', consts.selectors.plusButtonClass, function (e) {
    return __awaiter(this, void 0, void 0, function* () {
        let schemeTag = $(this).closest(consts.selectors.slideWrapperClass).find(consts.selectors.dataSchemeName);
        let schemeName = schemeTag.attr(consts.attributes.dataSchemeName);
        let schemeContent = JSON.parse(schemeTag.html());
        let order = getOrderMax();
        let qData = new SlideData();
        qData.meta.id = generateRandomNumber();
        qData.meta.type = schemeName;
        qData.data = schemeContent;
        qData.meta.order = order + 1;
        GlobalMeta.addOrUpdateSlideData(qData);
    });
});
//# sourceMappingURL=sidebar__container.js.map