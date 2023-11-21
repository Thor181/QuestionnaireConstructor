import { imageModifier } from "../shared/constants.js";
import BaseComponent from "./Base/BaseComponent.js";

class IndexedSlide extends BaseComponent {

    components: { [key: string]: BaseComponent; };
    rendered: { title: string, imageModifier: imageModifier, metaId: number, metaOrder: number, index: number };

    constructor() {
        super();
        this.rendered = Object.create({});
    }


    async render(): Promise<string> {
        return await super.getControl("/js/components/IndexedSlide.html", this.rendered);
    }
}

export default IndexedSlide;

