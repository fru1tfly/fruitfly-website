import { useState } from "react";

const fillDefaults = (structure, defaults) => {
    if (!defaults) return structure;

    let populatedStructure = {...structure};
    for (const [key, value] of Object.entries(defaults)) {
        populatedStructure[key] = value;
    }

    return populatedStructure;
}

export function useForm(formValues, defaults) {

    const [formData, setFormData] = useState(fillDefaults(formValues, defaults));
    const [formErrors, setFormErrors] = useState(formValues);

    return {
        data: {
            value: formData,
            setter: setFormData
        },
        errors: {
            value: formErrors,
            setter: setFormErrors
        }
    };
}