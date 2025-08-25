import { memo, useState, useRef, useContext } from "react";
import { createPortal } from "react-dom";

import { useGet } from "hooks/useGet";
import { TYPING_DELAY } from "stores/uiConstants";
import { FormValueType } from "types/FormValueType";
import ItemEditForm from "../itemEditForm";
import { FormContext } from "stores/FormContext";
import { ModalContext } from "stores/ModalContext";
import { extractErrorMessage } from "utils/formData";
import ErrorTooltip from "../tooltips/ErrorTooltip";

const FormLookup = memo(({ label, field }) => {
    const form = useContext(FormContext);
    const modal = useContext(ModalContext);

    const [inputValue, setInputValue] = useState('');
    const [searchTerm, setSearchTerm] = useState(field.matchEndpoint);
    const [typing, setTyping] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [creating, setCreating] = useState(false);

    const { result, error, loading, refresh } = useGet(searchTerm);

    const errorMessage = extractErrorMessage(form.errors[field.key]);

    const inputRef = useRef(null);
    const dropdownRef = useRef(null);

    const typingTimeout = useRef();
    const handleAutocomplete = (e) => {
        const { value } = e.target;
        setInputValue(value); 

        clearTimeout(typingTimeout.current);
        typingTimeout.current = setTimeout(() => {
            setSearchTerm(field.matchEndpoint + '?' + field.lookupLabel + '=' + value);
        }, TYPING_DELAY);
    }

    const selectItem = (item) => {
        form.setValues((prev) => { 
            return {
                ...prev, 
                [field.lookupLabel]: item[field.lookupLabel],
                [field.key]: item.id
            }
        });
        setTyping(false);
        form.setErrors((prev) => ({...prev, [field.key]: []}))
    }

    const clearItem = () => {
        setTyping(true);
        setDropdownOpen(false);
        form.setValues((prev) => {
            return {
                ...prev,
                [field.lookupLabel]: '',
                [field.key]: ''
            }
        })
    }

    return (
        <div>
            <label htmlFor={field.key}>{label}</label>
            <section className="login-input-row">
                <div className="login-input-container">
                    {(!form.values[field.key] || typing) ? (
                        <div 
                            onFocus={() => setDropdownOpen(true)}
                            onBlur={(e) => {
                                // Keep open if the new focused element is still inside this scope
                                if (e.currentTarget.contains(e.relatedTarget)) return;
                                setDropdownOpen(false);
                            }}
                        >
                            <input 
                                type={FormValueType.TEXT}
                                id={field.key}
                                className={`login-input ${errorMessage && 'login-input-error'}`}
                                value={inputValue}
                                onChange={handleAutocomplete}
                                autoComplete="false"
                                ref={inputRef}
                            />
                            {dropdownOpen && 
                                <div className="form-dropdown" ref={dropdownRef}>
                                    <div className="form-dropdown-body">
                                        {result.map(item => (
                                            <div 
                                                className="form-dropdown-item"
                                                onClick={() => selectItem(item)}
                                                tabIndex="-1"
                                            >
                                                {item[field.lookupLabel]}
                                            </div>
                                        ))}
                                    </div>
                                    <div className="form-dropdown-footer" tabIndex="-1" onClick={() => setCreating(true)}>
                                        <i className="fa-solid fa-plus"></i>
                                        Add New {label}
                                    </div>
                                </div>
                            }
                        </div>
                    ) : (
                        <div className="login-input login-input-lookup">
                            <>
                                <div className="lookup-pill">
                                    {form.values[field.lookupLabel]}
                                </div>
                                <i className="fa-solid fa-circle-xmark form-dropdown-icon" onClick={clearItem}></i>
                            </>
                            {!form.values[field.key] && <>&nbsp;</>}
                        </div>
                    )}
                </div>
            </section>
            {creating && 
                createPortal(
                    <ItemEditForm 
                        item={{}}
                        closeFunc={() => setCreating(false)}
                        childDefinition={field.lookupDefinition}
                        childEndpoint={field.matchEndpoint}
                        action="create"
                        refresh={(response) => {
                            selectItem(response.item);
                            refresh();
                        }}
                    />,
                    document.body
                )
            }

            {errorMessage && !modal.isClosing && 
                createPortal(
                    <ErrorTooltip 
                        text={errorMessage} 
                        row={inputRef}
                    />, 
                    document.body
                )
            }
        </div>
    );
});

export default FormLookup