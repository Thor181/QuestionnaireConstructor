var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _a, _GlobalMeta_storageSectionName, _GlobalMeta_generateAddedEvent, _GlobalMeta_generateUpdatedEvent, _GlobalMeta_generateRemovedEvent, _GlobalMeta_generateEventInternal, _GlobalMeta_createStorageSection;
import generateRandomNumber from './random.js';
import { log } from './Logger.js';
const globalMeta = '#global-meta';
export class GlobalMeta {
    static initialize() {
        let dataJson = window.localStorage.getItem(__classPrivateFieldGet(this, _a, "f", _GlobalMeta_storageSectionName));
        let data = JSON.parse(dataJson);
        if (data == null || (data === null || data === void 0 ? void 0 : data.length) == 0) {
            log('warn', 'GlobalMeta: initialize is not completed - the data in the storage is empty');
            return;
        }
        for (var i = 0; i < data.length; i++) {
            let item = data.filter(x => x.meta.order == i + 1)[0];
            __classPrivateFieldGet(this, _a, "m", _GlobalMeta_generateAddedEvent).call(this, item.meta.id, item.meta.type);
        }
    }
    static addOrUpdateSlideData(slideData) {
        var _b;
        if (slideData == null) {
            console.error('questionData value cannot be null');
            return;
        }
        if (slideData.meta.id == null) {
            slideData.meta.id = generateRandomNumber(_a.getIds());
        }
        let storageData = (_b = window.localStorage.getItem(__classPrivateFieldGet(this, _a, "f", _GlobalMeta_storageSectionName))) !== null && _b !== void 0 ? _b : __classPrivateFieldGet(this, _a, "m", _GlobalMeta_createStorageSection).call(this);
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
        window.localStorage.setItem(__classPrivateFieldGet(this, _a, "f", _GlobalMeta_storageSectionName), localDataJson);
        __classPrivateFieldGet(this, _a, "m", _GlobalMeta_generateAddedEvent).call(this, slideData.meta.id, slideData.meta.type);
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
        window.localStorage.setItem(__classPrivateFieldGet(this, _a, "f", _GlobalMeta_storageSectionName), localDataJson);
        __classPrivateFieldGet(this, _a, "m", _GlobalMeta_generateUpdatedEvent).call(this, slideData.meta.id, slideData.meta.type);
    }
    static removeSlideDataById(id) {
        const slideData = this.getSlideData(id);
        this.removeSlideData(slideData);
    }
    static removeSlideData(slideData) {
        const storageSlidesData = this.getStorageData(slideData);
        const filtered = storageSlidesData.filter(x => x.meta.id != slideData.meta.id);
        _a.reorder(filtered);
        let localDataJson = JSON.stringify(filtered);
        window.localStorage.setItem(__classPrivateFieldGet(this, _a, "f", _GlobalMeta_storageSectionName), localDataJson);
        __classPrivateFieldGet(this, _a, "m", _GlobalMeta_generateRemovedEvent).call(this, slideData.meta.id, slideData.meta.type);
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
        let storageData = window.localStorage.getItem(__classPrivateFieldGet(this, _a, "f", _GlobalMeta_storageSectionName));
        if (storageData == null) {
            console.error('There is no section ' + __classPrivateFieldGet(this, _a, "f", _GlobalMeta_storageSectionName) + ' in storage');
            return;
        }
        let storageSlidesData = JSON.parse(storageData);
        if (storageSlidesData.length == 0) {
            console.error(`There is not entity in array "${__classPrivateFieldGet(this, _a, "f", _GlobalMeta_storageSectionName)} with id: ${slideData.meta.id}"`);
            return;
        }
        return storageSlidesData;
    }
    static getIds() {
        let items = window.localStorage.getItem(__classPrivateFieldGet(this, _a, "f", _GlobalMeta_storageSectionName));
        let parsed = JSON.parse(items);
        if (parsed == null || parsed.length == 0) {
            return [];
        }
        let ids = parsed.map(x => x.meta.id);
        return ids;
    }
    static getSlideData(id) {
        let dataJson = window.localStorage.getItem(__classPrivateFieldGet(this, _a, "f", _GlobalMeta_storageSectionName));
        if (dataJson == null || dataJson == '') {
            console.error("There is no " + __classPrivateFieldGet(this, _a, "f", _GlobalMeta_storageSectionName) + " section in storage");
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
_a = GlobalMeta, _GlobalMeta_generateAddedEvent = function _GlobalMeta_generateAddedEvent(slideId, type) {
    let data = new EventData(slideId, type);
    __classPrivateFieldGet(this, _a, "m", _GlobalMeta_generateEventInternal).call(this, "SlideAdded", data);
}, _GlobalMeta_generateUpdatedEvent = function _GlobalMeta_generateUpdatedEvent(slideId, type) {
    let data = new EventData(slideId, type);
    __classPrivateFieldGet(this, _a, "m", _GlobalMeta_generateEventInternal).call(this, "SlideUpdated", data);
}, _GlobalMeta_generateRemovedEvent = function _GlobalMeta_generateRemovedEvent(slideId, type) {
    let data = new EventData(slideId, type);
    __classPrivateFieldGet(this, _a, "m", _GlobalMeta_generateEventInternal).call(this, "SlideRemoved", data);
}, _GlobalMeta_generateEventInternal = function _GlobalMeta_generateEventInternal(eventType, detail) {
    let event = new CustomEvent(eventType, { detail: detail });
    document.querySelector(globalMeta).dispatchEvent(event);
}, _GlobalMeta_createStorageSection = function _GlobalMeta_createStorageSection() {
    let value = [];
    let valueJson = JSON.stringify(value);
    window.localStorage.setItem(__classPrivateFieldGet(this, _a, "f", _GlobalMeta_storageSectionName), valueJson);
    return valueJson;
};
_GlobalMeta_storageSectionName = { value: 'Slides' };
export class SlideData {
    constructor() {
        this.meta = new Meta();
    }
}
export class Meta {
}
export class EventData {
    constructor(slideId, type) {
        this.slideId = slideId;
        this.type = type;
    }
}
//# sourceMappingURL=GlobalMeta.js.map