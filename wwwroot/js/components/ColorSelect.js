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
class ColorSelect extends BaseComponent {
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
            if (isNullOrEmpty(this.rendered.removeFor))
                this.rendered.removeFor = generateShortUniq();
            return yield _super.getControl.call(this, "/js/components/ColorSelect.html", this.rendered);
        });
    }
}
export default ColorSelect;
//# sourceMappingURL=ColorSelect.js.map