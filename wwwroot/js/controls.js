//@ts-check

import AvailableSlideControl from './blocks/available-slide/available-slide-control.js';
import SidebarItemControl from './blocks/sidebar/__item/sidebar__item-control.js';

$(async function () {
    let container = $('#left-sidebar-container');
    //for (var i = 0; i < 10; i++) {
    //    let wrapper = await indexed_slide(i, 'indexed slide', 'slide-wrapper__thumbnail-picture--info', "asd,", "zxc");
    //    let item = await sidebar__item(wrapper);

    //    container.append(item);
    //}
    container = $('#right-sidebar-container');

    let sidebarItemControl = new SidebarItemControl();

    let availableSlideControl = new AvailableSlideControl();
    availableSlideControl.title = "Info slide" + 1;
    availableSlideControl.imageModifier = 'slide-wrapper__thumbnail-picture--info';
    availableSlideControl.schemeName = 'info';
    availableSlideControl.schemeContent = '{ "title":"myquiz", "subtitle":" " }';

    sidebarItemControl.innerContent = await availableSlideControl.getControl();
    container.append(await sidebarItemControl.getControl());

    let a = new AvailableSlideControl();
    a.title = "Info slide" + 1;
    a.imageModifier = 'slide-wrapper__thumbnail-picture--info';
    a.schemeName = 'info';
    a.schemeContent = '{ "title":"myquiz", "subtitle":" " }';

    sidebarItemControl.innerContent = await a.getControl();
    container.append(await sidebarItemControl.getControl());
    container.append(await sidebarItemControl.getControl());
    container.append(await sidebarItemControl.getControl());
});