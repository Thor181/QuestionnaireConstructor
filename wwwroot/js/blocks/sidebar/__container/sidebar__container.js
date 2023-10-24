//@ts-check

import consts from "../../../shared/consts.js";

let sidebar = document.querySelector(consts.selectors.leftSidebarId);

let leftSidebarMutationObserver = new MutationObserver((mr, o) => {
    let indexSpan = $(sidebar).find(consts.selectors.index)

    for (var i = 0; i < indexSpan.length; i++) {
        let item = indexSpan.eq(i);
        item.text(i + 1);
        item.attr(consts.attributes.index, i + 1);
    }
});

leftSidebarMutationObserver.observe(sidebar, {childList: true});

