import BaseNewControl from "./BaseNewControl.js";
export default class ContainerControl extends BaseNewControl {
    get innerContent() {
        return this.data;
    }
    set innerContent(value) {
        this.data = { innerContent: value };
    }
}
//# sourceMappingURL=ContainerControl.js.map