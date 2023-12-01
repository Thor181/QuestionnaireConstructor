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
        yield createAvailableSlide('Info slide', 'slide-wrapper__thumbnail-picture--info', 'info', '{ "Title":"", "Subtitle":"", "Infotitle":"", "Infotext":"", "NextPrevButtons": [{"Button next":"Continue"}, {"Button previous":"Back" }] }', container);
        yield createAvailableSlide('Question slide', 'slide-wrapper__thumbnail-picture--question', 'question', '{ "Title":"", "Subtitle":"", "Question":"", "Assistive text":"", "Buttons": [ {"Variant 1": "Yes", "Value": 1}, {"Variant 2": "No", "Value": 2}], "NextPrevButtons": [{"Button next":"Continue"}, {"Button previous":"Back" }] }', container);
        yield createAvailableSlide('Multi selection slide', 'slide-wrapper__thumbnail-picture--multi', 'multiselect', '{ "Title":"", "Subtitle":"", "Question":"", "Assistive text":"", "Buttons": [ {"Variant 1": "Variant1", "Value": 1},{"Variant 2": "Variant1", "Value": 2},{"Variant 3": "Variant1", "Value": 3}], "Single select": true, "NextPrevButtons": [{"Button next":"Continue"}, {"Button previous":"Back" }] }', container);
        yield createAvailableSlide('Image selection slide', 'slide-wrapper__thumbnail-picture--image', 'imageselection', '{ "Title":"", "Subtitle":"", "Question":"", "Assistive text":"", "ImageButtons": [ {"Variant 1": "Variant1", "Value": 1, "ImagePath": ""},{"Variant 2": "Variant1", "Value": 2, "ImagePath": ""},{"Variant 3": "Variant1", "Value": 3, "ImagePath": ""}], "Single select": true, "NextPrevButtons": [{"Button next":"Continue"}, {"Button previous":"Back" }] }', container);
        yield createAvailableSlide('Skin color selection slide', 'slide-wrapper__thumbnail-picture--skincolor', 'skincolor', '{ "Title":"", "Subtitle":"", "Question":"", "Assistive text":"", "NextPrevButtons": [{"Button next":"Continue"}, {"Button previous":"Back" }] }', container);
        yield createAvailableSlide('Color selection slide', 'slide-wrapper__thumbnail-picture--color', 'color', '{ "Title":"", "Subtitle":"", "Question":"", "Assistive text":"", "Color buttons":[ {"Color":"#fae3c9", "Value": 1}, {"Color":"#8fffff", "Value": 2}, {"Color":"#aaaaaa", "Value": 3} ], "NextPrevButtons": [{"Button next":"Continue"}, {"Button previous":"Back" }] }', container);
        yield createAvailableSlide('User input slide', 'slide-wrapper__thumbnail-picture--input', 'input', '{ "Title":"", "Subtitle":"", "Question":"", "Assistive text":"", "NextPrevButtons": [{"Button next":"Continue"}, {"Button previous":"Back" }] }', container);
        yield createAvailableSlide('Selection with user input', 'slide-wrapper__thumbnail-picture--input-select', 'input-select', '{ "Title":"", "Subtitle":"", "Question":"", "Assistive text":"", "Other variant": "Other", "Buttons": [ {"Variant 1": "Variant1", "Value": 1},{"Variant 2": "Variant1", "Value": 2},{"Variant 3": "Variant1", "Value": 3}], "Single select": true, "NextPrevButtons": [{"Button next":"Continue"}, {"Button previous":"Back" }] }', container);
        yield createAvailableSlide('Image upload with user input', 'slide-wrapper__thumbnail-picture--image-input', 'image-input', '{ "Title":"", "Subtitle":"", "Question":"", "Assistive text":"", "NextPrevButtons": [{"Button next":"Continue"}, {"Button previous":"Back" }] }', container);
        yield createAvailableSlide('Coupon slide', 'slide-wrapper__thumbnail-picture--coupon', 'coupon', '{ "Title":"", "Subtitle":"", "Infotitle":"", "Infotext":"", "Coupon": "", "NextPrevButtons": [{"Button next":"Continue"}, {"Button previous":"Back" }] }', container);
        GlobalMeta.initialize();
    });
});
function createAvailableSlide(title, imagePath, schemeName, schemeContent, container) {
    return __awaiter(this, void 0, void 0, function* () {
        let slide = new AvailableSlide();
        slide.rendered.title = title;
        slide.rendered.imageModifier = imagePath;
        slide.rendered.schemeName = schemeName;
        slide.rendered.schemeContent = schemeContent;
        let sidebarItem = new SidebarItem();
        sidebarItem.rendered.innerContent = yield slide.render();
        container.append(yield sidebarItem.render());
    });
}
$('#save-quiz').on('click', function () {
    return __awaiter(this, void 0, void 0, function* () {
        let data = GlobalMeta.getEntireData();
        let body = { data: data };
        let jsonBody = JSON.stringify(body);
        let result = yield fetch('/api/quiz/save', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: jsonBody
        });
        console.log(result);
    });
});
//# sourceMappingURL=app.js.map