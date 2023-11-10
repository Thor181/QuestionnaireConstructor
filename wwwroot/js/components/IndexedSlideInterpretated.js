const selectedStateClass = 'sidebar__item--selected';
const sidebarItemSelector = '.sidebar__item';
class IndexedSlideInterpretated {
    constructor(element) {
        if (element.attr('data-type') == null) {
            element = element.parent('[data-type]');
            if (element == null) {
                throw new Error('element must have a parent with the "data-type" attribute or must have this attribute');
            }
        }
        this.element = element;
    }
    getMetaDataId() {
        return Number(this.element.find('[data-meta-id]').attr('data-meta-id'));
    }
    getMetaOrder() {
        return Number(this.element.find('[data-meta-order]').attr('data-meta-order'));
    }
    getIndex() {
        return Number(this.element.find('[index]').attr('index'));
    }
    getTitle() {
        return this.element.find('[data-kind="title"]').text();
    }
    setTitle(title) {
        this.element.find('[data-kind="title"]').text(title);
    }
    setSelectedStatus() {
        let parent = this.element.parent(sidebarItemSelector);
        parent.siblings().removeClass(selectedStateClass);
        parent.addClass(selectedStateClass);
    }
}
export default IndexedSlideInterpretated;
//# sourceMappingURL=IndexedSlideInterpretated.js.map