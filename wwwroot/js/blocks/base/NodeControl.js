﻿import SlideControl from "./SlideControl.js";

export default class NodeControl extends SlideControl {

    /**
     * @type {string}
     * @private
     */
    nodeId

    async getControl() {
        this.nodeId = Math.floor(Math.random() * 10000000000);
        return await super.getControl();
    }
}