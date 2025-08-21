import { useState } from "react";
import axios from 'stores/axios';

import { SPINNER_DEPLAY } from 'stores/uiConstants';
import { validateForm } from 'utils/validation';
import { getAuthToken } from 'utils';

const SUBMIT_VALIDATION_NAME = "onSubmit";
export function useFormSubmit(data, errors, validations, endpoint, callback, excludes = null) {
    const [isLoading, setIsLoading] = useState(false);
    const [serverError, setServerError] = useState();

    const submit = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setServerError('');

        console.log(data.value, validations);

        const submitErrors = validateForm(SUBMIT_VALIDATION_NAME, data.value, validations);
        console.log(submitErrors);
        errors.setter(submitErrors);

        const fieldErrors = Object.values(submitErrors).filter(errs => errs.length > 0);
        const hasErrors = fieldErrors.length > 0;
        
        if (!hasErrors) {
            const spinnerDisplay = setTimeout(() => setIsLoading(true), SPINNER_DEPLAY);

            let payload = {};
            for(const key of Object.keys(data.value)) {
                if(!excludes?.includes(key)) {
                    payload[key] = data.value[key];
                }
            }

            axios.post(
                `${process.env.REACT_APP_API_ENDPOINT}${endpoint}`, 
                payload,
                { headers: { token: getAuthToken() }}
            ).then((res) => {
                clearTimeout(spinnerDisplay);
                setIsLoading(false);

                callback(res.data);
            }).catch((err) => {
                clearTimeout(spinnerDisplay);
                setIsLoading(false);

                if(err.response.data) {
                    const response = err.response.data;
                    setServerError(response.message);
                }
            });
        } else {
            console.log('don do it cuh');
        }
    }

    return { submit, isLoading, serverError };
}