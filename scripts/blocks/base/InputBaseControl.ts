//@ts-check

import consts from "../../shared/constsJ.js";
import BaseControl from "./BaseControl.js";
import { getInputControl as getInputControlBase } from './getControl.js'

export default class InputBaseControl extends BaseControl {
    title: string
    inputValue: string
    placeholder: string

    async getInputControl() {
        this.title += consts.shared.asHeader;
        this.inputValue += consts.shared.asHeader;

        return await getInputControlBase(this.path, this);
    }
}