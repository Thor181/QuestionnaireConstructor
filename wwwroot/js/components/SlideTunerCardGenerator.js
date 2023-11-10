var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import BaseComponent from "./Base/BaseComponent.js";
import SlideTunerCardItem from './SlideTunerCardItem.js';
import TextInput from './TextInput.js';
const slideTunerCardSelector = '.slide-tuner__card';
const textType = 'text';
class SlideTunerCardGenerator extends BaseComponent {
    constructor() {
        super();
        this.componentsOrder = [];
        this.textComponents = [];
    }
    addTextComponent(title, value, placeholder = '') {
        return __awaiter(this, void 0, void 0, function* () {
            const newItem = new TextInput();
            newItem.rendered.title = title;
            newItem.rendered.inputValue = value;
            newItem.rendered.placeholder = placeholder;
            const renderedItem = yield newItem.render();
            const cardItem = this.createSlideTunerCardItem(renderedItem);
            const renderedCardItem = yield cardItem.render();
            this.textComponents.push(renderedCardItem);
            this.componentsOrder.push(textType);
        });
    }
    addRemoveButton(title = 'Remove') {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
    render() {
        return __awaiter(this, void 0, void 0, function* () {
            let reversedTextComponents = this.textComponents.reverse();
            let renderedComponent = '';
            this.componentsOrder.forEach(item => {
                if (item == textType) {
                    renderedComponent += reversedTextComponents.pop();
                }
            });
            return renderedComponent;
        });
    }
    createSlideTunerCardItem(innerContent = '') {
        let item = new SlideTunerCardItem();
        item.rendered = { innerContent };
        return item;
    }
}
export default SlideTunerCardGenerator;
//# sourceMappingURL=SlideTunerCardGenerator.js.map