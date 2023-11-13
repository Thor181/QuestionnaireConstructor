import { componentPath } from "../../shared/constants.js";
import BaseComponent from "./BaseComponent.js";

class TextInputBase extends BaseComponent {

    /**@virtual */
    rendered: { title: string, inputValue: string, placeholder: string, childFor: string };

    protected path: componentPath;

    constructor(path: componentPath) {
        super();
        this.path = path;
    }

    /**@virtual */
    async render(): Promise<string> {
        return await super.getControl(this.path, this.rendered);
    }
}

export default TextInputBase;