//@ts-check

import BaseControl from "./BaseControl.js";
import BaseNewControl from "./BaseNewControl.js";

export default class ContainerControl extends BaseNewControl {

    /**@type {string} */
    get innerContent() {
        return this.data;
    }
    /**@param {string} value */
    set innerContent(value) {
        this.data = { innerContent: value };
    }
}