import BaseComponent from "./Base/BaseComponent.js";
import * as consts from '../shared/constants.js'

const gappedStyleClass: consts.styleModifier = "button--gapped";
const removebtnType: consts.componentType = "removebtn";

class Button extends BaseComponent {

    rendered: { title: string, imagePath: string, classes: Array<string>, style: Array<string> };

    constructor() {
        super();
        this.rendered = Object.create({title: '', imagePath: '', classes: [], style: []});
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

        return await super.getControl("/js/components/Button.html", { ...renderedInternal, dataType: removebtnType } );
    }

}

export default Button;