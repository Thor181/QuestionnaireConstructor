//@ts-check

import { getControl } from "./getControl.js";

export default class BaseNewControl {

    /**
     * @type {string}
     * @protected
     */
    path;

    /**
     * @type {object}
     * @protected
     */
    data;

    /**
     * @param {string} path
     * @param {object} data
     */
    constructor(path, data) {
        this.path = path;
        this.data = data;
    }

    async getControl() {
        return await getControl(this.path, this.data);
    }
}