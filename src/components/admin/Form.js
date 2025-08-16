import { useState, useRef, memo, lazy } from "react";

import { useForm } from "hooks/useForm";
import { useFormSubmit } from "hooks/useFormSubmit";
import { FormValueType } from "types/FormValueType";

import InputRow from "./InputRow";
import Spinner from "components/Spinner";
import ItemEditForm from "./itemEditForm";
import { buildValidationObject } from "utils/validation";
import { useUploadFile } from "hooks/files/useUploadFile";
import { MIN_IMG_HEIGHT, MIN_IMG_WIDTH } from "stores/uiConstants";
import { TYPING_DELAY } from 'stores/uiConstants';
import { useDeleteFile } from "hooks/files/useDeleteFile";
import { useGet } from "hooks/useGet";
import { createPortal } from "react-dom";
import { getFormDataKeys, normalizeFormData } from "utils/formData";

const inputRowTypes = [
    FormValueType.TEXT,
    FormValueType.PASSWORD,
    FormValueType.URL,
    FormValueType.DATE,
    FormValueType.TIME,
    FormValueType.NUMBER
];

const ChildItems = ({ children, definition, formState, formErrors, className }) => {
    return Object.keys(children).map(key => {
        const fieldData = {
            ...children[key],
            key: key
        }

        return <FormItem 
            definition={definition}
            field={fieldData} 
            formState={formState} 
            formErrors={formErrors}
            className={className}
        />;
    });
}

const FormSection = ({ label, field, definition, formState, formErrors}) => {
    return (
        <div className="form-section">
            <div className="form-section-header">{label}</div>
            <div className="form-section-body">
                <ChildItems 
                    children={field.children}
                    definition={definition}
                    formState={formState}
                    formErrors={formErrors}
                    className="form-section-item"
                />
            </div>
        </div>
    );
}

const FormImage = ({ label, field, formState, formErrors }) => {

    const { isLoading, setIsLoading, uploadFile } = useUploadFile();
    const { isDeleting, deleteFile } = useDeleteFile();
    const [imageIcon, setImageIcon] = useState("fa-image");
    const [isBroken, setIsBroken] = useState(false);
    
    const getImageIcon = () => isBroken ? "fa-link-slash" : "fa-image";

    const processImage = async (e) => {
        const file = e.target.files[0];
        if(!file) return;

        uploadFile(file, field.destination).then(response => {
            const imageUrl = `${process.env.REACT_APP_DOMAIN}${response}`;
            formState.setter((prev) => ({...prev, [field.key]: imageUrl}));
            setIsBroken(false);
        });
    };

    const deleteImage = async (e) => {
        const filename = formState.value[field.key].split('/').pop();
        deleteFile(field.destination + '/' + filename).then(res => 
            formState.setter((prev) => ({...prev, [field.key]: null}))
        );
    }

    const imageDisplayed = formState.value[field.key] && !isBroken;

    return (
        <section className="form-image-container">
            <label htmlFor={field.key}>{label}</label>

            <label htmlFor="photo-input" className={`form-image-box ${imageDisplayed ? '' : 'clickable'}`}
                onMouseEnter={() => setImageIcon("fa-arrow-up-from-bracket")}
                onMouseLeave={() => setImageIcon(getImageIcon())}
            >
                <Spinner visible={isLoading || isDeleting}>
                    {
                        imageDisplayed ? (
                            <img 
                                className="form-image"
                                src={formState.value[field.key]} 
                                alt={label} 
                                onLoad={() => setIsLoading(false)}
                                onError={
                                    () => {
                                        setIsBroken(true); 
                                        setImageIcon("fa-link-slash"); 
                                    }
                                } 
                            />
                        ) : !(isLoading || isDeleting) ? (
                            <>
                                <div className="form-image-no-image full-center">
                                    <i className={`fa-solid ${imageIcon}`}></i>
                                </div>
                                <input id="photo-input" type="file" accept="image/*" onChange={processImage} />
                            </>
                        ) : null
                    }
                </Spinner>
                {imageDisplayed ? (
                    <div className="form-image-delete-btn" onClick={deleteImage}>
                        <i className="fa-solid fa-xmark"></i>
                    </div>
                ) : ''}
            </label>
            
        </section>
    );
}

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
        const { value, id } = e.target;
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
                    />,
                    document.body
                )
            }
        </div>
    );
});

const FormMultiSelectRow = ({ field, definition, state, errors, removeRow }) => {
    return (
        <div className="form-multiselect-row">
            <FormItem 
                field={field}
                definition={definition}
                formState={state} 
                formErrors={errors}
                className="form-multiselect-input"
            />
            <button className="form-negative-btn" onClick={(e) => {
                e.preventDefault();
                removeRow(field.key);
            }}>
                <i className="fa-solid fa-trash-can"></i>
            </button>
        </div>
    );
};

