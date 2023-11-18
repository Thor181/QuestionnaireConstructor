var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import BaseComponent from "./Base/BaseComponent.js";
const gappedStyleClass = "button--gapped";
class Button extends BaseComponent {
    constructor() {
        super();
        this.rendered = Object.create({ title: '', imagePath: '', classes: [], style: [] });
    }
    render() {
        const _super = Object.create(null, {
            getControl: { get: () => super.getControl }
        });
        return __awaiter(this, void 0, void 0, function* () {
            if (this.rendered.imagePath != '') {
                this.rendered.classes.push(gappedStyleClass);
            }
            const renderedInternal = Object.assign(Object.assign({}, this.rendered), { classes: this.rendered.classes.join(' '), style: this.rendered.style.join(' ') });
            return yield _super.getControl.call(this, "/js/components/Button.html", Object.assign(Object.assign({}, renderedInternal), { dataType: this.dataType }));
        });
    }
}
export default Button;
//# sourceMappingURL=Button.js.map