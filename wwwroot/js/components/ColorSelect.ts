import generateShortUniq from "../shared/guid.js";
import { isNullOrEmpty } from "../shared/utils.js";
import BaseComponent from "./Base/BaseComponent.js";

class ColorSelect extends BaseComponent {
    rendered: { color: string, removeFor?: string, value: string };
    components: { [key: string]: BaseComponent; };

    constructor() {
        super();
        this.rendered = Object.create({});
        this.components = Object.create({});
    }

    async render(): Promise<string> {

        if (isNullOrEmpty(this.rendered.removeFor))
            this.rendered.removeFor = generateShortUniq();

        return await super.getControl("/js/components/ColorSelect.html", this.rendered);
    }

}

export default ColorSelect;