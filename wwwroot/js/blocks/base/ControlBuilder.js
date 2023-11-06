var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import consts from "../../shared/constsJ.js";
import { getControlPure, replaceAll } from "./getControl.js";
export default class ControlBuilder {
    constructor(path) {
        this.addableTexts = [];
        this.buttons = [];
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
    build() {
        return __awaiter(this, void 0, void 0, function* () {
            this.control = yield getControlPure(this.path);
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
        });
    }
}
//# sourceMappingURL=ControlBuilder.js.map