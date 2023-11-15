import { log } from "./Logger.js";
const renderTypes = {
    'Title': 'text',
    'Subtitle': 'text',
    'Infotitle': 'text',
    'Infotext': 'text',
    'Question': 'text',
    'Assistive text': 'text',
    'NextPrevButtons': 'nextprevbuttons',
    'Buttons': 'buttons',
    getValueByKey(key) { return renderTypes[key]; },
    getKeyByValue(value) { return Object.keys(renderTypes).find(x => renderTypes[x] === value); }
};
const availableSaveDataTypes = {
    Text: 'Text',
    NextPrevButtons: 'NextPrevButtons',
    Buttons: 'Buttons'
};
const saveDataTypes = {
    [availableSaveDataTypes.Text]: ['Title', 'Subtitle', 'Infotitle', 'Infotext', 'Question', 'Assistive text'],
    [availableSaveDataTypes.NextPrevButtons]: ['Button next', 'Button previous'],
    [availableSaveDataTypes.Buttons]: [''],
    getTypeByValue(value) {
        for (let i in saveDataTypes) {
            if (i == saveDataTypes.getTypeByValue.name)
                continue;
            let data = saveDataTypes[i];
            if (data.find(x => x === value) != null) {
                return i;
            }
        }
    }
};
const combine = (attribute, value) => {
    return `[${attribute}='${value}']`;
};
export { combine, renderTypes, saveDataTypes, availableSaveDataTypes };
const slideType = {
    info: 'info',
    question: 'question',
    yesno: 'yesno',
    multiselect: 'multiselect'
};
const map = new Map();
map.set(slideType.info, "slide-wrapper__thumbnail-picture--info");
map.set(slideType.question, "slide-wrapper__thumbnail-picture--question");
map.set(slideType.yesno, "slide-wrapper__thumbnail-picture--yesno");
map.set(slideType.multiselect, "slide-wrapper__thumbnail-picture--multi");
export function mapTypeToImageModifier(type) {
    let t = map.get(type);
    if (t == null)
        log("warn", "Type " + type + " not found in imageModifier map");
    return t;
}
//# sourceMappingURL=constants.js.map