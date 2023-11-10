class TextInputInterpretated {
    constructor(element) {
        if (element.attr('data-type') == null) {
            element = element.parent('[data-type]');
            if (element.attr('data-type') == null) {
                throw new Error('element must have "data-type" attribute');
            }
        }
        this.element = element;
    }
    getTitle() {
        return this.element.find('[data-kind="title"]').text();
    }
    getValue() {
        return String(this.element.find('[data-kind="value"]').val());
    }
}
export default TextInputInterpretated;
//# sourceMappingURL=TextInputInterpretated.js.map