import { availableParallelism } from 'os';
import AvailableSlide from './components/AvailableSlide.js';
import SidebarItem from './components/SidebarItem.js'
import { GlobalMeta } from './shared/GlobalMeta.js';
import generateShortUniq from './shared/guid.js';
import { imageModifier } from './shared/constants.js';
import { createVerify } from 'crypto';
 
$(async function () {

    
    let container = $('#right-sidebar-container');

    await createAvailableSlide(
        'Info slide',
        'slide-wrapper__thumbnail-picture--info',
        'info',
        '{ "Title":"", "Subtitle":"", "Infotitle":"", "Infotext":"", "NextPrevButtons": [{"Button next":"Continue"}, {"Button previous":"Back" }] }',
        container
    );

    await createAvailableSlide(
        'Question slide',
        'slide-wrapper__thumbnail-picture--question',
        'question',
        '{ "Title":"", "Subtitle":"", "Question":"", "Assistive text":"", "Buttons": [ {"Variant 1": "Yes", "Value": 1}, {"Variant 2": "No", "Value": 2}], "NextPrevButtons": [{"Button next":"Continue"}, {"Button previous":"Back" }] }',
        container
    );

    await createAvailableSlide(
        'Multi selection slide',
        'slide-wrapper__thumbnail-picture--multi',
        'multiselect',
        '{ "Title":"", "Subtitle":"", "Question":"", "Assistive text":"", "Buttons": [ {"Variant 1": "Variant1", "Value": 1},{"Variant 2": "Variant1", "Value": 2},{"Variant 3": "Variant1", "Value": 3}], "Single select": true, "NextPrevButtons": [{"Button next":"Continue"}, {"Button previous":"Back" }] }',
        container
    );

    await createAvailableSlide(
        'Image selection slide',
        'slide-wrapper__thumbnail-picture--image',
        'imageselection',
        '{ "Title":"", "Subtitle":"", "Question":"", "Assistive text":"", "ImageButtons": [ {"Variant 1": "Variant1", "Value": 1, "ImagePath": ""},{"Variant 2": "Variant1", "Value": 2, "ImagePath": ""},{"Variant 3": "Variant1", "Value": 3, "ImagePath": ""}], "Single select": true, "NextPrevButtons": [{"Button next":"Continue"}, {"Button previous":"Back" }] }',
        container
    );

    await createAvailableSlide(
        'Skin color selection slide',
        'slide-wrapper__thumbnail-picture--skincolor',
        'skincolor',
        '{ "Title":"", "Subtitle":"", "Question":"", "Assistive text":"", "NextPrevButtons": [{"Button next":"Continue"}, {"Button previous":"Back" }] }',
        container
    );

    await createAvailableSlide(
        'Color selection slide',
        'slide-wrapper__thumbnail-picture--color',
        'color',
        '{ "Title":"", "Subtitle":"", "Question":"", "Assistive text":"", "Color buttons":[ {"Color":"#fae3c9", "Value": 1}, {"Color":"#8fffff", "Value": 2}, {"Color":"#aaaaaa", "Value": 3} ], "NextPrevButtons": [{"Button next":"Continue"}, {"Button previous":"Back" }] }',
        container
    );

    await createAvailableSlide(
        'User input slide',
        'slide-wrapper__thumbnail-picture--input',
        'input',
        '{ "Title":"", "Subtitle":"", "Question":"", "Assistive text":"", "NextPrevButtons": [{"Button next":"Continue"}, {"Button previous":"Back" }] }',
        container
    );

    await createAvailableSlide('Selection with user input',
        'slide-wrapper__thumbnail-picture--input-select',
        'input-select',
        '{ "Title":"", "Subtitle":"", "Question":"", "Assistive text":"", "Other variant": "Other", "Buttons": [ {"Variant 1": "Variant1", "Value": 1},{"Variant 2": "Variant1", "Value": 2},{"Variant 3": "Variant1", "Value": 3}], "Single select": true, "NextPrevButtons": [{"Button next":"Continue"}, {"Button previous":"Back" }] }',
        container
    );

    await createAvailableSlide('Image upload with user input',
        'slide-wrapper__thumbnail-picture--image-input',
        'image-input',
        '{ "Title":"", "Subtitle":"", "Question":"", "Assistive text":"", "NextPrevButtons": [{"Button next":"Continue"}, {"Button previous":"Back" }] }',
        container
    );

    await createAvailableSlide('Coupon slide',
        'slide-wrapper__thumbnail-picture--coupon',
        'coupon',
        '{ "Title":"", "Subtitle":"", "Infotitle":"", "Infotext":"", "Coupon": "", "NextPrevButtons": [{"Button next":"Continue"}, {"Button previous":"Back" }] }',
        container
    );

    GlobalMeta.initialize();
});


async function createAvailableSlide(title: string, imagePath: imageModifier, schemeName: string, schemeContent: string, container: JQuery<HTMLElement>) {
    let slide = new AvailableSlide();
    slide.rendered.title = title;
    slide.rendered.imageModifier = imagePath;
    slide.rendered.schemeName = schemeName;
    slide.rendered.schemeContent = schemeContent;

    let sidebarItem = new SidebarItem();
    sidebarItem.rendered.innerContent = await slide.render();

    container.append(await sidebarItem.render());
}


