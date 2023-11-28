import BaseComponent from "./Base/BaseComponent.js";

class WrapContainer extends BaseComponent {
    rendered: { innerContent: string };
    components:  { [key: string]: BaseComponent; };

    constructor() {
        super();
        this.rendered = Object.create({});
        this.rendered.innerContent = "";
        this.components = Object.create({});
    }

    async render(): Promise<string> {
        return await super.getControl("/js/components/WrapContainer.html", this.rendered);
    }

}

export default WrapContainer;