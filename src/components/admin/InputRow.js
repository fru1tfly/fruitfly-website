import { useState, memo, useRef } from 'react';

import { validateField } from 'utils/validation';
import { signUpValidations } from 'app/admin/login/validation';
import { TYPING_DELAY } from 'stores/uiConstants';
import ErrorTooltip from './ErrorTooltip';

const PASSWORD_INPUT_TYPE = 'password';
const TEXT_INPUT_TYPE = 'text';

const InputRow = memo(({ inputType, inputName, label, formState, formErrors }) => {
    const [closing, setIsClosing] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const errorData = formErrors.value[inputName];
    const hasError = errorData.length > 0;
    const errorMessage = hasError ? errorData[0] : ''; 

    const isPassword = inputType === PASSWORD_INPUT_TYPE;
    const passwordIconClassName = `fa-solid fa-eye${showPassword ? '-slash' : ''} show-password`;

    const typingTimeout = useRef();
    const handleValueChange = (e) => {
        const { value, id } = e.target;
        formState.setter((prev) => ({ ...prev, [id]: value })); 

        clearTimeout(typingTimeout.current);
        typingTimeout.current = setTimeout(() => {
            const realTimeErrors = validateField("realTime", inputName, {...formState.value, [id]: value}, signUpValidations);
            formErrors.setter((prev) => ({...prev, [id]: realTimeErrors.length > 0 ? realTimeErrors : [] }));
            setIsClosing(realTimeErrors.length === 0 && errorMessage);
        }, TYPING_DELAY);
    }
    
    return (
        <>
            <label htmlFor={inputName}>{label}</label>
            <section className="login-input-row">
                <div className="login-input-container">
                    <input 
                        type={(isPassword && showPassword) ? TEXT_INPUT_TYPE : inputType}
                        id={inputName}
                        className={`login-input ${errorMessage && 'login-input-error'}`}
                        value={formState.value[inputName]}
                        onChange={handleValueChange}
                    />
                    {isPassword && 
                        <i 
                            className={passwordIconClassName}
                            onClick={() => setShowPassword(!showPassword)}
                        >
                        </i>
                    }
                </div>
                {(errorMessage || closing) && <i className={`fa-solid fa-triangle-exclamation input-alert ${closing ? 'input-alert-exit' : 'input-alert-enter'}`}></i>}
                {errorMessage && <ErrorTooltip text={errorMessage} />}
            </section>
        </>
    );
});

export default InputRow;