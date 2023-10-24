//@ts-check

import AvailableSlideControl from './blocks/available-slide/available-slide-control.js';
import InputTitleControl from './blocks/input-title/input-title.js';
import SidebarItemControl from './blocks/sidebar/__item/sidebar__item-control.js';
import SlideTunerItem from './blocks/slide-tuner/__item/slide-tuner__item.js';
import consts from './shared/consts.js';

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
    a.schemeContent = '{ "title":"myquiz", "subtitle":"myquizsubtitle" }';

    sidebarItemControl.innerContent = await a.getControl();
    container.append(await sidebarItemControl.getControl());
    container.append(await sidebarItemControl.getControl());
    container.append(await sidebarItemControl.getControl());
});


$(consts.selectors.leftSidebarId).on('click', consts.selectors.sidebarItemClass, async function () {
    let obj = $(this).find(consts.selectors.schemeName);
    let schemeName = obj.attr(consts.attributes.dataSchemeName);
    let schemeContent = obj.text();
    console.log(schemeName)
    console.log(schemeContent)

    let parsed = JSON.parse(schemeContent);
    let inputTitle = new InputTitleControl();
    for (let p in parsed) {
        /**@type {InputTitleControl}*/
        let controlClass = new consts.controlsMap[p];
        console.log(controlClass)
        console.log(parsed)

        for (var i in parsed) {
            controlClass[i] = parsed[i];
        }

        let control = await controlClass.getInputControl();

        let slideTunerItem = new SlideTunerItem();
        slideTunerItem.innerContent = control;

        $('.slide-tuner__card').append(await slideTunerItem.getControl());
    }

});