

import AvailableSlideControl from './blocks/available-slide/AvailableSlideControl.js';
import SidebarItemControl from './blocks/sidebar/__item/sidebar__item-control.js';
import consts from './shared/constsJ.js';
import { GlobalMeta } from './shared/globalMeta.js';
import AvailableSlide from './components/AvailableSlide.js';

$(async function () {

    let container = $('#left-sidebar-container');
    container = $('#right-sidebar-container');

    let sidebarItemControl = new SidebarItemControl();

    let infoSlide = new AvailableSlideControl();
    infoSlide.title = "Info slide";
    infoSlide.imageModifier = consts.typeToImageMap.info;
    infoSlide.schemeName = 'info';
    infoSlide.schemeContent = '{ "Title":"", "Subtitle":"", "Infotitle":"", "Infotext":"", "Button next":"", "Button previous":"" }';

    sidebarItemControl.innerContent = await infoSlide.getControl();
    container.append(await sidebarItemControl.getControl());

    let sidebarItemControl2 = new SidebarItemControl();

    let questionSlide = new AvailableSlideControl();
    questionSlide.title = "Question slide";
    questionSlide.imageModifier = consts.typeToImageMap.question;
    questionSlide.schemeName = 'question';
    questionSlide.schemeContent = '{ "Title":"", "Subtitle":"", "Question":"", "Assistivetext":"", "Button next":"", "Button previous":"" }';

    sidebarItemControl2.innerContent = await questionSlide.getControl();
    container.append(await sidebarItemControl2.getControl());

    let sidebarItemControl3 = new SidebarItemControl();

    let yesnoSlideNew = new AvailableSlide();

    let yesnoSlide = new AvailableSlideControl();

    yesnoSlide.title = "Yes/No slide";
    yesnoSlide.imageModifier = consts.typeToImageMap.yesno;
    yesnoSlide.schemeName = 'yesno';
    yesnoSlide.schemeContent = '{ "Title":"", "Subtitle":"", "Question":"", "Assistivetext":"", "Buttons": [{"Yes":"Yes", "value":1},{"No":"No", "value":2}], "Button next":"", "Button previous":"" }';

    sidebarItemControl3.innerContent = await yesnoSlide.getControl();
    container.append(await sidebarItemControl3.getControl());

    GlobalMeta.initialize();

});



