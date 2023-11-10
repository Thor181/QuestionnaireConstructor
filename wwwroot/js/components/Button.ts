import BaseComponent from "./Base/BaseComponent.js";

class Button extends BaseComponent {

    rendered: { title: string, classes: Array<string> };

    constructor() {
        super();
        this.rendered = Object.create({title: '', classes: []});
    }

    async render(): Promise<string> {
        const renderedInternal = { title: this.rendered.title, classes: this.rendered.classes.join(' ') }
        return await super.getControl("/js/components/Button.html", renderedInternal);
    }

}

export default Button;