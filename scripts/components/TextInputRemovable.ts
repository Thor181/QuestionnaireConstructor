import BaseComponent from "./Base/BaseComponent.js";
import TextInputBase from "./Base/TextInputBase.js";

class TextInputRemovable extends TextInputBase {

    removeFor: string;

    constructor() {
        super("/js/components/TextInputRemovable.html");
        this.rendered = Object.create({});
    }

    /**@override */
    async render(): Promise<string> {
        let renderedInternal = { ...this.rendered, removeFor: this.removeFor };
        return await super.getControl(this.path, renderedInternal);
    }
}

export default TextInputRemovable;