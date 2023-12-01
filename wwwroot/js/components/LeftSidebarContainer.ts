import { read } from 'fs';
import * as consts from '../shared/constants.js';
import { GlobalMeta, SlideData } from '../shared/GlobalMeta.js';
import IndexedSlide from './IndexedSlide.js';
import IndexedSlideInterpretated from './IndexedSlideInterpretated.js';
import SidebarItem from './SidebarItem.js';
import SlideTunerCard, { waitFieldsetInnerContent } from './SlideTunerCard.js';
import SlideTunerCardGenerator from './SlideTunerCardGenerator.js';
import { toggleSwitchRendered } from './ToggleSwitch.js';
import { EventData } from '../shared/GlobalMeta.js'

const leftContainerSelector: consts.selector = '#left-sidebar-container';
const indexSelector: consts.selector = '[index]';
const dataOrderMaxSelector: consts.selector = '[data-order-max]';
const sidebarItemSelector: consts.selector = '.sidebar__item';
const dataMetaIdSelector: consts.selector = '[data-meta-id]';
const dataMetaOrderSelector: consts.selector = '[data-meta-order]';
const slideTunerCardSelector: consts.selector = '.slide-tuner__card';
const slideTunerItem: consts.selector = '.slide-tuner__item';
const dataKindSelector: consts.selector = '[data-kind]';
const topLevelSelector: consts.selector = '[top-level]';
const inputFileInnerImageSelector: consts.selector = '.input-file__inner-image';

const imageButtonsRenderType = consts.renderTypes.ImageButtons;

const globalMeta: consts.selector = '#global-meta';

const indexAttr: consts.attribute = 'index';
const dataOrderMaxAttr: consts.attribute = 'data-order-max';
const dataMetaIdAttr: consts.attribute = 'data-meta-id';
const dataMetaOrderAttr: consts.attribute = 'data-meta-order';
const dataKindAttr: consts.attribute = 'data-kind'
const dataOrderMax: consts.attribute = 'data-order-max';
const topLevelAttr: consts.attribute = 'top-level';
const metaValueAttr: consts.attribute = 'meta-value';

const slideUpdatedEvent: consts.event = 'SlideUpdated';

const textType: consts.componentType = 'text';
const nextPrevButtonsType: consts.componentType = 'nextprevbuttons';
const removebtnType: consts.componentType = 'removebtn';
const buttonsType: consts.componentType = 'buttons';
const multiselectType: consts.componentType = 'multiselect';
const toggleSwitchType: consts.componentType = 'toggleswitch';
const imageselectType: consts.componentType = 'imageselection';
const colorButtonsType: consts.componentType = 'colorbuttons';
const colorType: consts.componentType = 'color';
const inputSelectType: consts.componentType = 'input-select';

const leftContainer = document.querySelector(leftContainerSelector);

const leftSidebarMutationObserver = new MutationObserver((mr, o) => {
    const indexSpan = $(leftContainerSelector).find(indexSelector);

    let i = 0;
    while (i < indexSpan.length) {
        let item = indexSpan.eq(i);
        let index = i + 1;
        item.text(index);
        item.attr(indexAttr, index);

        i++;
    }

    leftContainer.setAttribute(dataOrderMaxAttr, i.toString());
});

leftSidebarMutationObserver.observe(leftContainer, { childList: true });


//setInterval(() => {
    
//    let res = '';
//    const indexSpan = $(leftContainerSelector).find(indexSelector);
//    for (var i = 0; i < indexSpan.length; i++) {
//        let item = indexSpan.eq(i);
//        let slideWrapper = item.parents('.slide-wrapper');
//        let metaOrder = slideWrapper.find('[data-meta-order]').attr('data-meta-order');
//        let id = slideWrapper.find('[data-meta-id]').attr('data-meta-id');

//        res += `${i + 1}` + ')' + ' ' + id + ':' + item.attr('index') + '|' + metaOrder + '              '
//    }

