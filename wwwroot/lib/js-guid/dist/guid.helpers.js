"use strict";
/* eslint-disable no-bitwise */
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenerateGuidV4 = exports.isUint8ArrayValidGuid = exports.isStringValidGuid = exports.uint8ArrayToString = exports.stringToUint8Array = exports.ARRAY_LENGTH = void 0;
exports.ARRAY_LENGTH = 16;
const BYTE_ORDER = [3, 2, 1, 0, 5, 4, 7, 6, 8, 9, 10, 11, 12, 13, 14, 15];
/**
 * Regex to validate the given GUID accept all the UUIDs version.
 */
const regexValidator = new RegExp('^[a-z0-9]{8}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{12}$', 'i');
/**
 * Convert the given number to a Hex format.
 * @param value The number to be converted
 */
function convertNumberToHex(value) {
    let hex = value <= 0xf ? '0' : '';
    hex += value.toString(exports.ARRAY_LENGTH);
    return hex;
}
/**
 * Convert the given {string} to a {Uint8Array} value.
 * @param value String value of the Guid.
 */
function stringToUint8Array(value) {
    // Strip any separators and un-wanted chars.
    const regExp = new RegExp('[{}()-]', 'g');
    const guid = value.replace(regExp, '');
    const bytes = [];
    for (let i = 0; i < exports.ARRAY_LENGTH; i++) {
        const pos = BYTE_ORDER[i];
        const b1 = guid.charAt(pos * 2);
        const b2 = guid.charAt(pos * 2 + 1);
        const charAt = unescape(`%${b1}${b2}`).charCodeAt(0);
        bytes.push(charAt);
    }
    return new Uint8Array(bytes);
}
exports.stringToUint8Array = stringToUint8Array;
/**
 * Convert the given {Uint8Array} to a {string} value.
 *
 * @param value Byte Array value of the Guid.
 */
function uint8ArrayToString(value) {
    let guid = '';
    for (let i = 0; i < exports.ARRAY_LENGTH; i++) {
        // Decide if we need to add the Hyphen {-} in the Guid.
        guid += i === 4 || i === 6 || i === 8 || i === 10 ? '-' : '';
        const pos = BYTE_ORDER[i];
        guid += convertNumberToHex(value[pos]);
    }
    return guid;
}
exports.uint8ArrayToString = uint8ArrayToString;
/**
 * Validate that the given value is a valid GUID.
 * @param guid The value to be validated.
 */
function isStringValidGuid(guid) {
    if (!guid) {
        return false;
    }
    return regexValidator.test(guid);
}
exports.isStringValidGuid = isStringValidGuid;
/**
 * Validate that the given value is a valid GUID.
 * @param guid The value to be validated.
 */
function isUint8ArrayValidGuid(guid) {
    const strGuid = uint8ArrayToString(guid);
    return guid && regexValidator.test(strGuid);
}
exports.isUint8ArrayValidGuid = isUint8ArrayValidGuid;
/**
 * Generate a random v4 GUID.
 */
function GenerateGuidV4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (char) {
        const random = (Math.random() * 16) | 0;
        const v = char === 'x' ? random : (random & 0x3) | 0x8;
        return v.toString(16);
    });
}
exports.GenerateGuidV4 = GenerateGuidV4;
