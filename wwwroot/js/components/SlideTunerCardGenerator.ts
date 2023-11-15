import * as consts from '../shared/constants.js'
import BaseComponent from "./Base/BaseComponent.js";
import Button from './Button.js';
import SlideTunerCardExpandItem from './SlideTunerCardExpandItem.js';
import SlideTunerCardItem from './SlideTunerCardItem.js';
import TextInput from './TextInput.js';
import Fieldset from './Fieldset.js';
import TextInputBase from './Base/TextInputBase.js';
import TextInputRemovable from './TextInputRemovable.js';
import generateShortUniq from '../shared/guid.js';


const slideTunerCardSelector: consts.selector = '.slide-tuner__card';
const textType: consts.componentType = 'text';
const removebtnType: consts.componentType = 'removebtn';
const deleteImagePath: consts.imagePath = '/img/delete.svg';

class SlideTunerCardGenerator extends BaseComponent {

    textComponents: Array<string>;

    componentsOrder: Array<consts.componentType>;

    fieldsets: Array<string>;

    constructor() {
        super();
        this.componentsOrder = [];
        this.textComponents = [];
        this.fieldsets = [];
    }

    async addTextComponent(title: string, value: string, placeholder: string = ''): Promise<void> {
        const newItem = new TextInput();
        newItem.rendered.title = title;
        newItem.rendered.inputValue = value;
        newItem.rendered.placeholder = placeholder;
        const renderedItem = await newItem.render();
        const cardItem = this.createSlideTunerCardItem(renderedItem);
        const renderedCardItem = await cardItem.render();

        this.textComponents.push(renderedCardItem);
        this.componentsOrder.push(textType);
    }

    async addButtonsNextAndPrevious(nextBtnConfig: consts.buttonConfig, prevBtnConfig: consts.buttonConfig): Promise<void> {
        const nextBtn = new TextInput();
        nextBtn.rendered = { ...nextBtnConfig, childFor: '' };
        const renderedNextBtn = await nextBtn.render();

        const prevBtn = new TextInput();
        prevBtn.rendered = { ...prevBtnConfig, childFor: '' };
        const renderedPrevBtn = await prevBtn.render();

        const extendedItem = new SlideTunerCardExpandItem();

        extendedItem.rendered.innerContent.push(renderedNextBtn);
        extendedItem.rendered.innerContent.push(renderedPrevBtn);
        const renderedItem = await extendedItem.render();

        this.textComponents.push(renderedItem);
        this.componentsOrder.push(textType);
    }

    async addButtons(configs: Array<consts.buttonConfig>, fieldsetLegend: string) {

        let fieldset = await this.addFieldset(fieldsetLegend, 'Buttons');
        for (var i = 0; i < configs.length; i++) {
            let config = configs[i];

            let button: TextInputBase;

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
            let renderedButton = await button.render();
            fieldset.children.push(renderedButton);
        }

        let item = new SlideTunerCardItem();
        item.rendered.innerContent = await fieldset.render();
        let renderedItem = await item.render();
        this.fieldsets.push(renderedItem);
    }

    async addFieldset(legend: string, topLevel: string): Promise<Fieldset> {
        let fieldset = new Fieldset();
        fieldset.rendered.legend = legend;
        fieldset.rendered.topLevel = topLevel;
        this.componentsOrder.push('fieldset');
        return fieldset;
    }

    async addRemoveButton(title: string = 'Delete'): Promise<void> {
        const button = new Button();
        button.rendered.title = title;
        button.rendered.imagePath = deleteImagePath;

        const renderedButton = await button.render();

        const cardItem = this.createSlideTunerCardItem(renderedButton);
        const renderedCardItem = await cardItem.render();

        this.textComponents.push(renderedCardItem);
        this.componentsOrder.push(removebtnType);
    }

    async render(): Promise<string> {
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
    }

    private createSlideTunerCardItem(innerContent: string = ''): SlideTunerCardItem {
        let item = new SlideTunerCardItem();
        item.rendered = { innerContent };
        return item;
    }

}

export default SlideTunerCardGenerator;