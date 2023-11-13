import * as consts from '../shared/constants.js';
import { GlobalMeta, SlideData } from '../shared/GlobalMeta.js';
import IndexedSlide from './IndexedSlide.js';
import IndexedSlideInterpretated from './IndexedSlideInterpretated.js';
import SidebarItem from './SidebarItem.js';
import SlideTunerCard from './SlideTunerCard.js';
import SlideTunerCardGenerator from './SlideTunerCardGenerator.js';

const leftContainerSelector: consts.selector = '#left-sidebar-container';
const indexSelector: consts.selector = '[index]';
const dataOrderMaxSelector: consts.selector = '[data-order-max]';
const sidebarItemSelector: consts.selector = '.sidebar__item';
const dataMetaIdSelector: consts.selector = '[data-meta-id]';
const dataMetaOrderSelector: consts.selector = '[data-meta-order]';
const slideTunerCardSelector: consts.selector = '.slide-tuner__card';
const slideTunerItem: consts.selector = '.slide-tuner__item';
const dataKindSelector: consts.selector = '[data-kind]';


const globalMeta: consts.selector = '#global-meta';

const indexAttr: consts.attribute = 'index';
const dataOrderMaxAttr: consts.attribute = 'data-order-max';
const dataMetaIdAttr: consts.attribute = 'data-meta-id';
const dataMetaOrderAttr: consts.attribute = 'data-meta-order';
const dataKindAttr: consts.attribute = 'data-kind'
const dataOrderMax: consts.attribute = 'data-order-max';

const slideUpdatedEvent: consts.event = 'SlideUpdated';

const textType: consts.componentType = 'text';
const nextPrevButtonsType: consts.componentType = 'nextprevbuttons';
const removebtnType: consts.componentType = 'removebtn';
const buttonsType: consts.componentType = 'buttons';

const leftContainer = document.querySelector(leftContainerSelector);

const leftSidebarMutationObserver = new MutationObserver((mr, o) => {
    const indexSpan = $(leftContainerSelector).find(indexSelector);

    let i = 0;
    while (i < indexSpan.length) {
        let item = indexSpan.eq(i);
        item.text(i + 1);
        item.attr(indexAttr, i + 1);
        i++;
    }

    leftContainer.setAttribute(dataOrderMaxAttr, i.toString());
});

leftSidebarMutationObserver.observe(leftContainer, { childList: true });

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
    const inter = new IndexedSlideInterpretated($(this).children().first());

    const slideTunerCard = $(slideTunerCardSelector);
    SlideTunerCard.clear();

    const slideId = inter.getMetaDataId();
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

            let nextBtnInfo = buttonsInfo[0]

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
            let buttons:[] = data[propName];
            let buttonsConfigs: Array<consts.buttonConfig> = [];

            for (var i = 0; i < buttons.length; i++) {
                let button = buttons[i];
                let buttonKeys = Object.keys(button);
                let notValueKey = buttonKeys.find(x => x != 'Value');

                let removable = data.Multiselect == true;

                let config: consts.buttonConfig = { title: notValueKey, inputValue: button[notValueKey], placeholder: notValueKey, removable: removable};
                buttonsConfigs.push(config);
            }

            await generator.addButtons(buttonsConfigs, 'Variants');
        }
    }

    await generator.addRemoveButton();

    const renderedCardChildren = await generator.render();

    slideTunerCard.append(renderedCardChildren);

    SlideTunerCard.setDataMetaId(slideId);

    inter.setSelectedStatus();

});

$(globalMeta).on(slideUpdatedEvent, function (e) {
    //@ts-ignore
    const detail: EventData = e.detail;
    const data: SlideData = GlobalMeta.getSlideData(detail.slideId);

    let item = $(leftContainerSelector).find(consts.combine(dataMetaIdAttr, detail.slideId))
    let titleElement = item.siblings().find(consts.combine(dataKindAttr, 'title'));
    titleElement.text(data.data.Title);
});