import BaseComponent from "./Base/BaseComponent.js";
import * as consts from '../shared/constants.js'

const gappedStyleClass: consts.styleModifier = "button--gapped";

type btnType = Extract<consts.componentType, "addbtn" | "removebtn" | "addImageBtn">

class Button extends BaseComponent {

    components: { [key: string]: BaseComponent; };
    rendered: { title: string, imagePath: string, classes: Array<string>, style: Array<string> };
    dataType: btnType

    constructor() {
        super();
        this.rendered = Object.create({ title: '', imagePath: '', classes: [], style: [] });
    }

    async render(): Promise<string> {

        if (this.rendered.imagePath != '') {
            this.rendered.classes.push(gappedStyleClass);
        }

        const renderedInternal = {
            ...this.rendered,
            classes: this.rendered.classes.join(' '),
            style: this.rendered.style.join(' ')
        }

        return await super.getControl("/js/components/Button.html", { ...renderedInternal, dataType: this.dataType });
    }

}

export default Button;