var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import BaseComponent, { replaceAll } from "./Base/BaseComponent.js";
class Fieldset extends BaseComponent {
    constructor() {
        super();
        this.rendered = Object.create({ innerContent: '', legend: '', topLevel: '' });
        this.children = [];
    }
    render() {
        const _super = Object.create(null, {
            getControl: { get: () => super.getControl }
        });
        return __awaiter(this, void 0, void 0, function* () {
            let innerContent = this.rendered.innerContent + this.children.join(' ');
            innerContent = replaceAll(innerContent, '{{childFor}}', this.rendered.topLevel);
            let renderInternal = Object.assign(Object.assign({}, this.rendered), { innerContent: innerContent });
            if (this.rendered.button_add != null && this.rendered.button_add.length > 0) {
                renderInternal.innerContent += yield this.rendered.button_add;
            }
            return yield _super.getControl.call(this, "/js/components/Fieldset.html", renderInternal);
        });
    }
}
export default Fieldset;
//# sourceMappingURL=Fieldset.js.map