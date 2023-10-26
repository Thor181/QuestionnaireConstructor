export function encode(string) {
    return window.btoa(string);
}

export function decode(string) {
    return window.atob(string);
}