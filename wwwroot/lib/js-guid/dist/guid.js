"use strict";
/* eslint-disable no-bitwise */
/* eslint-disable no-plusplus */
Object.defineProperty(exports, "__esModule", { value: true });
exports.Guid = void 0;
const guid_constants_1 = require("./guid.constants");
const guid_helpers_1 = require("./guid.helpers");
class Guid {
    /**
     * Empty string Guid value: '00000000-0000-0000-0000-000000000000'.
     */
    static EMPTY = '00000000-0000-0000-0000-000000000000';
    /**
     * Holds a Uint8Array of 16 elements containing the GUID values.
     */
    BytesGuid = new Uint8Array(16);
    /**
     * Holds the string value of the GUID.
     */
    StringGuid = '';
    /**
     * Create a new instance of the Guid with the given value,
     * or generate a new Guid if no value was given.
     * @param value The target value if already exists, leave it empty for a new value.
     */
    constructor(value) {
        this.BytesGuid = new Uint8Array(16);
        this.StringGuid = '';
        if (!value) {
            this.StringGuid = (0, guid_helpers_1.GenerateGuidV4)();
            this.BytesGuid = (0, guid_helpers_1.stringToUint8Array)(this.StringGuid);
            return;
        }
        if (typeof value === 'string') {
            if (!Guid.isValid(value)) {
                throw new Error(guid_constants_1.INVALID_GUID);
            }
            this.StringGuid = value;
            this.BytesGuid = (0, guid_helpers_1.stringToUint8Array)(this.StringGuid);
            return;
        }
        if (typeof value === 'object' && value instanceof Uint8Array) {
            if (!Guid.isValid(value)) {
                throw new Error(guid_constants_1.INVALID_GUID);
            }
            this.BytesGuid = value;
            this.StringGuid = (0, guid_helpers_1.uint8ArrayToString)(value);
            return;
        }
        throw new Error(guid_constants_1.UNSUPPORTED_TYPE);
    }
    toString() {
        return this.StringGuid;
    }
    toByteArray() {
        return this.BytesGuid;
    }
    equals(value) {
        if (!value) {
            throw new Error(guid_constants_1.VALUE_REQUIRED);
        }
        if (typeof value === 'string') {
            if (!(0, guid_helpers_1.isStringValidGuid)(value)) {
                throw new Error(guid_constants_1.INVALID_GUID);
            }
            return this.StringGuid === value;
        }
        if (typeof value !== 'object') {
            throw new Error(guid_constants_1.UNSUPPORTED_TYPE);
        }
        if (value instanceof Uint8Array) {
            if (!(0, guid_helpers_1.isUint8ArrayValidGuid)(value)) {
                throw new Error(guid_constants_1.INVALID_GUID);
            }
            return this.StringGuid === (0, guid_helpers_1.uint8ArrayToString)(value);
        }
        if (value instanceof Guid) {
            return this.StringGuid === value.toString();
        }
        return true;
    }
    isEmpty() {
        return this.StringGuid === Guid.EMPTY;
    }
    /**
     * Parse the given value into the opposite type.
     * Example : if value is string the function return a {Uint8Array of 16 elements},
     * otherwise it return a {string} if the value is a Uint8Array.
     */
    static parse(value) {
        if (!Guid.isValid(value)) {
            throw new Error(guid_constants_1.INVALID_GUID);
        }
        if (typeof value === 'object' && value instanceof Uint8Array) {
            return (0, guid_helpers_1.uint8ArrayToString)(value);
        }
        // At this point we're sure that the value is string.
        return (0, guid_helpers_1.stringToUint8Array)(value);
    }
    /**
     * Generate a new v4 Guid and return a new instance of the Guid.
     */
    static newGuid() {
        return new Guid((0, guid_helpers_1.GenerateGuidV4)());
    }
    /**
     *  Checks if the given value is a valid GUID.
     * @param value The given guid that need to be validated.
     */
    static isValid(value) {
        if (!value) {
            throw new Error(guid_constants_1.VALUE_REQUIRED);
        }
        if (typeof value === 'string') {
            return (0, guid_helpers_1.isStringValidGuid)(value);
        }
        if (typeof value === 'object' && value instanceof Uint8Array) {
            if (value.length !== guid_helpers_1.ARRAY_LENGTH) {
                throw new Error(guid_constants_1.INVALID_GUID);
            }
            return (0, guid_helpers_1.isUint8ArrayValidGuid)(value);
        }
        throw new Error(guid_constants_1.UNSUPPORTED_TYPE);
    }
}
exports.Guid = Guid;
