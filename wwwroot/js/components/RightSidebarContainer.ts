import * as consts from '../shared/constants.js';
import { EventData, GlobalMeta, SlideData } from '../shared/GlobalMeta.js';
import generateRandomNumber from '../shared/random.js';
import { generateSlideTunerCard, LeftSidebarContainer } from './LeftSidebarContainer.js';

const rightContainer: consts.selector = '#right-sidebar-container';
const plusButton: consts.selector = '.plus-button';
const slideWrapper: consts.selector = '.slide-wrapper';
const dataSchemeName: consts.selector = '[data-schemename]';
const leftContainer: consts.selector = '#left-sidebar-container';
const dataOrderMax: consts.attribute = 'data-order-max';
const globalMeta: consts.selector = "#global-meta";
const dataSchemeNameAttr: consts.attribute = 'data-schemename';

//Клик по Plus button в правом сайдбаре
$(rightContainer).on('click', '.slide-wrapper', async function () {
    let schemeElement = $(this).closest(slideWrapper).find(dataSchemeName);

    let schemeName = schemeElement.attr(dataSchemeNameAttr);
    let schemeContent = JSON.parse(schemeElement.html());

    let existingOrder = LeftSidebarContainer.getOrderMax();

    let slideId = generateRandomNumber(GlobalMeta.getIds());
    let slideData = new SlideData();
    slideData.data = schemeContent;
    slideData.meta.id = slideId;
    slideData.meta.type = schemeName;
    slideData.meta.order = existingOrder + 1;

    GlobalMeta.addOrUpdateSlideData(slideData)

    await generateSlideTunerCard(slideId);
    
    //setTimeout(() => {

    //    let item = $(leftContainer).find(`[data-meta-id="${slideId}"]`);
    //    let parent = item.parent();
    //    parent.trigger('click');
    //}, 300);
    
});

