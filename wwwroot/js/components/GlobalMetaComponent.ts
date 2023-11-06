import * as consts from '../shared/constants.js';
import { EventData, GlobalMeta, SlideData } from '../shared/GlobalMeta.js';
import { LeftSidebarContainer } from './LeftSidebarContainer.js';

const leftContainer: consts.selector = '#left-sidebar-container';
const slideAddedEvent: consts.event = "SlideAdded";
const globalMeta: consts.selector = "#global-meta";

//Добавление выбранного слайда в список выбранных в левый сайдбар
$(globalMeta).on(slideAddedEvent, function (e) {
    //@ts-ignore
    let detail: EventData = e.detail;

    console.log(`An event occured ${slideAddedEvent} with data: `);
    console.log(detail);

    let slideData: SlideData = GlobalMeta.getSlideData(detail.slideId);

    if (slideData == null) {
        console.warn('There is no entry in the storage with the identifier: ' + detail.slideId)
        return;
    }

    LeftSidebarContainer.addIndexedSlide(slideData);
});