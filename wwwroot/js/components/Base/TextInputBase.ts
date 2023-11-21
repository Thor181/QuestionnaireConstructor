import { componentPath } from "../../shared/constants.js";
import BaseComponent from "./BaseComponent.js";

class TextInputBase extends BaseComponent {

    components: { [key: string]: BaseComponent; };
    rendered: { title: string, inputValue: string, placeholder: string, childFor: string, metaValue: number };

    protected path: componentPath;

    constructor(path: componentPath) {
        super();
        this.path = path;
    }

    /**
     * @override
     */
    async render(): Promise<string> {
        return await super.getControl(this.path, this.rendered);
    }
}

export default TextInputBase;