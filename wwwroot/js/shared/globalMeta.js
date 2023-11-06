var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _a, _GlobalMeta_storageSectionName, _GlobalMeta_generateAddedEvent, _GlobalMeta_generateUpdatedEvent, _GlobalMeta_generateEventInternal, _GlobalMeta_createStorageSection;
const globalMeta = '#global-meta';
export class GlobalMeta {
    static initialize() {
        let dataJson = window.localStorage.getItem(__classPrivateFieldGet(this, _a, "f", _GlobalMeta_storageSectionName));
        let data = JSON.parse(dataJson);
        for (var i = 0; i < data.length; i++) {
            let item = data.filter(x => x.meta.order == i + 1)[0];
            __classPrivateFieldGet(this, _a, "m", _GlobalMeta_generateAddedEvent).call(this, item.meta.id, item.meta.type);
        }
    }
    static addOrUpdateSlideData(slideData) {
        var _b;
        if (slideData == null) {
            console.error('Значение questionData не может быть null');
            return;
        }
        if (slideData.meta.id == null) {
            slideData.meta.id = Math.floor(Math.random() * 1000000);
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
        if (slideData == null) {
            console.error('Значение questionData не может быть null');
            return;
        }
        if (slideData.meta.id == undefined) {
            console.error('Значение questionData.meta.id не может быть null');
            return;
        }
        let storageData = window.localStorage.getItem(__classPrivateFieldGet(this, _a, "f", _GlobalMeta_storageSectionName));
        if (storageData == null) {
            console.error('В localstorage не найдено значение для ' + __classPrivateFieldGet(this, _a, "f", _GlobalMeta_storageSectionName));
            return;
        }
        let storageSlidesData = JSON.parse(storageData);
        if (storageSlidesData.length == 0) {
            console.error(`Не удалось обновить данные для id: ${slideData.meta.id} - сущности отсутсвуют в массиве "${__classPrivateFieldGet(this, _a, "f", _GlobalMeta_storageSectionName)}"`);
            return;
        }
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
    static getSlideData(id) {
        let dataJson = window.localStorage.getItem(__classPrivateFieldGet(this, _a, "f", _GlobalMeta_storageSectionName));
        let data = JSON.parse(dataJson);
        let questionData = data.filter(x => x.meta.id == id)[0];
        return questionData;
    }
}
_a = GlobalMeta, _GlobalMeta_generateAddedEvent = function _GlobalMeta_generateAddedEvent(slideId, type) {
    let data = new EventData(slideId, type);
    __classPrivateFieldGet(this, _a, "m", _GlobalMeta_generateEventInternal).call(this, "SlideAdded", data);
}, _GlobalMeta_generateUpdatedEvent = function _GlobalMeta_generateUpdatedEvent(slideId, type) {
    let data = new EventData(slideId, type);
    __classPrivateFieldGet(this, _a, "m", _GlobalMeta_generateEventInternal).call(this, "SlideUpdated", data);
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