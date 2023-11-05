import * as consts from '../shared/constants.js';
import { GlobalMeta, QuestionData } from '../shared/GlobalMeta.js';
import generateRandomNumber from '../shared/random.js';

const rightContainer: consts.selector = '#right-sidebar-container';
const plusButton: consts.selector = '.plus-button';
const slideWrapper: consts.selector = '.slide-wrapper';
const dataSchemeName: consts.selector = '[data-schemeName]';
const leftContainer: consts.selector = '#left-sidebar-container';
const dataOrderMax: consts.attributes = 'data-order-max';

const leftSidebarContainer = document.querySelector(leftContainer);

$(rightContainer).on('click', plusButton, async function () {
    let schemeTag = $(this).closest(slideWrapper).find(dataSchemeName);
    let schemeName = schemeTag.attr(dataSchemeName);
    let schemeContent = JSON.parse(schemeTag.html());

    let order = getOrderMax();
    let qData = new QuestionData();
    qData.meta.id = generateRandomNumber();
    qData.meta.type = schemeName;
    qData.data = schemeContent;
    qData.meta.order = order + 1;

    GlobalMeta.addOrUpdateQuestion(qData)
});

export function getOrderMax() {
    return Number(leftSidebarContainer.getAttribute(dataOrderMax));
}