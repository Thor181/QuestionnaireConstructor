import * as consts from '../shared/constants.js';
const childForSelector = '[child-for]';
const childForAttr = 'child-for';
class TextInputInterpretated {
    constructor(element) {
        if (element.attr('data-type') == null) {
            element = element.parents('[data-type]');
            if (element.attr('data-type') == null) {
                throw new Error('element must have "data-type" attribute');
            }
        }
        this.element = element;
    }
    getTitle() {
        let attr = consts.combine('data-kind', 'title');
        return this.element.find(attr).text();
    }
    getValue() {
        let attr = consts.combine('data-kind', 'value');
        return String(this.element.find('[data-kind="value"]').val());
    }
    getChildFor() {
        return this.element.find(childForSelector).attr(childForAttr);
    }
}
export default TextInputInterpretated;
//# sourceMappingURL=TextInputInterpretated.js.map