import { useState, memo, useRef, useEffect, useContext } from 'react';

import { validateField } from 'utils/validation';
import { signUpValidations } from 'app/admin/login/validation';
import { TYPING_DELAY } from 'stores/uiConstants';
import ErrorTooltip from '../ErrorTooltip';
import { FormValueType } from 'types/FormValueType';
import { createPortal } from 'react-dom';
import { FormContext } from 'stores/FormContext';

const InputRow = memo(({ field, label, className }) => {

    const form = useContext(FormContext);

    const [closing, setIsClosing] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const errorData = form.errors[field.key];
    const hasError = errorData?.length > 0;
    const errorMessage = hasError ? errorData[0] : ''; 

    const isPassword = field.type === FormValueType.PASSWORD;
    const passwordIconClassName = `fa-solid fa-eye${showPassword ? '-slash' : ''} show-password`;

    const iconRef = useRef();
    const inputRef = useRef();

    const typingTimeout = useRef();
    const handleValueChange = (e) => {
        const { value, id } = e.target;
        form.setValues((prev) => ({ ...prev, [id]: value })); 

        clearTimeout(typingTimeout.current);
        typingTimeout.current = setTimeout(() => {
            const realTimeErrors = validateField("realTime", field.key, {...form.values, [id]: value}, signUpValidations);
            form.setErrors((prev) => ({...prev, [id]: realTimeErrors.length > 0 ? realTimeErrors : [] }));
            setIsClosing(realTimeErrors.length === 0 && errorMessage);
        }, TYPING_DELAY);
    }

    const getFormattedValue = (value) => {
        if (field.type === FormValueType.DATE) {
            return value?.slice(0, 10);
        }
        return value;
    }

    return (
        <div className={className}>
            {label && <label htmlFor={field.key}>{label}</label>}
            <section className="login-input-row" ref={inputRef}>
                <div className="login-input-container">
                    <input 
                        type={(isPassword && showPassword) ? FormValueType.TEXT : field.type}
                        id={field.key}
                        className={`login-input ${errorMessage && 'login-input-error'}`}
                        value={getFormattedValue(form.values[field.key]) ?? field.placeholder}
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
                {(errorMessage || closing) && <i ref={iconRef} className={`fa-solid fa-triangle-exclamation input-alert ${closing ? 'input-alert-exit' : 'input-alert-enter'}`}></i>}
                {errorMessage && createPortal(<ErrorTooltip 
                    text={errorMessage} 
                    icon={iconRef} 
                    row={inputRef}
                />, document.body)}
            </section>
        </div>
    );
});

export default InputRow;