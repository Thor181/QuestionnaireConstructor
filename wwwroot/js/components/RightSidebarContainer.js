var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { GlobalMeta, SlideData } from '../shared/GlobalMeta.js';
import generateRandomNumber from '../shared/random.js';
import { generateSlideTunerCard, LeftSidebarContainer } from './LeftSidebarContainer.js';
const rightContainer = '#right-sidebar-container';
const plusButton = '.plus-button';
const slideWrapper = '.slide-wrapper';
const dataSchemeName = '[data-schemename]';
const leftContainer = '#left-sidebar-container';
const dataOrderMax = 'data-order-max';
const globalMeta = "#global-meta";
const dataSchemeNameAttr = 'data-schemename';
$(rightContainer).on('click', '.slide-wrapper', function () {
    return __awaiter(this, void 0, void 0, function* () {
        let schemeElement = $(this).closest(slideWrapper).find(dataSchemeName);
        let schemeName = schemeElement.attr(dataSchemeNameAttr);
        let schemeContent = JSON.parse(schemeElement.html());
        let existingOrder = LeftSidebarContainer.getOrderMax();
        let slideId = generateRandomNumber(GlobalMeta.getIds());
        let slideData = new SlideData();
        slideData.data = schemeContent;
        slideData.meta.id = slideId;
        slideData.meta.type = schemeName;
        slideData.meta.order = existingOrder + 1;
        GlobalMeta.addOrUpdateSlideData(slideData);
        yield generateSlideTunerCard(slideId);
    });
});
//# sourceMappingURL=RightSidebarContainer.js.map