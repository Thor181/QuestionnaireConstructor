import * as consts from '../shared/constants.js'
import BaseComponent from "./Base/BaseComponent.js";
import SlideTunerCardItem from './SlideTunerCardItem.js';
import TextInput from './TextInput.js';

const slideTunerCardSelector: consts.selector = '.slide-tuner__card';
const textType: consts.componentType = 'text';

class SlideTunerCardGenerator extends BaseComponent {

    textComponents: Array<string>;

    componentsOrder: Array<consts.componentType>;

    constructor() {
        super();
        this.componentsOrder = [];
        this.textComponents = [];
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

    async addRemoveButton(title: string = 'Remove'): Promise<void> {

    }

    async render(): Promise<string> {
        let reversedTextComponents = this.textComponents.reverse();

        let renderedComponent = '';
        this.componentsOrder.forEach(item => {
            if (item == textType) {
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