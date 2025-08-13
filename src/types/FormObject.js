export default class FormObject {
    display;
    mapping;
    validations;

    constructor(display, mapping, validations) {
        this.display = display;
        this.mapping = mapping;
        this.validations = validations;
    }
}