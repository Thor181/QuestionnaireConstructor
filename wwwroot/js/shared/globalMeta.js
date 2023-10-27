//@ts-check

import consts from "./consts.js";

export class GlobalMeta {
    static #storageSectionName = 'Questions';

    static initialize() {
        let dataJson = window.localStorage.getItem(this.#storageSectionName);

        /** @type {Array}*/
        let data = JSON.parse(dataJson);

        for (var i = 0; i < data.length; i++) {
            /**@type {QuestionData}*/
            let item = data[i];
            this.#generateEvent(item.meta.id, item.meta.type);
        }
    }

    /**
     * @param {QuestionData} questionData
     */
    static addOrUpdateQuestion(questionData) {
        if (questionData == null || questionData == undefined) {
            console.error('Значение questionData не может быть null')
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

        this.#generateEvent(questionData.meta.id, questionData.meta.type);
    }

    /**
     * 
     * @param {number} questionId
     * @param {string} type
     */
    static #generateEvent(questionId, type) {
        let event = new CustomEvent(consts.events.globalMeta__questionAdded, { detail: { questionId, type} });
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
    static getQuestion(id) {
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
}

