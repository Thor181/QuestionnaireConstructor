var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _a, _GlobalMeta_storageSectionName, _GlobalMeta_generateAddedEvent, _GlobalMeta_generateUpdatedEvent, _GlobalMeta_generateEventInternal, _GlobalMeta_createStorageSection;
const questionAddedEvent = 'QuestionAdded';
const questionUpdatedEvent = 'QuestionUpdated';
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
    static addOrUpdateQuestion(questionData) {
        var _b;
        if (questionData == null || questionData == undefined) {
            console.error('Значение questionData не может быть null');
            return;
        }
        if (questionData.meta.id == null) {
            questionData.meta.id = Math.floor(Math.random() * 1000000);
        }
        let storageData = (_b = window.localStorage.getItem(__classPrivateFieldGet(this, _a, "f", _GlobalMeta_storageSectionName))) !== null && _b !== void 0 ? _b : __classPrivateFieldGet(this, _a, "m", _GlobalMeta_createStorageSection).call(this);
        let storageDataValue = JSON.parse(storageData);
        if (storageDataValue.length == 0) {
            storageDataValue.push(questionData);
        }
        else {
            let updated = false;
            for (var i = 0; i < storageDataValue.length; i++) {
                let qData = storageDataValue[i];
                if (qData.meta.id == questionData.meta.id) {
                    Object.assign(qData, questionData);
                    updated = true;
                    break;
                }
            }
            if (!updated) {
                storageDataValue.push(questionData);
            }
        }
        let localDataJson = JSON.stringify(storageDataValue);
        window.localStorage.setItem(__classPrivateFieldGet(this, _a, "f", _GlobalMeta_storageSectionName), localDataJson);
        __classPrivateFieldGet(this, _a, "m", _GlobalMeta_generateAddedEvent).call(this, questionData.meta.id, questionData.meta.type);
    }
    static updateQuestion(questionData) {
        if (questionData == null || questionData == undefined) {
            console.error('Значение questionData не может быть null');
            return;
        }
        if (questionData.meta.id == undefined) {
            console.error('Значение questionData.meta.id не может быть null');
            return;
        }
        let storageData = window.localStorage.getItem(__classPrivateFieldGet(this, _a, "f", _GlobalMeta_storageSectionName));
        if (storageData == null) {
            console.error('В localstorage не найдено значение для ' + __classPrivateFieldGet(this, _a, "f", _GlobalMeta_storageSectionName));
            return;
        }
        let storageDataValue = JSON.parse(storageData);
        if (storageDataValue.length == 0) {
            console.error(`Не удалось обновить данные для id: ${questionData.meta.id} - сущности отсутсвуют в массиве "${__classPrivateFieldGet(this, _a, "f", _GlobalMeta_storageSectionName)}"`);
            return;
        }
        let updated = false;
        for (var i = 0; i < storageDataValue.length; i++) {
            let qData = storageDataValue[i];
            if (qData.meta.id == questionData.meta.id) {
                Object.assign(qData, questionData);
                updated = true;
                break;
            }
        }
        let localDataJson = JSON.stringify(storageDataValue);
        window.localStorage.setItem(__classPrivateFieldGet(this, _a, "f", _GlobalMeta_storageSectionName), localDataJson);
        __classPrivateFieldGet(this, _a, "m", _GlobalMeta_generateUpdatedEvent).call(this, questionData.meta.id, questionData.meta.type);
    }
    static getSlide(id) {
        let dataJson = window.localStorage.getItem(__classPrivateFieldGet(this, _a, "f", _GlobalMeta_storageSectionName));
        let data = JSON.parse(dataJson);
        let questionData = data.filter(x => x.meta.id == id)[0];
        return questionData;
    }
}
_a = GlobalMeta, _GlobalMeta_generateAddedEvent = function _GlobalMeta_generateAddedEvent(questionId, type) {
    __classPrivateFieldGet(this, _a, "m", _GlobalMeta_generateEventInternal).call(this, questionAddedEvent, { questionId, type });
}, _GlobalMeta_generateUpdatedEvent = function _GlobalMeta_generateUpdatedEvent(questionId, type) {
    __classPrivateFieldGet(this, _a, "m", _GlobalMeta_generateEventInternal).call(this, questionUpdatedEvent, { questionId, type });
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
export class QuestionData {
    constructor() {
        this.meta = new Meta();
    }
}
export class Meta {
}
//# sourceMappingURL=globalMeta.js.map