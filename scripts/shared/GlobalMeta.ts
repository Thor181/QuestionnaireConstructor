import * as consts from '../shared/constants.js';
import generateRandomNumber from './random.js';
import { log } from './Logger.js';

const globalMeta: consts.selector = '#global-meta'

export class GlobalMeta {
    static #storageSectionName = 'Slides';

    static initialize() {

        let dataJson: string = window.localStorage.getItem(this.#storageSectionName);

        let data: Array<SlideData> = JSON.parse(dataJson);

        if (data == null || data?.length == 0) {
            log('warn', 'GlobalMeta: initialize is not completed - the data in the storage is empty')
            return;
        }

        for (var i = 0; i < data.length; i++) {

            let item: SlideData = data.filter(x => x.meta.order == i + 1)[0];
            this.#generateAddedEvent(item.meta.id, item.meta.type);
        }
    }

    static addOrUpdateSlideData(slideData: SlideData) {
        if (slideData == null) {
            console.error('questionData value cannot be null');
            return;
        }

        if (slideData.meta.id == null) {
            slideData.meta.id = generateRandomNumber(GlobalMeta.getIds());
        }

        let storageData: string = window.localStorage.getItem(this.#storageSectionName) ?? this.#createStorageSection();

        let storageSlidesData: Array<SlideData> = JSON.parse(storageData);

        if (storageSlidesData.length == 0) {
            storageSlidesData.push(slideData);
        }
        else {

            let updated: boolean = false;

            for (let i = 0; i < storageSlidesData.length; i++) {

                let storageSlideData: SlideData = storageSlidesData[i];

                if (storageSlideData.meta.id == slideData.meta.id) {
                    Object.assign(storageSlideData, slideData);
                    updated = true;
                    break;
                }
            }

            if (!updated) {
                storageSlidesData.push(slideData);
            }
        }

        let localDataJson: string = JSON.stringify(storageSlidesData);
        window.localStorage.setItem(this.#storageSectionName, localDataJson);

        this.#generateAddedEvent(slideData.meta.id, slideData.meta.type);
    }

    static updateSlideData(slideData: SlideData) {
        const storageSlidesData = this.getStorageData(slideData);

        let updated: boolean = false;

        for (let i = 0; i < storageSlidesData.length; i++) {

            let storageSlideData: SlideData = storageSlidesData[i];

            if (storageSlideData.meta.id == slideData.meta.id) {
                Object.assign(storageSlideData, slideData);
                updated = true;
                break;
            }
        }

        let localDataJson: string = JSON.stringify(storageSlidesData);
        window.localStorage.setItem(this.#storageSectionName, localDataJson);

        this.#generateUpdatedEvent(slideData.meta.id, slideData.meta.type);
    }

    static removeSlideDataById(id: number) {
        const slideData = this.getSlideData(id);
        this.removeSlideData(slideData);
    }

    static removeSlideData(slideData: SlideData) {
        const storageSlidesData = this.getStorageData(slideData);

        const filtered = storageSlidesData.filter(x => x.meta.id != slideData.meta.id);

        GlobalMeta.reorder(filtered);

        let localDataJson: string = JSON.stringify(filtered);

        window.localStorage.setItem(this.#storageSectionName, localDataJson);

        this.#generateRemovedEvent(slideData.meta.id, slideData.meta.type);
    }

    static reorder(slidesData: Array<SlideData>) {
        for (var i = 0; i < slidesData.length; i++) {
            let item = slidesData[i];
            item.meta.order = i + 1;
        }
    }

    private static getStorageData(slideData: SlideData): Array<SlideData> {
        if (slideData == null) {
            console.error('questionData value cannot be null')
            return;
        }

        if (slideData.meta.id == null) {
            console.error('questionData.meta.id cannot be null')
            return;
        }

        let storageData: string = window.localStorage.getItem(this.#storageSectionName);
        if (storageData == null) {
            console.error('There is no section ' + this.#storageSectionName + ' in storage');
            return;
        }

        let storageSlidesData: Array<SlideData> = JSON.parse(storageData);

        if (storageSlidesData.length == 0) {
            console.error(`There is not entity in array "${this.#storageSectionName} with id: ${slideData.meta.id}"`)
            return;
        }

        return storageSlidesData;
    }

    static getIds(): Array<number> {
        let items = window.localStorage.getItem(this.#storageSectionName);
        let parsed: Array<SlideData> = JSON.parse(items);

        if (parsed == null || parsed.length == 0) {
            return [];
        }

        let ids = parsed.map(x => x.meta.id);
        return ids;
    }

    //#region Event
    static #generateAddedEvent(slideId: number, type: string) {
        let data = new EventData(slideId, type);
        this.#generateEventInternal("SlideAdded", data);
    }

    static #generateUpdatedEvent(slideId: number, type: string) {
        let data = new EventData(slideId, type);
        this.#generateEventInternal("SlideUpdated", data);
    }

    static #generateRemovedEvent(slideId: number, type: string) {
        let data = new EventData(slideId, type);
        this.#generateEventInternal("SlideRemoved", data);
    }

    static #generateEventInternal(eventType: consts.event, detail: EventData) {
        let event: CustomEvent<EventData> = new CustomEvent(eventType, { detail: detail });
        document.querySelector(globalMeta).dispatchEvent(event);
    }
    //#endregion

    static #createStorageSection(): string {
        let value: [] = [];
        let valueJson: string = JSON.stringify(value);
        window.localStorage.setItem(this.#storageSectionName, valueJson);
        return valueJson;
    }

    static getSlideData(id: number): SlideData {
        let dataJson = window.localStorage.getItem(this.#storageSectionName);

        if (dataJson == null || dataJson == '') {
            console.error("There is no " + this.#storageSectionName + " section in storage");
            return;
        }

        let data: Array<SlideData> = JSON.parse(dataJson);

        let questionData: SlideData = data.filter(x => x.meta.id == id)[0];

        if (questionData == null) {
            console.error('There is no data in storage with id: ' + id);
            return;
        }

        return questionData;
    }
}

type dataType = {
    [key: string]: any
}

export class SlideData {

    meta: Meta = new Meta();
    data: dataType;
}

export class Meta {
    id: number;
    type: string;
    order: number;
}

export class EventData {
    slideId: number;
    type: string;

    constructor(slideId: number, type: string) {
        this.slideId = slideId;
        this.type = type;
    }
}

