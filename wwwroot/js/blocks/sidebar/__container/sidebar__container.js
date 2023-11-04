//@ts-check

import consts from "../../../shared/consts.js";
import { GlobalMeta, QuestionData } from "../../../shared/globalMeta.js";
import generateRandomNumber from "../../../shared/random.js";
import IndexSlideNewControl from "../../base/IndexedSlideNewControl.js";
import SidebarItemControl from "../__item/sidebar__item-control.js";

let sidebar = document.querySelector(consts.selectors.leftSidebarId);

let leftSidebarMutationObserver = new MutationObserver((mr, o) => {
    let indexSpan = $(sidebar).find(consts.selectors.index)

    let i = 0;
    while (i < indexSpan.length) {
        let item = indexSpan.eq(i);
        item.text(i + 1);
        item.attr(consts.attributes.index, i + 1);
        i++;
    }
    sidebar.setAttribute(consts.attributes.dataOrderMax, i);
});

leftSidebarMutationObserver.observe(sidebar, { childList: true });

export function getOrderMax() {
    return Number(sidebar.getAttribute(consts.attributes.dataOrderMax));
}

//создание итемов (IndexedSlide) при событии QuestionAdded
$(consts.selectors.globalMeta).on(consts.events.globalMeta__questionAdded, async function (e) {
    let questionData = GlobalMeta.getSlide(e.detail.questionId)

    if (questionData == null) {
        console.log('В хранилище не найдена запись для ID: ' + e.detail.questionId)
        return;
    }

    let slide = new IndexSlideNewControl(0, questionData.data.Title, consts.typeToImageMap[questionData.meta.type], questionData.meta.id, questionData.meta.order);
    let control = await slide.getControl();

    let leftSidebar = $(consts.selectors.leftSidebarId);
    let item = new SidebarItemControl();
    item.innerContent = control;
    leftSidebar.append(await item.getControl());

    //Сортировка
    let sidebarChildren = Array.from($(consts.selectors.leftSidebarId).children());
    let sorted = sidebarChildren.sort(function (a, b) { return $(a).find('[data-meta-order]')[0].getAttribute('data-meta-order') - $(b).find('[data-meta-order]')[0].getAttribute('data-meta-order'); })
    sorted.forEach(x => leftSidebar.append(x))
});

$(consts.selectors.rightSidebarId).on('click', consts.selectors.plusButtonClass, async function (e) {

    let schemeTag = $(this).closest(consts.selectors.slideWrapperClass).find(consts.selectors.dataSchemeName);

    let schemeName = schemeTag.attr(consts.attributes.dataSchemeName);
    let schemeContent = JSON.parse(schemeTag.html());

    let order = getOrderMax();

    let qData = new QuestionData();
    qData.meta.id = generateRandomNumber();
    qData.meta.type = schemeName;
    qData.data = schemeContent;
    qData.meta.order = order + 1;

    GlobalMeta.addOrUpdateQuestion(qData)
});

