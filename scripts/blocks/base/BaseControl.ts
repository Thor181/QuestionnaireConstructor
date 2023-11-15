import {getControl} from "./getControl.js";

export default class BaseControl {

    data: string

    /**
     * @type {string}
     * @protected
     */
    path;

    /**
     * @param {string} path
     */
    constructor(path: string) {
        this.path = path;
    }

    async getControl() {
        this.data = JSON.stringify(this);
        return await getControl(this.path, this); 
    }
}