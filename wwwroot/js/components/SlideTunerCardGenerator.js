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
import Button from './Button.js';
import SlideTunerCardExpandItem from './SlideTunerCardExpandItem.js';
import SlideTunerCardItem from './SlideTunerCardItem.js';
import TextInput from './TextInput.js';
import Fieldset from './Fieldset.js';
import TextInputRemovable from './TextInputRemovable.js';
import generateShortUniq from '../shared/guid.js';
import ToggleSwitch from './ToggleSwitch.js';
const deleteImagePath = '/img/delete.svg';
const addImagePath = '/img/add.svg';
class SlideTunerCardGenerator extends BaseComponent {
    constructor() {
        super();
        this.componentsOrder = [];
        this.textComponents = [];
        this.fieldsets = [];
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
            this.componentsOrder.push('text');
        });
    }
    addButtonsNextAndPrevious(nextBtnConfig, prevBtnConfig) {
        return __awaiter(this, void 0, void 0, function* () {
            const nextBtn = new TextInput();
            nextBtn.rendered = Object.assign(Object.assign({}, nextBtnConfig), { childFor: '', metaValue: 1 });
            const renderedNextBtn = yield nextBtn.render();
            const prevBtn = new TextInput();
            prevBtn.rendered = Object.assign(Object.assign({}, prevBtnConfig), { childFor: '', metaValue: 0 });
            const renderedPrevBtn = yield prevBtn.render();
            const extendedItem = new SlideTunerCardExpandItem();
            extendedItem.rendered.innerContent.push(renderedNextBtn);
            extendedItem.rendered.innerContent.push(renderedPrevBtn);
            const renderedItem = yield extendedItem.render();
            this.textComponents.push(renderedItem);
            this.componentsOrder.push('text');
        });
    }
    addButtons(configs, fieldsetLegend, canAdd) {
        return __awaiter(this, void 0, void 0, function* () {
            let fieldset = yield this.addFieldset(fieldsetLegend, 'Buttons');
            for (var i = 0; i < configs.length; i++) {
                let config = configs[i];
                let button;
                if (config.removable == true) {
                    let btn = new TextInputRemovable();
                    btn.removeFor = generateShortUniq();
                    button = btn;
                }
                else {
                    button = new TextInput();
                }
                button.rendered.title = config.title;
                button.rendered.inputValue = config.inputValue;
                button.rendered.placeholder = config.placeholder;
                button.rendered.metaValue = i + 1;
                let renderedButton = yield button.render();
                fieldset.children.push(renderedButton);
            }
            if (canAdd) {
                var button_add = new Button();
                button_add.rendered.title = 'Add variant';
                button_add.rendered.imagePath = addImagePath;
                button_add.dataType = 'addbtn';
                fieldset.rendered.button_add = yield button_add.render();
            }
            let item = new SlideTunerCardItem();
            item.rendered.innerContent = yield fieldset.render();
            let renderedItem = yield item.render();
            this.fieldsets.push(renderedItem);
        });
    }
    addFieldset(legend, topLevel) {
        return __awaiter(this, void 0, void 0, function* () {
            let fieldset = new Fieldset();
            fieldset.rendered.legend = legend;
            fieldset.rendered.topLevel = topLevel;
            this.componentsOrder.push('fieldset');
            return fieldset;
        });
    }
    addRemoveButton(title = 'Delete') {
        return __awaiter(this, void 0, void 0, function* () {
            const button = new Button();
            button.rendered.title = title;
            button.rendered.imagePath = deleteImagePath;
            button.dataType = 'removebtn';
            const renderedButton = yield button.render();
            const cardItem = this.createSlideTunerCardItem(renderedButton);
            const renderedCardItem = yield cardItem.render();
            this.textComponents.push(renderedCardItem);
            this.componentsOrder.push('removebtn');
        });
    }
    addToggleSwitch(config) {
        return __awaiter(this, void 0, void 0, function* () {
            const toggleSwitch = new ToggleSwitch();
            toggleSwitch.rendered = config;
            const rendered = yield toggleSwitch.render();
            const cardItem = this.createSlideTunerCardItem(rendered);
            const renderedCardItem = yield cardItem.render();
            this.textComponents.push(renderedCardItem);
            this.componentsOrder.push('toggleswitch');
        });
    }
    render() {
        return __awaiter(this, void 0, void 0, function* () {
            let reversedTextComponents = this.textComponents.reverse();
            let reversedFieldsets = this.fieldsets.reverse();
            let renderedComponent = '';
            this.componentsOrder.forEach(item => {
                if (item == 'fieldset') {
                    renderedComponent += reversedFieldsets.pop();
                }
                else {
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