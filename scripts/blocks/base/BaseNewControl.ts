//@ts-check

import {getControl} from "./getControl.js";

export default class BaseNewControl {

    path: string;

    data: object;

    constructor(path: string, data: object) {
        this.path = path;
        this.data = data;
    }

    async getControl() {
        return await getControl(this.path, this.data);
    }
}