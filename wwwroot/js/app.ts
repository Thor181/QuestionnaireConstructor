import AvailableSlide from './components/AvailableSlide.js';
import SidebarItem from './components/SidebarItem.js'
import { GlobalMeta } from './shared/GlobalMeta.js';

$(async function () {

    let container = $('#right-sidebar-container');

    let infoAvailableSlide = new AvailableSlide();
    infoAvailableSlide.rendered.title = 'Info slide';
    infoAvailableSlide.rendered.imageModifier = 'slide-wrapper__thumbnail-picture--info';
    infoAvailableSlide.rendered.schemeName = 'info';
    infoAvailableSlide.rendered.schemeContent = '{ "Title":"", "Subtitle":"", "Infotitle":"", "Infotext":"", "Button next":"", "Button previous":"" }';

    let sidebarItemControl = new SidebarItem();
    sidebarItemControl.rendered.innerContent = await infoAvailableSlide.render();

    container.append(await sidebarItemControl.render());

    GlobalMeta.initialize();
});