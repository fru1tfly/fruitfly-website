export class FormValueType {
    static #_TEXT = 'text';
    static #_PASSWORD = 'password';
    static #_URL = 'url';
    static #_LOOKUP = 'lookup';
    static #_DATE = 'date';
    static #_TIME = 'time';
    static #_NUMBER = 'number';
    static #_IMAGE = 'image';
    static #_MULTISELECT = 'multiselect';
    static #_HEADER = 'header';
    static #_COLUMNS = 'columns';

    static get TEXT() { return this.#_TEXT; }
    static get PASSWORD() { return this.#_PASSWORD; }
    static get URL() { return this.#_URL; }
    static get LOOKUP() { return this.#_LOOKUP; }
    static get DATE() { return this.#_DATE; }
    static get TIME() { return this.#_TIME; }
    static get NUMBER() { return this.#_NUMBER; }
    static get IMAGE() { return this.#_IMAGE; }
    static get MULTISELECT() { return this.#_MULTISELECT; }
    static get HEADER() { return this.#_HEADER; }
    static get COLUMNS() { return this.#_COLUMNS; }
}