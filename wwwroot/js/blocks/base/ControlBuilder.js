//@ts-check

import consts from "../../shared/constsJ.js";
import { getControlPure, replaceAll } from "./getControl.js";

export default class ControlBuilder {

    /**@type {string}*/
    path

    /**@type {string}*/
    control

    /**@type {[{Key, Placeholder, Value}]}*/
    addableTexts = [];

    /**@type {[{Key, Placeholder, Value}]}*/
    buttons = [];

    constructor(path) {
        this.path = path;
    }
    
    addText(key, value, placeholder) {
        this.addableTexts.push({ Key: key, Value: value, Placeholder: placeholder });
    }

    addButton(key, value, placeholder) {
        this.buttons.push({ Key: `Button "${key}"`, Value: value, Placeholder: placeholder });
    }

    addButtonNext(title, placeholder) {
        this.addableTexts.push({ Key: 'Button next', Value: title, Placeholder: placeholder });
    }

    addButtonPrevious(title, placeholder) {
        this.addableTexts.push({ Key: 'Button previous', Value: title, Placeholder: placeholder });
    }

    async build() {
        this.control = await getControlPure(this.path);

        for (var i = 0; i < this.addableTexts.length; i++) {
            let item = this.addableTexts[i];
            this.control = replaceAll(this.control, '{{title}}', item.Key);
            this.control = replaceAll(this.control, '{{inputValue}}', item.Value);
            this.control = replaceAll(this.control, '{{placeholder}}', item.Placeholder);
            this.control = replaceAll(this.control, '{{dataType}}', consts.types.text);
        }

        for (var i = 0; i < this.buttons.length; i++) {
            let item = this.buttons[i];
            this.control = replaceAll(this.control, '{{title}}', item.Key);
            this.control = replaceAll(this.control, '{{inputValue}}', item.Value);
            this.control = replaceAll(this.control, '{{placeholder}}', item.Placeholder);
            this.control = replaceAll(this.control, '{{dataType}}', consts.types.button);
        }

        return this.control;
    }
}