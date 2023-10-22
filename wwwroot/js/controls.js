
//@ts-check


import { getControl, sidebar__item, sidebar__item2, slide_wrapper } from './blocks.js'
getControl('/controls/blocks/slide-wrapper/slide-wrapper.html', { A: 1, B: 'asd' });

document.addEventListener('DOMContentLoaded', async () => {
    let container = $('#left-sidebar-container');

    for (var i = 0; i < 10; i++) {
        let wrapper = slide_wrapper(i + 1, "Hello");
        let item = await sidebar__item(wrapper);

        container.append(item);
    }
});

    