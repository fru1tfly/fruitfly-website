import { useState } from "react";

export function useForm(formValues) {
    const [formData, setFormData] = useState(formValues);
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