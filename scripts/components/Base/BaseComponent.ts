import { componentPath } from "../../shared/constants";

class BaseComponent {

    protected async getControl(path: componentPath, parameters: any) {

        let response = await fetch(path);
        if (response.ok) {

            let control = await response.text();

            if (parameters != undefined) {
                for (let key in parameters) {
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