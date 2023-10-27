//@ts-check

import AvailableSlideControl from './blocks/available-slide/available-slide-control.js';
import SidebarItemControl from './blocks/sidebar/__item/sidebar__item-control.js';
import { GlobalMeta } from './shared/globalMeta.js';

$(async function () {

    let container = $('#left-sidebar-container');
    container = $('#right-sidebar-container');

    let sidebarItemControl = new SidebarItemControl();

    let availableSlideControl = new AvailableSlideControl();
    availableSlideControl.title = "Info slide";
    availableSlideControl.imageModifier = 'slide-wrapper__thumbnail-picture--info';
    availableSlideControl.schemeName = 'info';
    availableSlideControl.schemeContent = '{ "Title":"Skin twin questionnaire", "Subtitle":"<input />", "Infotitle":"How does skin twin work?", "Infotext":"tutinfotext", "Button next":"Вперед", "Button previous":"Назад" }';

    sidebarItemControl.innerContent = await availableSlideControl.getControl();
    container.append(await sidebarItemControl.getControl());

    let sidebarItemControl2 = new SidebarItemControl();

    let availableSlideControlQ = new AvailableSlideControl();
    availableSlideControlQ.title = "Question slide";
    availableSlideControlQ.imageModifier = 'slide-wrapper__thumbnail-picture--question';
    availableSlideControlQ.schemeName = 'question';
    availableSlideControlQ.schemeContent = '{ "Title":"Skin twin questionnaire", "Subtitle":"Подзаголовок", "Question":"Question here?", "Assistivetext":"addenda text", "Button next":"Вперед", "Button previous":"Назад" }';

    sidebarItemControl2.innerContent = await availableSlideControlQ.getControl();
    container.append(await sidebarItemControl2.getControl());

    GlobalMeta.initialize();

});

