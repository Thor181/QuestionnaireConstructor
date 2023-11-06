//@ts-check

import consts from "../../shared/constsJ.js";


export async function getControl(path: string, parameters: any) {
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
    return 'undefined';
}

export async function getInputControl(path: string, parameters: any) {
    let response = await fetch(path);
    if (response.ok) {
        let control = await response.text();

        if (parameters != undefined) {
            for (let key in parameters) {
                if (parameters[key]?.includes(consts.shared.asHeader)) {
                    control = control.replace(`{{${key}}}`, parameters[key].replace(consts.shared.asHeader, ''));
                }
            }
        }

        return control;
    }

    console.error(await response.text());
    return 'undefined';
}

export async function generateControl(path: string, parameters: any) {
    let response = await fetch(path);

    if (response.ok) {
        let control = await response.text();

        if (parameters != undefined) {
            for (let key in parameters) {
                control = replaceAll(control, `{{title}}`, key);
                control = replaceAll(control, `{{inputValue}}`, parameters[key]);
            }
        }

        return control;
    }

    console.error(await response.text());
    return 'undefined';
}

export async function getControlPure(path: string) {
    let response = await fetch(path);

    if (response.ok) {
        return await response.text();
    }

    console.error(await response.text());
    return 'undefined';
}

/**
 * @param {string} string
 * @param {string} search
 * @param {string} replace
 */
export function replaceAll(string: string, search: string, replace: string) {
    return string.split(search).join(replace ?? "");
}