//    $('.header').html(res)

//}, 200);

export class LeftSidebarContainer {

    static async addIndexedSlide(slideData: SlideData): Promise<void> {
        const leftSidebarContainer = $(leftContainerSelector);

        const slide = new IndexedSlide();
        slide.rendered.index = 0;
        slide.rendered.imageModifier = consts.mapTypeToImageModifier(slideData.meta.type);
        slide.rendered.metaId = slideData.meta.id;
        slide.rendered.metaOrder = slideData.meta.order;
        slide.rendered.title = slideData.data.Title;

        const sidebarItem = new SidebarItem();
        sidebarItem.rendered.innerContent = await slide.render();

        leftSidebarContainer.append(await sidebarItem.render());

        //Сортировка
        let sidebarChildren = Array.from(leftSidebarContainer.children());
        let sorted = sidebarChildren.sort(function (a, b) {
            //@ts-ignore
            return $(a).find(dataMetaOrderSelector)[0].getAttribute(dataMetaOrderAttr) - $(b).find(dataMetaOrderSelector)[0].getAttribute(dataMetaOrderAttr);
        });
        sorted.forEach(x => leftSidebarContainer.append(x))
    }

    static removeItem(id: number) {
        let a = consts.combine('data-meta-id', id.toString());
        $(leftContainerSelector).children(sidebarItemSelector).has(a).remove();
    }

    static getOrderMax(): number {
        const leftSidebarContainer = document.querySelector(leftContainerSelector);
        return Number(leftSidebarContainer.getAttribute(dataOrderMax));
    }
}

$(leftContainerSelector).on('click', sidebarItemSelector, async function () {
    waitFieldsetInnerContent();

    document.querySelectorAll('.input-file__base-input').forEach(x => {
        x.removeEventListener('change', () => { });
    })

    const inter = new IndexedSlideInterpretated($(this).children().first());

    const slideId = inter.getMetaDataId();

    await generateSlideTunerCard(slideId);

    inter.setSelectedStatus();
});

$(globalMeta).on(slideUpdatedEvent, async function (e) {
    //@ts-ignore
    const detail: EventData = e.detail;
    const slideId = detail.slideId;
    const data: SlideData = GlobalMeta.getSlideData(slideId);

    let item = $(leftContainerSelector).find(consts.combine(dataMetaIdAttr, detail.slideId.toString()))
    let titleElement = item.siblings().find(consts.combine(dataKindAttr, 'title'));
    titleElement.text(data.data.Title);
});

