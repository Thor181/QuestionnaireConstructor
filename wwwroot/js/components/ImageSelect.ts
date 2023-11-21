import BaseComponent from "./Base/BaseComponent.js";
import TextInputBase from "./Base/TextInputBase.js";
import TextInputRemovable from "./TextInputRemovable.js";

class ImageSelect extends BaseComponent {

    rendered: { removeFor: string };
    components: { TextInput: TextInputBase };

    constructor() {
        super();
        this.rendered = Object.create({});
        this.components = Object.create({});
    }

    async render(): Promise<string> {
        return await super.getControl("/js/components/ImageSelect.html", this.rendered);
    }

}

export default ImageSelect;