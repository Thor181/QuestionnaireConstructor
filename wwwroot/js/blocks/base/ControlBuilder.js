//@ts-check

import { getControlPure, replaceAll } from "./getControl.js";

export default class ControlBuilder {

    /**@type {string}*/
    path

    /**@type {string}*/
    control

    /**@type {[{Key, Value}]}*/
    addableTexts = [];

    constructor(path) {
        this.path = path;
    }

    mathodsMap = { text: this.addText };

    addText(key, value) {
        this.addableTexts.push({ Key: key, Value: value });
    }

    async build() {
        this.control = await getControlPure(this.path);

        for (var i = 0; i < this.addableTexts.length; i++) {
            let item = this.addableTexts[i];
            this.control = replaceAll(this.control, '{{title}}', item.Key);
            this.control = replaceAll(this.control, '{{inputValue}}', item.Value)
        }

        return this.control;
    }
}