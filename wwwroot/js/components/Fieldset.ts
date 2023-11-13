import BaseComponent, { replaceAll } from "./Base/BaseComponent.js";

class Fieldset extends BaseComponent {

    rendered: { innerContent: string, legend: string, topLevel: string }

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

        return await super.getControl("/js/components/Fieldset.html", renderInternal);
    }
}

export default Fieldset;