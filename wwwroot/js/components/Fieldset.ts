import BaseComponent from "./Base/BaseComponent.js";

class Fieldset extends BaseComponent {

    rendered: { innerContent: string, legend: string }

    children: Array<string>;

    constructor() {
        super();
        this.rendered = Object.create({ innerContent: '', legend: '' });
        this.children = [];
    }

    async render(): Promise<string> {
        let innerContent = this.rendered.innerContent + this.children.join(' ');

        return await super.getControl("/js/components/Fieldset.html", { innerContent: innerContent, legend: this.rendered.legend });
    }
}

export default Fieldset;