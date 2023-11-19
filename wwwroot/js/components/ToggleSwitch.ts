import generateShortUniq from "../shared/guid.js";
import { isNullOrEmpty } from "../shared/utils.js";
import BaseComponent from "./Base/BaseComponent.js";
import * as consts from '../shared/constants.js'

type checked = 'checked' | '';
type toggleSwitchRendered = { id?: string, title: string, dataMetaTitle: string, dataType: consts.componentType, dataKind: string, checked: checked }

class ToggleSwitch extends BaseComponent {

    rendered: toggleSwitchRendered

    constructor() {
        super();
        this.rendered = Object.create({ });
    }

    async render(): Promise<string> {

        if (isNullOrEmpty(this.rendered.id)) {
            this.rendered.id = generateShortUniq();
        }

        return await super.getControl("/js/components/ToggleSwitch.html", this.rendered);
    }
}

export default ToggleSwitch;

export { toggleSwitchRendered }