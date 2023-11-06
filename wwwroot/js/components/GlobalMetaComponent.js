import { GlobalMeta } from '../shared/GlobalMeta.js';
import { LeftSidebarContainer } from './LeftSidebarContainer.js';
const leftContainer = '#left-sidebar-container';
const slideAddedEvent = "SlideAdded";
const globalMeta = "#global-meta";
$(globalMeta).on(slideAddedEvent, function (e) {
    let detail = e.detail;
    console.log(`An event occured ${slideAddedEvent} with data: `);
    console.log(detail);
    let slideData = GlobalMeta.getSlideData(detail.slideId);
    if (slideData == null) {
        console.warn('There is no entry in the storage with the identifier: ' + detail.slideId);
        return;
    }
    LeftSidebarContainer.addIndexedSlide(slideData);
});
//# sourceMappingURL=GlobalMetaComponent.js.map