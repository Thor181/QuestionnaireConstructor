//@ts-check

import consts from "../../../shared/consts.js";
import { GlobalMeta } from "../../../shared/globalMeta.js";
import IndexSlideNewControl from "../../base/IndexedSlideNewControl.js";
import IndexedSlideControl from "../../indexed-slide/indexed-slide-control.js";
import SidebarItemControl from "../__item/sidebar__item-control.js";

let sidebar = document.querySelector(consts.selectors.leftSidebarId);

let leftSidebarMutationObserver = new MutationObserver((mr, o) => {
    let indexSpan = $(sidebar).find(consts.selectors.index)

    for (var i = 0; i < indexSpan.length; i++) {
        let item = indexSpan.eq(i);
        item.text(i + 1);
        item.attr(consts.attributes.index, i + 1);
    }
});

leftSidebarMutationObserver.observe(sidebar, { childList: true });

//создание итемов (IndexedSlide) при событии QuestionAdded
$(consts.selectors.globalMeta).on(consts.events.globalMeta__questionAdded, async function (e) {
    let questionData = GlobalMeta.getQuestion(e.detail.questionId)

    if (questionData == null) {
        console.log('В хранилище не найдена запись для ID: ' + e.detail.questionId)
        return;
    }

    let slide = new IndexSlideNewControl(0, questionData.data.Title, consts.typeToImageMap[questionData.meta.type], questionData.meta.id);
    let control = await slide.getControl();

    let item = new SidebarItemControl();
    item.innerContent = control;

    $(consts.selectors.leftSidebarId).append(await item.getControl());
});

