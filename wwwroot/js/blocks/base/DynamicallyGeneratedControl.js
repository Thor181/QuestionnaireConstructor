//@ts-check

import { generateControl } from "./getControl.js";

export default class DynamicallyGeneratedControl {

    /**@type {string}*/
    path

    /**@type {{}} */
    parameters

    constructor(path, parameters) {
        this.path = path;
        this.parameters = parameters;
    }

    async getControl() {
        return await generateControl(this.path, this.parameters);
    }
}