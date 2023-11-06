var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import consts from "../../shared/constsJ.js";
import { GlobalMeta } from "../../shared/GlobalMeta.js";
import BaseNewControl from "./BaseNewControl.js";
export default class IndexSlideNewControl extends BaseNewControl {
    constructor(index, title, imageModifier, metaId, metaOrder) {
        super('/controls/blocks/indexed-slide/indexed-slide.html', { index, title, imageModifier, metaId, metaOrder });
    }
}
$(consts.selectors.leftSidebarId).on('click', consts.selectors.sidebarItemClass, function () {
    return __awaiter(this, void 0, void 0, function* () {
    });
});
function changeSelectedStatus(selectedObject) {
    $(consts.selectors.leftSidebarId).find(consts.selectors.sidebarItemClass).removeClass(consts.classes.sidebarItemSelected);
    selectedObject.addClass(consts.classes.sidebarItemSelected);
}
$(consts.selectors.globalMeta).on(consts.events.globalMeta__questionUpdated, function (e) {
    const id = e.detail.questionId;
    const data = GlobalMeta.getSlideData(id);
    $(consts.selectors.leftSidebarId).find(consts.selectors.getDataMetaId(id)).siblings(consts.selectors.slideWrapperThumbnailClass)
        .find(consts.selectors.slideWrapperThumbnailTitleClass)
        .text(data.data.Title);
});
//# sourceMappingURL=IndexedSlideNewControl.js.map