export async function generateSlideTunerCard(slideId: number) {
    SlideTunerCard.clear();

    const slideTunerCard = $(slideTunerCardSelector);
    const slideData = GlobalMeta.getSlideData(slideId);

    const generator = new SlideTunerCardGenerator();
    const data = slideData.data;

    for (let propName in data) {
        let type = consts.renderTypes.getValueByKey(propName);

        if (type == textType) {
            await generator.addTextComponent(propName, data[propName], propName);
        }
        else if (type == nextPrevButtonsType) {
            let buttonsInfo = data[propName];

            let nextBtnInfo = buttonsInfo[0];

            let nextBtnTitle = Object.keys(nextBtnInfo)[0];
            //@ts-ignore
            let nextBtn: consts.buttonConfig = { title: nextBtnTitle, inputValue: nextBtnInfo[nextBtnTitle], placeholder: nextBtnTitle };

            let prevBtnInfo = buttonsInfo[1];
            let prevBtnTitle = Object.keys(prevBtnInfo)[0];
            //@ts-ignore
            let prevBtn: consts.buttonConfig = { title: prevBtnTitle, inputValue: prevBtnInfo[prevBtnTitle], placeholder: prevBtnTitle };

            await generator.addButtonsNextAndPrevious(nextBtn, prevBtn);
        }
        else if (type == buttonsType) {
            let buttons: [] = data[propName];
            let buttonsConfigs: Array<consts.buttonConfig> = [];

            let isRemovable = slideData.meta.type != 'question';
            let isAddable = slideData.meta.type != 'question';

            for (var i = 0; i < buttons.length; i++) {
                let button = buttons[i];
                let buttonKeys = Object.keys(button);
                let notValueKey = buttonKeys.find(x => x != 'Value');

                let removable = isRemovable && i > 0;

                let config: consts.buttonConfig = { title: notValueKey, inputValue: button[notValueKey], placeholder: notValueKey, removable: removable };
                buttonsConfigs.push(config);
            }

            await generator.addButtons(buttonsConfigs, propName, isAddable);
        }
        else if (type == imageButtonsRenderType) {
            let buttons: [] = data[propName];
            let buttonsConfigs: Array<consts.imageSelectConfig> = [];

            let isRemovable = slideData.meta.type == imageselectType;
            let isAddable = slideData.meta.type == imageselectType;

            for (var i = 0; i < buttons.length; i++) {
                let button = buttons[i];
                let buttonKeys = Object.keys(button);
                let notValueKey = buttonKeys.find(x => x != 'Value');

                let removable = isRemovable && i > 0;

                let config: consts.imageSelectConfig = {
                    title: notValueKey,
                    inputValue: button[notValueKey],
                    placeholder: notValueKey,
                    removable: removable,
                    imagePath: button["ImagePath"]
                };
                buttonsConfigs.push(config);
            }

            await generator.addImageSelectFields(buttonsConfigs, propName, isAddable);

        }
        else if (type == colorButtonsType) {
            let buttons: [] = data[propName];
            let buttonsConfigs: Array<consts.colorConfig> = [];

            let isRemovable = slideData.meta.type == colorType;
            let isAddable = slideData.meta.type == colorType;

            for (var i = 0; i < buttons.length; i++) {
                let button = buttons[i];

                let removable = isRemovable && i > 0;

                let config: consts.colorConfig = {
                    color: button["Color"],
                    removable: removable,
                    value: button["Value"]
                };

                buttonsConfigs.push(config);
            }

            await generator.addColorsSelect(buttonsConfigs, propName, isAddable);
        }
        else if (type == toggleSwitchType) {
            let propValue = data[propName];

            let config: toggleSwitchRendered = {
                title: propName,
                dataMetaTitle: propName,
                dataType: 'toggleswitch',
                dataKind: 'singleselect',
                checked: propValue == true ? 'checked' : ''
            };

            generator.addToggleSwitch(config);
        }

    }

    await generator.addRemoveButton();

    const renderedCardChildren = await generator.render();

    slideTunerCard.append(renderedCardChildren);

    SlideTunerCard.setDataMetaId(slideId);

    //selected status
    let item = $(leftContainerSelector).find(`[data-meta-id="${slideId}"]`).parent();
    const inter = new IndexedSlideInterpretated(item);
    inter.setSelectedStatus();
}

$('#left-sidebar-container').sortable({ beforeStop: onSorted });

function onSorted(e: any, ui: any) {

    let item: JQuery<HTMLElement> = ui.item.eq(0)
    let currentIndex = item.find('[index]').attr('index');
    item.find('[data-meta-order]').attr('data-meta-order', currentIndex);

    reorderMetaOrder();
}

function reorderMetaOrder() {
    const indexSpan = $(leftContainerSelector).find(indexSelector);

    let i = 0;
    while (i < indexSpan.length) {

        let item = indexSpan.eq(i);
        let index = i + 1;
        let slideWrapper = item.parents('.slide-wrapper');
        slideWrapper.find('[data-meta-order]').attr('data-meta-order', index);
        let slideId = Number(slideWrapper.find('[data-meta-id]').attr('data-meta-id'));
        let slideData = GlobalMeta.getSlideData(slideId);
        slideData.meta.order = index;
        GlobalMeta.updateSlideData(slideData);

        i++;
    }
}