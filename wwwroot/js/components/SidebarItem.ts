import BaseComponent from "./Base/BaseComponent.js";

class SidebarItem extends BaseComponent {

    components: { [key: string]: BaseComponent; };
    rendered: { innerContent: string }

    constructor() {
        super();
        this.rendered = Object.create({});
    }


    async render(): Promise<string> {
        return await super.getControl("/js/components/SidebarItem.html", this.rendered);
    }
}

export default SidebarItem;