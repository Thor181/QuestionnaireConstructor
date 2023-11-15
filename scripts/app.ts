import AvailableSlide from './components/AvailableSlide.js';
import SidebarItem from './components/SidebarItem.js'
import { GlobalMeta } from './shared/GlobalMeta.js';
 
$(async function () {
    let container = $('#right-sidebar-container');

    let infoAvailableSlide = new AvailableSlide();
    infoAvailableSlide.rendered.title = 'Info slide';
    infoAvailableSlide.rendered.imageModifier = 'slide-wrapper__thumbnail-picture--info';
    infoAvailableSlide.rendered.schemeName = 'info';
    infoAvailableSlide.rendered.schemeContent = '{ "Title":"", "Subtitle":"", "Infotitle":"", "Infotext":"", "NextPrevButtons": [{"Button next":"asdz"}, {"Button previous":"" }] }';

    let sidebarItemControl = new SidebarItem();
    sidebarItemControl.rendered.innerContent = await infoAvailableSlide.render();

    container.append(await sidebarItemControl.render());

    let questionAvailableSlide = new AvailableSlide();
    questionAvailableSlide.rendered.title = 'Question slide';
    questionAvailableSlide.rendered.imageModifier = 'slide-wrapper__thumbnail-picture--question';
    questionAvailableSlide.rendered.schemeName = 'question';
    questionAvailableSlide.rendered.schemeContent = '{ "Title":"", "Subtitle":"", "Question":"", "Assistive text":"", "Buttons": [ {"Yes": "Yes", "Value": 1}, {"No": "No", "Value": 2}], "NextPrevButtons": [{"Button next":"asdz"}, {"Button previous":"" }] }';

    let sidebarItemControl2 = new SidebarItem();
    sidebarItemControl2.rendered.innerContent = await questionAvailableSlide.render();

    container.append(await sidebarItemControl2.render());

    let multiSelectionAvailableSlide = new AvailableSlide();
    multiSelectionAvailableSlide.rendered.title = 'Multi selection slide';
    multiSelectionAvailableSlide.rendered.imageModifier = 'slide-wrapper__thumbnail-picture--multi';
    multiSelectionAvailableSlide.rendered.schemeName = 'multiselect';
    multiSelectionAvailableSlide.rendered.schemeContent = '{ "Title":"", "Subtitle":"", "Question":"", "Assistive text":"", "Buttons": [ {"Variant1": "Variant1", "Value": 1}], "NextPrevButtons": [{"Button next":"asdz"}, {"Button previous":"" }], "Multiselect": true }';

    let sidebarItemControl3 = new SidebarItem();
    sidebarItemControl3.rendered.innerContent = await multiSelectionAvailableSlide.render();

    container.append(await sidebarItemControl3.render());

    GlobalMeta.initialize();
});