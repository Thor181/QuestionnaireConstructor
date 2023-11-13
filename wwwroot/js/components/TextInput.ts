import BaseComponent from "./Base/BaseComponent.js";

class TextInput extends BaseComponent {

    rendered: { title: string, inputValue: string, placeholder: string, childFor: string  };

    constructor() {
        super();
        this.rendered = Object.create({});
    }

    async render(): Promise<string> {
        return await super.getControl("/js/components/TextInput.html", this.rendered);
    }

}

export default TextInput;