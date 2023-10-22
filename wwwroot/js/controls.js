//@ts-check

import available_slide from './blocks/available-slide/available-slide.js';
import indexed_slide from './blocks/indexed-slide/indexed-slide.js';
import sidebar__item from './blocks/sidebar/__item/sidebar__item.js'

$(async function () {
    let container = $('#left-sidebar-container');
    //for (var i = 0; i < 10; i++) {
    //    let wrapper = await indexed_slide(i, 'indexed slide', 'slide-wrapper__thumbnail-picture--info', "asd,", "zxc");
    //    let item = await sidebar__item(wrapper);

    //    container.append(item);
    //}


    container = $('#right-sidebar-container');

    let availableSlide = await available_slide("Info slide" + 1, 'slide-wrapper__thumbnail-picture--info', a, 'info', '{ "title":"myquiz", "subtitle":" " }');
    let item = await sidebar__item(availableSlide);

    container.append(item);

    let availableSlide2 = await available_slide("Info slide" + 2, 'slide-wrapper__thumbnail-picture--info', a, 'info', '{ "title":"myquiz", "subtitle":" " }');
    let item2 = await sidebar__item(availableSlide2);

    container.append(item2);
});

async function a() {
    const indexedEl = await indexed_slide(1, 'indexed slide', 'slide-wrapper__thumbnail-picture--info', "asd,", "zxc");
    $('#left-sidebar-container').append(indexedEl)
}