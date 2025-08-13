import { FormValueType } from "types/FormValueType";

export const requireField = (label, field) => {
    return !field && `${label} is required`;
}

export const emailFormat = (value) => {
    return !/[A-Za-z0-9]+@[A-Za-z0-9]+\.[A-Za-z0-9]+$/.test(value) && "Please enter a valid email address"
}

export const validateField = (context, fieldName, formData, validations) => {
    const field = validations[fieldName];
    if (field) {
        let rules = field[context];
        return rules.map(rule => rule(formData)).filter(Boolean);
    }

    return [];
};

export const validateForm = (context, formData, validations) => {
    let errors = {};

    for(let field of Object.keys(formData)) {
        errors[field] = validateField(context, field, formData, validations);
    } 

    return errors;
}

const excludedTypes = [
    FormValueType.HEADER
];

export const buildValidationObject = (fieldMapping) => {
    let result = {};
    for(const key of Object.keys(fieldMapping)) {
        if(!excludedTypes.includes(fieldMapping[key].type)) {
            result[key] = '';
        }
    }
    console.log(result);
    return result;
}
