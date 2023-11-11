import AvailableSlide from './components/AvailableSlide.js';
import SidebarItem from './components/SidebarItem.js'
import { GlobalMeta } from './shared/GlobalMeta.js';

$(async function () {

    let container = $('#right-sidebar-container');

    let infoAvailableSlide = new AvailableSlide();
    infoAvailableSlide.rendered.title = 'Info slide';
    infoAvailableSlide.rendered.imageModifier = 'slide-wrapper__thumbnail-picture--info';
    infoAvailableSlide.rendered.schemeName = 'info';
    infoAvailableSlide.rendered.schemeContent = '{ "Title":"", "Subtitle":"", "Infotitle":"", "Infotext":"", "NextPrevButtons": [ {"Button next":""}, {"Button previous":"" }] }';

    let sidebarItemControl = new SidebarItem();
    sidebarItemControl.rendered.innerContent = await infoAvailableSlide.render();

    container.append(await sidebarItemControl.render());

    let questionAvailableSlide = new AvailableSlide();
    questionAvailableSlide.rendered.title = 'Question slide';
    questionAvailableSlide.rendered.imageModifier = 'slide-wrapper__thumbnail-picture--question';
    questionAvailableSlide.rendered.schemeName = 'question';
    questionAvailableSlide.rendered.schemeContent = '{ "Title":"", "Subtitle":"", "Question":"", "Assistive text":"", "Button next":"", "Button previous":"" }';

    let sidebarItemControl2 = new SidebarItem();
    sidebarItemControl2.rendered.innerContent = await questionAvailableSlide.render();

    container.append(await sidebarItemControl2.render());

    GlobalMeta.initialize();
});