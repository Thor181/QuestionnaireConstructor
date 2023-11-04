//@ts-check

import consts from "./consts.js";

export class GlobalMeta {
    static #storageSectionName = 'Slides';

    static initialize() {
        let dataJson = window.localStorage.getItem(this.#storageSectionName);

        /** @type {Array}*/
        let data = JSON.parse(dataJson);
        
        for (var i = 0; i < data.length; i++) {
            /**@type {QuestionData}*/
            let item = data.filter(x => x.meta.order == i + 1)[0];
            this.#generateAddedEvent(item.meta.id, item.meta.type);
        }
    }

    /**
     * @param {QuestionData} questionData
     */
    static addOrUpdateQuestion(questionData) {
        if (questionData == null || questionData == undefined) {
            console.error('Значение questionData не может быть null');
            return;
        }

        if (questionData.meta.id == null) {
            questionData.meta.id = Math.floor(Math.random() * 1000000);
        }

        let storageData = window.localStorage.getItem(this.#storageSectionName) ?? this.#createStorageSection();

        /** @type {Array}*/
        let storageDataValue = JSON.parse(storageData);

        if (storageDataValue.length == 0) {
            storageDataValue.push(questionData);
        }
        else {

            let updated = false;
            for (var i = 0; i < storageDataValue.length; i++) {

                /**@type {QuestionData}*/
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
        window.localStorage.setItem(this.#storageSectionName, localDataJson);

        this.#generateAddedEvent(questionData.meta.id, questionData.meta.type);
    }

    /**
     * 
     * @param {QuestionData} questionData
     */
    static updateQuestion(questionData) {
        if (questionData == null || questionData == undefined) {
            console.error('Значение questionData не может быть null')
            return;
        }

        if (questionData.meta.id == undefined) {
            console.error('Значение questionData.meta.id не может быть null')
            return;
        }

        let storageData = window.localStorage.getItem(this.#storageSectionName);
        if (storageData == null) {
            console.error('В localstorage не найдено значение для ' + this.#storageSectionName)
            return;
        }

        /** @type {Array}*/
        let storageDataValue = JSON.parse(storageData);

        if (storageDataValue.length == 0) {
            console.error(`Не удалось обновить данные для id: ${questionData.meta.id} - сущности отсутсвуют в массиве "${this.#storageSectionName}"`)
            return;
        }

        let updated = false;
        for (var i = 0; i < storageDataValue.length; i++) {

            /**@type {QuestionData}*/
            let qData = storageDataValue[i];

            if (qData.meta.id == questionData.meta.id) {
                Object.assign(qData, questionData);
                updated = true;
                break;
            }
        }

        let localDataJson = JSON.stringify(storageDataValue);
        window.localStorage.setItem(this.#storageSectionName, localDataJson);

        this.#generateUpdatedEvent(questionData.meta.id, questionData.meta.type);
    }

    /**
     * 
     * @param {number} questionId
     * @param {string} type
     */
    static #generateAddedEvent(questionId, type) {
        this.#generateEventInternal(consts.events.globalMeta__questionAdded, { questionId, type })
    }

    /**
     * 
     * @param {number} questionId
     * @param {string} type
     */
    static #generateUpdatedEvent(questionId, type) {
        this.#generateEventInternal(consts.events.globalMeta__questionUpdated, { questionId, type })
    }

    /**
     * @param {string} eventType
     * @param {object} detail
     */
    static #generateEventInternal(eventType, detail) {
        let event = new CustomEvent(eventType, { detail: detail });
        document.querySelector(consts.selectors.globalMeta).dispatchEvent(event);
    }

    static #createStorageSection() {
        let value = [];
        let valueJson = JSON.stringify(value);
        window.localStorage.setItem(this.#storageSectionName, valueJson);
        return valueJson;
    }

    /**
     * @param {number} id
     */
    static getSlide(id) {
        let dataJson = window.localStorage.getItem(this.#storageSectionName);

        /** @type {Array}*/
        let data = JSON.parse(dataJson);

        /** @type {QuestionData}*/
        let questionData = data.filter(x => x.meta.id == id)[0];

        return questionData;
    }
}

export class QuestionData {
    /** @type {Meta}*/
    meta = new Meta();

    /** @type {object}*/
    data
}

export class Meta {
    /**@type {number}*/
    id;

    /**@type {string}*/
    type

    /**@type {number}*/
    order
}

