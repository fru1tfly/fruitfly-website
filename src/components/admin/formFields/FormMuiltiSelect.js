import { useState } from "react";

import FormItem from "./FormItem";

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

export default FormMultiSelect;