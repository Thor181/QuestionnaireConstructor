//@ts-check

import SlideControl from "./SlideControl.js";

export default class NodeControl extends SlideControl {

    private nodeId:number

    async getControl() {
        this.nodeId = Math.floor(Math.random() * 10000000000);
        return await super.getControl();
    }
}