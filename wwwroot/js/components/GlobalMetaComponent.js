import { GlobalMeta } from '../shared/GlobalMeta.js';
import { log } from '../shared/Logger.js';
import { LeftSidebarContainer } from './LeftSidebarContainer.js';
const leftContainer = '#left-sidebar-container';
const slideAddedEvent = "SlideAdded";
const globalMeta = "#global-meta";
$(globalMeta).on(slideAddedEvent, function (e) {
    let detail = e.detail;
    log('log', `An event occured ${slideAddedEvent} with data: `);
    log('log', detail);
    let slideData = GlobalMeta.getSlideData(detail.slideId);
    if (slideData == null) {
        log('warn', 'There is no entry in the storage with the identifier: ' + detail.slideId);
        return;
    }
    LeftSidebarContainer.addIndexedSlide(slideData);
});
//# sourceMappingURL=GlobalMetaComponent.js.map