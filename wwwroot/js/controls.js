//@ts-check

import AvailableSlideControl from './blocks/available-slide/available-slide-control.js';
import ControlBuilder from './blocks/base/ControlBuilder.js';
import DynamicallyGeneratedControl from './blocks/base/DynamicallyGeneratedControl.js';
import InputTitleControl from './blocks/input-title/input-title.js';
import SidebarItemControl from './blocks/sidebar/__item/sidebar__item-control.js';
import SlideTunerItem from './blocks/slide-tuner/__item/slide-tuner__item.js';
import consts from './shared/consts.js';

$(async function () {
    let container = $('#left-sidebar-container');
    container = $('#right-sidebar-container');

    let sidebarItemControl = new SidebarItemControl();

    let availableSlideControl = new AvailableSlideControl();
    availableSlideControl.title = "Info slide";
    availableSlideControl.imageModifier = 'slide-wrapper__thumbnail-picture--info';
    availableSlideControl.schemeName = 'info';
    availableSlideControl.schemeContent = '{ "Title":"Skin twin questionnaire", "Subtitle":"Up to 42 questions", "Infotitle":"How does skin twin work?", "Infotext":"tutinfotext" }';

    sidebarItemControl.innerContent = await availableSlideControl.getControl();
    container.append(await sidebarItemControl.getControl());
});

