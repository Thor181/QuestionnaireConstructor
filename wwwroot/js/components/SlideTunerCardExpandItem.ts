import BaseComponent from "./Base/BaseComponent.js";

class SlideTunerCardExpandItem extends BaseComponent {

    components: { [key: string]: BaseComponent; };
    rendered: { innerContent: Array<string> }

    constructor() {
        super();
        this.rendered = Object.create({});
        this.rendered.innerContent = [];
    }

    async render(): Promise<string> {

        const renderedInternal = { innerContent: this.rendered.innerContent.join('\n') };

        return await super.getControl("/js/components/SlideTunerCardExpandItem.html", renderedInternal);
    }
}

export default SlideTunerCardExpandItem;