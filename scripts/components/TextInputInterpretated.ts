import * as consts from '../shared/constants.js';

const childForSelector: consts.selector = '[child-for]';
const childForAttr: consts.attribute = 'child-for';

class TextInputInterpretated {

    private element: JQuery<any>;

    constructor(element: JQuery<any>) {

        if (element.attr('data-type') == null) {

            element = element.parent('[data-type]');

            if (element.attr('data-type') == null) {
                throw new Error('element must have "data-type" attribute');
            }
        }

        this.element = element;
    }

    getTitle(): string {
        let attr = consts.combine('data-kind', 'title')
        return this.element.find(attr).text();
    }

    getValue(): string {
        let attr = consts.combine('data-kind', 'value')
        return String(this.element.find('[data-kind="value"]').val());
    }

    getChildFor(): string {
        return this.element.find(childForSelector).attr(childForAttr);
    }
}

export default TextInputInterpretated;