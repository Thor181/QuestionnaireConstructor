import generateShortUniq from "../shared/guid.js";
import { isNullOrEmpty } from "../shared/utils.js";
import BaseComponent from "./Base/BaseComponent.js";
import TextInputBase from "./Base/TextInputBase.js";
import TextInputRemovable from "./TextInputRemovable.js";
import * as consts from '../shared/constants.js'

const inputFileType = consts.renderTypes.InputFile;

class ImageSelect extends BaseComponent {

    rendered: { removeFor: string, fileInputId?: string, selectTitle?: string, dataType?: string };
    components: { TextInput: TextInputBase };

    constructor() {
        super();
        this.rendered = Object.create({});
        this.components = Object.create({});
    }

    async render(): Promise<string> {

        if (isNullOrEmpty(this.rendered.fileInputId)) {
            this.rendered.fileInputId = generateShortUniq();
        }

        if (isNullOrEmpty(this.rendered.selectTitle)) {
            this.rendered.selectTitle = 'Add image';
        }

        if (isNullOrEmpty(this.rendered.dataType)) {
            this.rendered.dataType = inputFileType;
        }


        return await super.getControl("/js/components/ImageSelect.html", this.rendered);
    }

}

export default ImageSelect;