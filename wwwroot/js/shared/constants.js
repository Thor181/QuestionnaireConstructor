const slideType = {
    info: 'info',
    question: 'question',
    yesno: 'yesno',
};
const map = new Map();
map.set(slideType.info, "slide-wrapper__thumbnail-picture--info");
map.set(slideType.question, "slide-wrapper__thumbnail-picture--question");
map.set(slideType.yesno, "slide-wrapper__thumbnail-picture--yesno");
export function mapTypeToImageModifier(type) {
    return map.get(type);
}
//# sourceMappingURL=constants.js.map