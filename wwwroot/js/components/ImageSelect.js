var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import generateShortUniq from "../shared/guid.js";
import { isNullOrEmpty } from "../shared/utils.js";
import BaseComponent from "./Base/BaseComponent.js";
import * as consts from '../shared/constants.js';
const inputFileType = consts.renderTypes.InputFile;
class ImageSelect extends BaseComponent {
    constructor() {
        super();
        this.rendered = Object.create({});
        this.components = Object.create({});
    }
    render() {
        const _super = Object.create(null, {
            getControl: { get: () => super.getControl }
        });
        return __awaiter(this, void 0, void 0, function* () {
            if (isNullOrEmpty(this.rendered.fileInputId)) {
                this.rendered.fileInputId = generateShortUniq();
            }
            if (isNullOrEmpty(this.rendered.selectTitle)) {
                this.rendered.selectTitle = 'Add image';
            }
            if (isNullOrEmpty(this.rendered.dataType)) {
                this.rendered.dataType = inputFileType;
            }
            return yield _super.getControl.call(this, "/js/components/ImageSelect.html", this.rendered);
        });
    }
}
export default ImageSelect;
//# sourceMappingURL=ImageSelect.js.map