//@ts-check

import { getControl } from "./getControl.js";

export default class BaseControl {

    data

    /**
     * @type {string}
     * @private
     */
    path;

    /**
     * @param {string} path
     */
    constructor(path) {
        this.path = path;
    }

    async getControl() {
        this.data = JSON.stringify(this);
        return await getControl(this.path, this);
    }
}