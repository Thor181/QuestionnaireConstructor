import BaseComponent from "./Base/BaseComponent.js";

class SlideTunerCardItem extends BaseComponent {

    components: { [key: string]: BaseComponent; };
    rendered: { innerContent: string }

    constructor() {
        super();
        this.rendered = Object.create({});
    }

    /**
     * @override
     */
    async render(): Promise<string> {
        return await super.getControl("/js/components/SlideTunerCardItem.html", this.rendered);
    }
}

export default SlideTunerCardItem;