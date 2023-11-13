import BaseComponent from "./Base/BaseComponent.js";
import TextInputBase from "./Base/TextInputBase.js";

class TextInput extends TextInputBase {
    constructor() {
        super("/js/components/TextInput.html");
        this.rendered = Object.create({});
    }
}

export default TextInput;