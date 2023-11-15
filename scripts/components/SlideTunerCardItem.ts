import BaseComponent from "./Base/BaseComponent.js";

class SlideTunerCardItem extends BaseComponent {
    rendered: { innerContent: string }

    constructor() {
        super();
        this.rendered = Object.create({});
    }

    async render(): Promise<string> {
        return await super.getControl("/js/components/SlideTunerCardItem.html", this.rendered);
    }
}

export default SlideTunerCardItem;