import { memo, useState, useRef } from "react";
import { createPortal } from "react-dom";

import { useGet } from "hooks/useGet";
import { TYPING_DELAY } from "stores/uiConstants";
import { FormValueType } from "types/FormValueType";
import ItemEditForm from "../itemEditForm";

const FormLookup = memo(({ label, field, formState, formErrors }) => {
    const [inputValue, setInputValue] = useState('');
    const [searchTerm, setSearchTerm] = useState(field.matchEndpoint + '/search/');
    const [typing, setTyping] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [creating, setCreating] = useState(false);

    const { result, error, loading, refresh } = useGet(searchTerm);

    const dropdownRef = useRef(null);

    const typingTimeout = useRef();
    const handleAutocomplete = (e) => {
        const { value } = e.target;
        setInputValue(value); 

        clearTimeout(typingTimeout.current);
        typingTimeout.current = setTimeout(() => {
            setSearchTerm(field.matchEndpoint + '/search/' + value);
        }, TYPING_DELAY);
    }

    const selectItem = (item) => {
        formState.setter((prev) => { 
            return {
                ...prev, 
                [field.lookupLabel]: item[field.lookupLabel],
                [field.key]: item.id
            }
        });
        setTyping(false);
    }

    return (
        <div>
            <label htmlFor={field.key}>{label}</label>
            <section className="login-input-row">
                <div className="login-input-container">
                    {(!formState.value[field.key] || typing) ? (
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
                                className={`login-input`}
                                value={inputValue}
                                onChange={handleAutocomplete}
                                autoComplete="false"
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
                                    {formState.value[field.lookupLabel]}
                                </div>
                                <i className="fa-solid fa-circle-xmark form-dropdown-icon" onClick={() => {
                                    setTyping(true);
                                    setDropdownOpen(false);
                                }}></i>
                            </>
                            {!formState.value[field.key] && <>&nbsp;</>}
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
        </div>
    );
});

export default FormLookup