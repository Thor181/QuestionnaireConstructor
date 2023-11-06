import * as consts from '../shared/constants.js';

const globalMeta: consts.selector = '#global-meta'

export class GlobalMeta {
    static #storageSectionName = 'Slides';

    static initialize() {

        let dataJson: string = window.localStorage.getItem(this.#storageSectionName);

        let data: Array<SlideData> = JSON.parse(dataJson);
        
        for (var i = 0; i < data.length; i++) {
            
            let item: SlideData = data.filter(x => x.meta.order == i + 1)[0];
            this.#generateAddedEvent(item.meta.id, item.meta.type);
        }
    }

    static addOrUpdateSlideData(slideData: SlideData) {
        if (slideData == null) {
            console.error('Значение questionData не может быть null');
            return;
        }

        if (slideData.meta.id == null) {
            slideData.meta.id = Math.floor(Math.random() * 1000000);
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
        if (slideData == null) {
            console.error('Значение questionData не может быть null')
            return;
        }

        if (slideData.meta.id == undefined) {
            console.error('Значение questionData.meta.id не может быть null')
            return;
        }

        let storageData: string = window.localStorage.getItem(this.#storageSectionName);
        if (storageData == null) {
            console.error('В localstorage не найдено значение для ' + this.#storageSectionName)
            return;
        }

        let storageSlidesData: Array<SlideData> = JSON.parse(storageData);

        if (storageSlidesData.length == 0) {
            console.error(`Не удалось обновить данные для id: ${slideData.meta.id} - сущности отсутсвуют в массиве "${this.#storageSectionName}"`)
            return;
        }

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

    //#region Event
    static #generateAddedEvent(slideId: number, type: string) {
        let data = new EventData(slideId, type);
        this.#generateEventInternal("SlideAdded", data);
    }

    static #generateUpdatedEvent(slideId: number, type: string) {
        let data = new EventData(slideId, type);
        this.#generateEventInternal("SlideUpdated", data);
    }

    static #generateEventInternal(eventType: consts.event, detail: EventData) {
        let event: CustomEvent<EventData> = new CustomEvent(eventType, { detail: detail });
        document.querySelector(globalMeta).dispatchEvent(event);
    }
    //#endregion

    static #createStorageSection(): string  {
        let value: [] = [];
        let valueJson: string = JSON.stringify(value);
        window.localStorage.setItem(this.#storageSectionName, valueJson);
        return valueJson;
    }

    static getSlideData(id: number) {
        let dataJson = window.localStorage.getItem(this.#storageSectionName);

        let data: Array<SlideData> = JSON.parse(dataJson);

        let questionData: SlideData = data.filter(x => x.meta.id == id)[0];

        return questionData;
    }
}

type dataType = {
    [key: string]: string
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

