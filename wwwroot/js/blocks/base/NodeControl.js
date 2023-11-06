var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import SlideControl from "./SlideControl.js";
export default class NodeControl extends SlideControl {
    getControl() {
        const _super = Object.create(null, {
            getControl: { get: () => super.getControl }
        });
        return __awaiter(this, void 0, void 0, function* () {
            this.nodeId = Math.floor(Math.random() * 10000000000);
            return yield _super.getControl.call(this);
        });
    }
}
//# sourceMappingURL=NodeControl.js.map