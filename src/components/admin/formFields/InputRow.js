import { useState, memo, useRef, useContext } from 'react';
import { createPortal } from 'react-dom';

import { FormValueType } from 'types/FormValueType';
import { TYPING_DELAY } from 'stores/uiConstants';
import { FormContext } from 'stores/FormContext';
import { ModalContext } from 'stores/ModalContext';

import { validateField } from 'utils/validation';
import { extractErrorMessage } from 'utils/formData';

import FieldLabel from './FieldLabel';
import ErrorTooltip from '../tooltips/ErrorTooltip';

const InputRow = memo(({ field, label, className }) => {

    const form = useContext(FormContext);
    const modal = useContext(ModalContext);

    const [closing, setIsClosing] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const errorMessage = extractErrorMessage(form.errors[field.key]);

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
            const realTimeErrors = validateField("realTime", field.key, {...form.values, [id]: value}, form.definition.validations);
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
            <FieldLabel field={field} label={label} />
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
                    {(errorMessage || closing) && !isPassword &&
                        <i ref={iconRef} 
                            className={`fa-solid fa-triangle-exclamation input-alert ${closing ? 'input-alert-exit' : 'input-alert-enter'}`}
                        >
                        </i>
                    }
                </div>
                
                {errorMessage && !modal.isClosing && 
                    createPortal(
                        <ErrorTooltip 
                            text={errorMessage} 
                            row={inputRef}
                        />, 
                        document.body
                    )
                }
            </section>
        </div>
    );
});

export default InputRow;