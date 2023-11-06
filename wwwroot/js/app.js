var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import AvailableSlide from './components/AvailableSlide.js';
import SidebarItem from './components/SidebarItem.js';
import { GlobalMeta } from './shared/GlobalMeta.js';
$(function () {
    return __awaiter(this, void 0, void 0, function* () {
        let container = $('#right-sidebar-container');
        let infoAvailableSlide = new AvailableSlide();
        infoAvailableSlide.rendered.title = 'Info slide';
        infoAvailableSlide.rendered.imageModifier = 'slide-wrapper__thumbnail-picture--info';
        infoAvailableSlide.rendered.schemeName = 'info';
        infoAvailableSlide.rendered.schemeContent = '{ "Title":"", "Subtitle":"", "Infotitle":"", "Infotext":"", "Button next":"", "Button previous":"" }';
        let sidebarItemControl = new SidebarItem();
        sidebarItemControl.rendered.innerContent = yield infoAvailableSlide.render();
        container.append(yield sidebarItemControl.render());
        GlobalMeta.initialize();
    });
});
//# sourceMappingURL=app.js.map