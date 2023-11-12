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
};
const saveDataTypes = {
    [availableSaveDataTypes.Text]: ['Title', 'Subtitle', 'Infotitle', 'Infotext', 'Question', 'Assistive text'],
    [availableSaveDataTypes.NextPrevButtons]: ['Button next', 'Button previous'],
    getTypeByValue(value) {
        for (let i in saveDataTypes) {
            let data = saveDataTypes[i];
            if (data.find(x => x === value) != null) {
                return i;
            }
        }
    }
};
const slideType = {
    info: 'info',
    question: 'question',
    yesno: 'yesno',
};
const combine = (attribute, value) => {
    return `[${attribute}='${value}']`;
};
export { combine, renderTypes, saveDataTypes, availableSaveDataTypes };
const map = new Map();
map.set(slideType.info, "slide-wrapper__thumbnail-picture--info");
map.set(slideType.question, "slide-wrapper__thumbnail-picture--question");
map.set(slideType.yesno, "slide-wrapper__thumbnail-picture--yesno");
export function mapTypeToImageModifier(type) {
    return map.get(type);
}
//# sourceMappingURL=constants.js.map