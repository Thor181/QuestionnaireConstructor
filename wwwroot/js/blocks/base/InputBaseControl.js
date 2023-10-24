//@ts-check

import consts from "../../shared/consts.js";
import BaseControl from "./BaseControl.js";
import { getInputControl as getInputControlBase } from './getControl.js'

export default class InputBaseControl extends BaseControl {
    /**
     * @type {string}
     */
    title

    /**
     * @type {string}
     */
    inputValue

    /**
     * @type {string}
     */
    placeholder

    async getInputControl() {
        this.title += consts.shared.asHeader;
        this.inputValue += consts.shared.asHeader;

        return await getInputControlBase(this.path, this);
    }
}