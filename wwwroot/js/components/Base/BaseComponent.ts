import { componentPath } from "../../shared/constants";

abstract class BaseComponent {

    abstract rendered: { [key: string]: any };
    abstract components: { [key: string]: BaseComponent };

    /**@virtual */
    abstract render(): Promise<string>;

    protected async getControl(path: componentPath, parameters: { [key: string]: any }) {

        let response = await fetch(path);
        if (response.ok) {

            for (var i in this.components) {
                let component = this.components[i]
                parameters = { ...parameters, [i]: await component.render() };
            }

            let control = await response.text();

            if (parameters != undefined) {
                for (let key in parameters) {

                    control = replaceAll(control, `[[${key}]]`, parameters[key]);
                    control = replaceAll(control, `{{${key}}}`, parameters[key]);
                }
            }

            return control;
        }

        console.error(await response.text());
        return '{{undefined}}';
    }
}

export default BaseComponent;

export function replaceAll(string: string, search: string, replace: string): string {
    return string.split(search).join(replace ?? "");
}