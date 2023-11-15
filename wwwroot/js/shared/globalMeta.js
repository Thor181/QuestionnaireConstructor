import generateRandomNumber from './random.js';
import { log } from './Logger.js';
const globalMeta = '#global-meta';
export class GlobalMeta {
    static #storageSectionName = 'Slides';
    static initialize() {
        let dataJson = window.localStorage.getItem(this.#storageSectionName);
        let data = JSON.parse(dataJson);
        if (data == null || data?.length == 0) {
            log('warn', 'GlobalMeta: initialize is not completed - the data in the storage is empty');
            return;
        }
        for (var i = 0; i < data.length; i++) {
            let item = data.filter(x => x.meta.order == i + 1)[0];
            this.#generateAddedEvent(item.meta.id, item.meta.type);
        }
    }
    static addOrUpdateSlideData(slideData) {
        if (slideData == null) {
            console.error('questionData value cannot be null');
            return;
        }
        if (slideData.meta.id == null) {
            slideData.meta.id = generateRandomNumber(GlobalMeta.getIds());
        }
        let storageData = window.localStorage.getItem(this.#storageSectionName) ?? this.#createStorageSection();
        let storageSlidesData = JSON.parse(storageData);
        if (storageSlidesData.length == 0) {
            storageSlidesData.push(slideData);
        }
        else {
            let updated = false;
            for (let i = 0; i < storageSlidesData.length; i++) {
                let storageSlideData = storageSlidesData[i];
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
        let localDataJson = JSON.stringify(storageSlidesData);
        window.localStorage.setItem(this.#storageSectionName, localDataJson);
        this.#generateAddedEvent(slideData.meta.id, slideData.meta.type);
    }
    static updateSlideData(slideData) {
        const storageSlidesData = this.getStorageData(slideData);
        let updated = false;
        for (let i = 0; i < storageSlidesData.length; i++) {
            let storageSlideData = storageSlidesData[i];
            if (storageSlideData.meta.id == slideData.meta.id) {
                Object.assign(storageSlideData, slideData);
                updated = true;
                break;
            }
        }
        let localDataJson = JSON.stringify(storageSlidesData);
        window.localStorage.setItem(this.#storageSectionName, localDataJson);
        this.#generateUpdatedEvent(slideData.meta.id, slideData.meta.type);
    }
    static removeSlideDataById(id) {
        const slideData = this.getSlideData(id);
        this.removeSlideData(slideData);
    }
    static removeSlideData(slideData) {
        const storageSlidesData = this.getStorageData(slideData);
        const filtered = storageSlidesData.filter(x => x.meta.id != slideData.meta.id);
        GlobalMeta.reorder(filtered);
        let localDataJson = JSON.stringify(filtered);
        window.localStorage.setItem(this.#storageSectionName, localDataJson);
        this.#generateRemovedEvent(slideData.meta.id, slideData.meta.type);
    }
    static reorder(slidesData) {
        for (var i = 0; i < slidesData.length; i++) {
            let item = slidesData[i];
            item.meta.order = i + 1;
        }
    }
    static getStorageData(slideData) {
        if (slideData == null) {
            console.error('questionData value cannot be null');
            return;
        }
        if (slideData.meta.id == null) {
            console.error('questionData.meta.id cannot be null');
            return;
        }
        let storageData = window.localStorage.getItem(this.#storageSectionName);
        if (storageData == null) {
            console.error('There is no section ' + this.#storageSectionName + ' in storage');
            return;
        }
        let storageSlidesData = JSON.parse(storageData);
        if (storageSlidesData.length == 0) {
            console.error(`There is not entity in array "${this.#storageSectionName} with id: ${slideData.meta.id}"`);
            return;
        }
        return storageSlidesData;
    }
    static getIds() {
        let items = window.localStorage.getItem(this.#storageSectionName);
        let parsed = JSON.parse(items);
        if (parsed == null || parsed.length == 0) {
            return [];
        }
        let ids = parsed.map(x => x.meta.id);
        return ids;
    }
    static #generateAddedEvent(slideId, type) {
        let data = new EventData(slideId, type);
        this.#generateEventInternal("SlideAdded", data);
    }
    static #generateUpdatedEvent(slideId, type) {
        let data = new EventData(slideId, type);
        this.#generateEventInternal("SlideUpdated", data);
    }
    static #generateRemovedEvent(slideId, type) {
        let data = new EventData(slideId, type);
        this.#generateEventInternal("SlideRemoved", data);
    }
    static #generateEventInternal(eventType, detail) {
        let event = new CustomEvent(eventType, { detail: detail });
        document.querySelector(globalMeta).dispatchEvent(event);
    }
    static #createStorageSection() {
        let value = [];
        let valueJson = JSON.stringify(value);
        window.localStorage.setItem(this.#storageSectionName, valueJson);
        return valueJson;
    }
    static getSlideData(id) {
        let dataJson = window.localStorage.getItem(this.#storageSectionName);
        if (dataJson == null || dataJson == '') {
            console.error("There is no " + this.#storageSectionName + " section in storage");
            return;
        }
        let data = JSON.parse(dataJson);
        let questionData = data.filter(x => x.meta.id == id)[0];
        if (questionData == null) {
            console.error('There is no data in storage with id: ' + id);
            return;
        }
        return questionData;
    }
}
export class SlideData {
    meta = new Meta();
    data;
}
export class Meta {
    id;
    type;
    order;
}
export class EventData {
    slideId;
    type;
    constructor(slideId, type) {
        this.slideId = slideId;
        this.type = type;
    }
}
//# sourceMappingURL=GlobalMeta.js.map