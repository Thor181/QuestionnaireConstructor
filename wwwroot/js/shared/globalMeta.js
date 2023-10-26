//@ts-check

import consts from "./consts.js";

export class GlobalMeta {

    static questions = []

    /**
     * 
     * @param {string} questionData
     */
    static addQuestion(questionData) {
        let el = this.createQuestionElement();
        el.text(questionData);

        $(consts.selectors.dataGlobalMeta).append(el)
        this.questions.push(el);




        window.localStorage.setItem('question', questionData);

        window.localStorage.getItem('q')
    }

    /**@private */
    static generateId() {

    }

    /**@private */
    static createQuestionElement() {
        return $('<question></question>')
    }
}