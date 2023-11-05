var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class BaseComponent {
    getControl(path, parameters) {
        return __awaiter(this, void 0, void 0, function* () {
            let response = yield fetch(path);
            if (response.ok) {
                let control = yield response.text();
                if (parameters != undefined) {
                    for (let key in parameters) {
                        control = replaceAll(control, `{{${key}}}`, parameters[key]);
                    }
                }
                return control;
            }
            console.error(yield response.text());
            return '{{undefined}}';
        });
    }
}
export default BaseComponent;
export function replaceAll(string, search, replace) {
    return string.split(search).join(replace !== null && replace !== void 0 ? replace : "");
}
//# sourceMappingURL=BaseComponent.js.map