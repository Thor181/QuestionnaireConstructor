var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import consts from "../../shared/constsJ.js";
export function getControl(path, parameters) {
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
        return 'undefined';
    });
}
export function getInputControl(path, parameters) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        let response = yield fetch(path);
        if (response.ok) {
            let control = yield response.text();
            if (parameters != undefined) {
                for (let key in parameters) {
                    if ((_a = parameters[key]) === null || _a === void 0 ? void 0 : _a.includes(consts.shared.asHeader)) {
                        control = control.replace(`{{${key}}}`, parameters[key].replace(consts.shared.asHeader, ''));
                    }
                }
            }
            return control;
        }
        console.error(yield response.text());
        return 'undefined';
    });
}
export function generateControl(path, parameters) {
    return __awaiter(this, void 0, void 0, function* () {
        let response = yield fetch(path);
        if (response.ok) {
            let control = yield response.text();
            if (parameters != undefined) {
                for (let key in parameters) {
                    control = replaceAll(control, `{{title}}`, key);
                    control = replaceAll(control, `{{inputValue}}`, parameters[key]);
                }
            }
            return control;
        }
        console.error(yield response.text());
        return 'undefined';
    });
}
export function getControlPure(path) {
    return __awaiter(this, void 0, void 0, function* () {
        let response = yield fetch(path);
        if (response.ok) {
            return yield response.text();
        }
        console.error(yield response.text());
        return 'undefined';
    });
}
export function replaceAll(string, search, replace) {
    return string.split(search).join(replace !== null && replace !== void 0 ? replace : "");
}
//# sourceMappingURL=getControl.js.map