const FormMultiSelect = ({ label, field, definition, formState, formErrors }) => {
    const [subState, setSubState] = useState(formState.value[field.key]);

    let subDefinition = {};
    Object.keys(subState).forEach(key => {
        subDefinition[key] = {
            type: field.multiType,
            key: key,
            label: 'nolabel'
        }
    });

    const subStateObject = Object.assign({}, subState);

    const addRow = (e) => {
        e.preventDefault();
        const newSubState = [...subState, ''];
        setSubState(newSubState);
        formState.setter((prev) => { return {...prev, [field.key]: newSubState}});
    }

    const removeRow = (key) => {
        const newSubState = [...subState];
        newSubState.splice(key, 1);
        setSubState(newSubState);
        formState.setter((prev) => { return {...prev, [field.key]: newSubState}});
    } 

    const childChange = (newState) => {
        const result = newState(subStateObject);
        setSubState(Object.values(result));
        formState.setter((prev) => { return {...prev, [field.key]: Object.values(result)}});
    }

    return (
        <div className="form-multiselect">
            <label htmlFor={field.key} className="form-multiselect-header">
                <span>{label}</span>
                <button className="form-positive-btn" onClick={addRow}>
                    <i className="fa-solid fa-plus"></i>
                </button>
            </label>
            {Object.keys(subState).map(key => (
                <FormMultiSelectRow 
                    field={subDefinition[key]}
                    definition={subDefinition}
                    state={{
                        value: subStateObject,
                        setter: childChange
                    }} 
                    errors={formErrors}
                    removeRow={removeRow}
                />
            ))}
        </div>
    );
};

const FormItem = ({ field, definition, formState, formErrors, className }) => {
    const calculateLabel = () => {
        if (field.label && field.label === 'nolabel') return null;
        if (field.label) return field.label;
        return field.key.charAt(0).toUpperCase() + field.key.slice(1);
    }
    const label = calculateLabel();

    if (inputRowTypes.includes(field.type)) {
        return <InputRow 
            field={field}
            label={label} 
            formState={formState} 
            formErrors={formErrors}
            className={className}
        />;
    } else {
        switch (field.type) {
            case FormValueType.HEADER:
                return <FormSection 
                    label={label}
                    field={field}
                    definition={definition}
                    formState={formState}
                    formErrors={formErrors}
                />;
            case FormValueType.COLUMNS:
                return (
                    <div className="form-columns">
                        {field.columns.map(column => (
                            <div className="form-column">
                                <ChildItems 
                                    children={column}
                                    definition={definition}
                                    formState={formState}
                                    formErrors={formErrors}
                                />
                            </div>
                        ))}
                    </div>
                );
            case FormValueType.IMAGE:
                return (
                    <FormImage 
                        label={label} 
                        field={field}
                        formState={formState} 
                        formErrors={formErrors}
                    />
                );
            case FormValueType.LOOKUP:
                return (
                    <FormLookup
                        label={label}
                        field={field}
                        formState={formState}
                        formErrors={formErrors}
                    />
                )
            case FormValueType.MULTISELECT:
                return (
                    <FormMultiSelect 
                        label={label}
                        field={field}
                        definition={definition}
                        formState={formState}
                        formErrors={formErrors}
                    />
                )
            default:
                return <></>;
        }
    }
};

const Form = ({ values, definition, endpoint, header, footer, disableAuto, callback }) => {
    const { data, errors } = useForm(
        definition.mapping ? buildValidationObject(definition.mapping) : null,
        values
    );
    
    const formFields = getFormDataKeys(definition.mapping);
    let excludedValues = Object.keys(data.value).filter(value => !formFields.includes(value) && !(definition.hasId && value === 'id'));

    const { submit, isLoading, serverError } = useFormSubmit(
        normalizeFormData(data, definition.mapping), 
        errors, 
        definition.validations, 
        endpoint,
        callback,
        excludedValues
    );

    return (
        <Spinner visible={isLoading}>
            {header && header(serverError)}
            <form onSubmit={submit} action={null} onKeyDown={(e) => { disableAuto && e.key === 'Enter' && e.preventDefault(); }}>
                <div className="form-body">
                    {Object.keys(definition.mapping).map(key => {
                        const fieldData = {
                            ...definition.mapping[key],
                            key: key
                        }
                        return <FormItem 
                            definition={definition}
                            field={fieldData} 
                            formState={data} 
                            formErrors={errors} 
                        />; 
                    })}
                </div>
                {footer && footer()}
            </form>
        </Spinner>
    );
};

export default Form;