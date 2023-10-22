//@ts-check


/**
 * @param {string} path
 */
export async function getControl(path, parameters) {
    let response = await fetch(path);
    if (response.ok) {
        let control = await response.text();

        for (let i in parameters) {
            control = control.replace(i, parameters[i]);
        }

        return control;
    }

    return 'undefined';
}


