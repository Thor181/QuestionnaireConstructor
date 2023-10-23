//@ts-check


/**
 * @param {string} path
 */
export async function getControl(path, parameters) {
    let response = await fetch(path, { cache: "no-store" });
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


/**
 * @param {string} string
 * @param {string} search
 * @param {string} replace
 */
function replaceAll(string, search, replace) {
    return string.split(search).join(replace);
}


