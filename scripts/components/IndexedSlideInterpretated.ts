import * as consts from '../shared/constants.js';

const selectedStateClass: consts.stateModifier = 'sidebar__item--selected';
const sidebarItemSelector: consts.selector = '.sidebar__item';

class IndexedSlideInterpretated {

    private element: JQuery<any>;

    constructor(element: JQuery<any>) {

        if (element.attr('data-type') == null) {

            element = element.parent('[data-type]');

            if (element == null) {
                throw new Error('element must have a parent with the "data-type" attribute or must have this attribute');
            }
        }

        this.element = element;
    }

    getMetaDataId(): number {
        return Number(this.element.find('[data-meta-id]').attr('data-meta-id'));
    }

    getMetaOrder(): number {
        return Number(this.element.find('[data-meta-order]').attr('data-meta-order'));
    }

    getIndex(): number {
        return Number(this.element.find('[index]').attr('index'));
    }

    getTitle(): string {
        return this.element.find('[data-kind="title"]').text();
    }

    setTitle(title: string) {
        this.element.find('[data-kind="title"]').text(title);
    }

    setSelectedStatus() {
        let parent = this.element.parent(sidebarItemSelector);

        parent.siblings().removeClass(selectedStateClass);
        parent.addClass(selectedStateClass);
    }
    
}

export default IndexedSlideInterpretated;