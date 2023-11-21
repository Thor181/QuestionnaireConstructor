﻿import AvailableSlide from './components/AvailableSlide.js';
import SidebarItem from './components/SidebarItem.js'
import { GlobalMeta } from './shared/GlobalMeta.js';
import generateShortUniq from './shared/guid.js';
 
$(async function () {

    
    let container = $('#right-sidebar-container');

    let infoAvailableSlide = new AvailableSlide();
    infoAvailableSlide.rendered.title = 'Info slide';
    infoAvailableSlide.rendered.imageModifier = 'slide-wrapper__thumbnail-picture--info';
    infoAvailableSlide.rendered.schemeName = 'info';
    infoAvailableSlide.rendered.schemeContent = '{ "Title":"", "Subtitle":"", "Infotitle":"", "Infotext":"", "NextPrevButtons": [{"Button next":"asdz"}, {"Button previous":"" }] }';

    let sidebarItemControl = new SidebarItem();
    sidebarItemControl.rendered.innerContent = await infoAvailableSlide.render();

    container.append(await sidebarItemControl.render());

    let questionAvailableSlide = new AvailableSlide();
    questionAvailableSlide.rendered.title = 'Question slide';
    questionAvailableSlide.rendered.imageModifier = 'slide-wrapper__thumbnail-picture--question';
    questionAvailableSlide.rendered.schemeName = 'question';
    questionAvailableSlide.rendered.schemeContent = '{ "Title":"", "Subtitle":"", "Question":"", "Assistive text":"", "Buttons": [ {"Yes": "Yes", "Value": 1}, {"No": "No", "Value": 2}], "NextPrevButtons": [{"Button next":"asdz"}, {"Button previous":"" }] }';

    let sidebarItemControl2 = new SidebarItem();
    sidebarItemControl2.rendered.innerContent = await questionAvailableSlide.render();

    container.append(await sidebarItemControl2.render());

    let multiSelectionAvailableSlide = new AvailableSlide();
    multiSelectionAvailableSlide.rendered.title = 'Multi selection slide';
    multiSelectionAvailableSlide.rendered.imageModifier = 'slide-wrapper__thumbnail-picture--multi';
    multiSelectionAvailableSlide.rendered.schemeName = 'multiselect';
    multiSelectionAvailableSlide.rendered.schemeContent = '{ "Title":"", "Subtitle":"", "Question":"", "Assistive text":"", "Buttons": [ {"Variant 1": "Variant1", "Value": 1},{"Variant 2": "Variant1", "Value": 2},{"Variant 3": "Variant1", "Value": 3}], "Single select": true, "NextPrevButtons": [{"Button next":"asdz"}, {"Button previous":"" }] }';

    let sidebarItemControl3 = new SidebarItem();
    sidebarItemControl3.rendered.innerContent = await multiSelectionAvailableSlide.render();

    container.append(await sidebarItemControl3.render());

    let imageSelectionAvilableSlide = new AvailableSlide();
    imageSelectionAvilableSlide.rendered.title = 'Image selection slide';
    imageSelectionAvilableSlide.rendered.imageModifier = 'slide-wrapper__thumbnail-picture--image';
    imageSelectionAvilableSlide.rendered.schemeName = 'imageselection';
    imageSelectionAvilableSlide.rendered.schemeContent = '{ "Title":"", "Subtitle":"", "Question":"", "Assistive text":"", "ImageButtons": [ {"Variant 1": "Variant1", "Value": 1, "Image": ""},{"Variant 2": "Variant1", "Value": 2, "Image": ""},{"Variant 3": "Variant1", "Value": 3, "Image": ""}], "Single select": true, "NextPrevButtons": [{"Button next":"asdz"}, {"Button previous":"" }] }'

    let sidebarItemControl4 = new SidebarItem();
    sidebarItemControl4.rendered.innerContent = await imageSelectionAvilableSlide.render();

    container.append(await sidebarItemControl4.render());

    GlobalMeta.initialize();
});

