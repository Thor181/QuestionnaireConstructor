import { imageModifier } from "../shared/constants.js";
import BaseComponent from "./Base/BaseComponent.js";

class AvailableSlide extends BaseComponent {

    components: { [key: string]: BaseComponent; };
    rendered: { title: string, imageModifier: imageModifier, schemeName: string, schemeContent: string }

    constructor() {
        super();
        this.rendered = Object.create({});
    }


    async render(): Promise<string> {
        return await super.getControl("/js/components/AvailableSlide.html", this.rendered);
    }
}

export default AvailableSlide;
