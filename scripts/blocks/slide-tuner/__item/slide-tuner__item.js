var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import consts from "../../../shared/constsJ.js";
import { GlobalMeta } from "../../../shared/GlobalMeta.js";
import ContainerControl from "../../base/ContainerControl.js";
import { SlideTunerCard } from "../__card/slide-tuner__card.js";
export default class SlideTunerItem extends ContainerControl {
    constructor() {
        super('/controls/blocks/slide-tuner/__item/slide-tuner__item.html', {});
    }
}
$(consts.selectors.slideTunerCardClass).on('change', consts.selectors.dataType, function () {
    return __awaiter(this, void 0, void 0, function* () {
        const card = $(this).closest(consts.selectors.slideTunerCardClass);
        const id = Number(SlideTunerCard.getDataMetaId());
        let currentDataObject = GlobalMeta.getSlideData(id);
        let controls = card.find(consts.selectors.dataType);
        for (var i in currentDataObject.data) {
            if (i.toLowerCase() == consts.types.buttons) {
                let buttons = Array.from(currentDataObject.data[i]);
                for (var btn = 0; btn < buttons.length; btn++) {
                    let keys = Object.keys(buttons[btn]);
                    let control = controls.filter(`[data-title='Button \"${buttons[btn][keys[0]]}\"']`);
                    currentDataObject.data[i] = control.val();
                }
            }
            else {
                let control = controls.filter(`[data-title="${i}"]`);
                currentDataObject.data[i] = control.val();
            }
        }
        GlobalMeta.updateSlideData(currentDataObject);
    });
});
//# sourceMappingURL=slide-tuner__item.js.map