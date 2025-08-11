import { useState, useContext } from "react";
import axios from 'stores/axios';

import { SPINNER_DEPLAY } from 'stores/uiConstants';
import { validateForm } from 'utils/validation';
import { getUserInfo } from 'utils';

import { UserUpdateContext } from 'stores/UserContext';

const SUBMIT_VALIDATION_NAME = "onSubmit";
export function useFormSubmit(data, errors, validations, endpoint, excludes = null) {
    const [isLoading, setIsLoading] = useState(false);
    const [serverError, setServerError] = useState();
    const setUserInfo = useContext(UserUpdateContext);

    const submit = (e) => {
        e.preventDefault();
        setServerError('');

        const submitErrors = validateForm(SUBMIT_VALIDATION_NAME, data.value, validations);
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
            console.log(payload);

            axios.post(
                `${process.env.REACT_APP_API_ENDPOINT}${endpoint}`, 
                payload
            ).then((res) => {
                clearTimeout(spinnerDisplay);
                setIsLoading(false);

                sessionStorage.setItem("jwt", res.data.token);
                setUserInfo(getUserInfo());
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