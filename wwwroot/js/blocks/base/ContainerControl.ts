//@ts-check

import BaseNewControl from "./BaseNewControl.js";

export default class ContainerControl extends BaseNewControl {

    get innerContent(): object {
        return this.data;
    }
    /**@param {string} value */
    set innerContent(value: string) {
        this.data = { innerContent: value };
    }
}