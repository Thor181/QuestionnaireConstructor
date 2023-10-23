//@ts-check

import consts from "../../../shared/consts.js";

let sidebar = document.querySelector(consts.selectors.leftSidebarId);

let leftSidebarMutationObserver = new MutationObserver((mr, o) => {
    let c = $(sidebar).find('[index]')

    for (var i = 0; i < c.length; i++) {
        c.eq(i).text(i +1);
    }
});

leftSidebarMutationObserver.observe(sidebar, {childList: true});

