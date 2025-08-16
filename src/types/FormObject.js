export default class FormObject {
    display;
    mapping;
    validations;
    hasId;

    constructor(display, mapping, validations, hasId = true) {
        this.display = display;
        this.mapping = mapping;
        this.validations = validations;
        this.hasId = hasId;
    }
}