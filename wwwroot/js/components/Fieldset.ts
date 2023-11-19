import BaseComponent, { replaceAll } from "./Base/BaseComponent.js";
import Button from "./Button.js";

class Fieldset extends BaseComponent {

    rendered: { innerContent: string, legend: string, topLevel: string, button_add: string }
   
    children: Array<string>;

    constructor() {
        super();
        this.rendered = Object.create({ innerContent: '', legend: '', topLevel: '' });
        this.children = [];
    }
    
    async render(): Promise<string> {
        let innerContent = this.rendered.innerContent + this.children.join(' ');

        innerContent = replaceAll(innerContent, '{{childFor}}', this.rendered.topLevel);

        let renderInternal = { ...this.rendered, innerContent: innerContent };

        if (this.rendered.button_add != null && this.rendered.button_add.length > 0) {
            renderInternal.innerContent += await this.rendered.button_add;
        }

        return await super.getControl("/js/components/Fieldset.html", renderInternal);
    }
}

export default Fieldset;