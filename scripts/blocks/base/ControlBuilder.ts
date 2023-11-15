//@ts-check

import consts from "../../shared/constsJ.js";
import { getControlPure, replaceAll } from "./getControl.js";

export default class ControlBuilder {

    path: string  

    control: string

    addableTexts: any[] = [];

    /**@type {[{Key, Placeholder, Value}]}*/
    buttons: any[] = [];

    constructor(path: string) {
        this.path = path;
    }
    
    addText(key: string, value: string, placeholder: string) {
        this.addableTexts.push({ Key: key, Value: value, Placeholder: placeholder });
    }

    addButton(key: string, value: string, placeholder: string) {
        this.buttons.push({ Key: `Button "${key}"`, Value: value, Placeholder: placeholder });
    }

    addButtonNext(title: string, placeholder: string) {
        this.addableTexts.push({ Key: 'Button next', Value: title, Placeholder: placeholder });
    }

    addButtonPrevious(title: string, placeholder: string) {
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