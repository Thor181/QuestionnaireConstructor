import * as consts from '../shared/constants.js';

const questionAddedEvent: consts.events = 'QuestionAdded';
const questionUpdatedEvent: consts.events = 'QuestionUpdated';
const globalMeta: consts.selector = '#global-meta'

export class GlobalMeta {
    static #storageSectionName = 'Slides';

    static initialize() {

        let dataJson: string = window.localStorage.getItem(this.#storageSectionName);

        let data: Array<QuestionData> = JSON.parse(dataJson);

        for (var i = 0; i < data.length; i++) {
            
            let item: QuestionData = data.filter(x => x.meta.order == i + 1)[0];
            this.#generateAddedEvent(item.meta.id, item.meta.type);
        }
    }

    static addOrUpdateQuestion(questionData: QuestionData) {

        if (questionData == null || questionData == undefined) {
            console.error('Значение questionData не может быть null');
            return;
        }

        if (questionData.meta.id == null) {
            questionData.meta.id = Math.floor(Math.random() * 1000000);
        }

        let storageData: string = window.localStorage.getItem(this.#storageSectionName) ?? this.#createStorageSection();

        let storageDataValue: Array<QuestionData> = JSON.parse(storageData);

        if (storageDataValue.length == 0) {
            storageDataValue.push(questionData);
        }
        else {

            let updated: boolean = false;

            for (var i = 0; i < storageDataValue.length; i++) {

                let qData: QuestionData = storageDataValue[i];

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

        let localDataJson: string = JSON.stringify(storageDataValue);
        window.localStorage.setItem(this.#storageSectionName, localDataJson);

        this.#generateAddedEvent(questionData.meta.id, questionData.meta.type);
    }

    static updateQuestion(questionData: QuestionData) {
        if (questionData == null || questionData == undefined) {
            console.error('Значение questionData не может быть null')
            return;
        }

        if (questionData.meta.id == undefined) {
            console.error('Значение questionData.meta.id не может быть null')
            return;
        }

        let storageData: string = window.localStorage.getItem(this.#storageSectionName);
        if (storageData == null) {
            console.error('В localstorage не найдено значение для ' + this.#storageSectionName)
            return;
        }

        let storageDataValue: Array<QuestionData> = JSON.parse(storageData);

        if (storageDataValue.length == 0) {
            console.error(`Не удалось обновить данные для id: ${questionData.meta.id} - сущности отсутсвуют в массиве "${this.#storageSectionName}"`)
            return;
        }

        let updated: boolean = false;

        for (var i = 0; i < storageDataValue.length; i++) {

            let qData: QuestionData = storageDataValue[i];

            if (qData.meta.id == questionData.meta.id) {
                Object.assign(qData, questionData);
                updated = true;
                break;
            }
        }

        let localDataJson: string = JSON.stringify(storageDataValue);
        window.localStorage.setItem(this.#storageSectionName, localDataJson);

        this.#generateUpdatedEvent(questionData.meta.id, questionData.meta.type);
    }

    static #generateAddedEvent(questionId: number, type: string) {
        this.#generateEventInternal(questionAddedEvent, { questionId, type })
    }

    static #generateUpdatedEvent(questionId: number, type: string) {
        this.#generateEventInternal(questionUpdatedEvent, { questionId, type })
    }

    static #generateEventInternal(eventType: string, detail: object) {
        let event: CustomEvent<object> = new CustomEvent(eventType, { detail: detail });
        document.querySelector(globalMeta).dispatchEvent(event);
    }

    static #createStorageSection(): string  {
        let value: [] = [];
        let valueJson: string = JSON.stringify(value);
        window.localStorage.setItem(this.#storageSectionName, valueJson);
        return valueJson;
    }

    static getSlide(id: number) {
        let dataJson = window.localStorage.getItem(this.#storageSectionName);

        let data: Array<QuestionData> = JSON.parse(dataJson);

        /** @type {QuestionData}*/
        let questionData = data.filter(x => x.meta.id == id)[0];

        return questionData;
    }
}

export class QuestionData {
    meta: Meta = new Meta();
    data: object
}

export class Meta {
    id: number;
    type: string;
    order: number;
}

