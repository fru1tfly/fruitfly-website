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

    for(let field of Object.keys(validations)) {
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
    return result;
}

export const multiselectNoBlanks = (label, field, joinCharacter) => {
    const message = `${label} cannot include any blank rows`;
    const subErrors = Array(field.split(joinCharacter).length).fill('');

    let tempString = '';
    let slotPointer = 0;
    for(let i = 0; i < field.length; i++) {
        const char = field.charAt(i);
        if(char === joinCharacter) {
            if (tempString === '') {
                subErrors[slotPointer] = [message];
            }

            slotPointer++;
            tempString = '';

            if(i === field.length - 1) {
                subErrors[slotPointer] = [message];
            }
        } else {
            tempString += char;
        }
    }

    if(subErrors.filter(err => err !== '').length > 0) {
        return subErrors
    }
    return false;
}
