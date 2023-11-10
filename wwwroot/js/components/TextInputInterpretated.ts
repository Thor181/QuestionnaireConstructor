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
        return this.element.find('[data-kind="title"]').text();
    }

    getValue(): string {
        return String(this.element.find('[data-kind="value"]').val());
    }
}

export default TextInputInterpretated;