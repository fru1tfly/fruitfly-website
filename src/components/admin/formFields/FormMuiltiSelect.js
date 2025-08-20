import { useContext, useState } from "react";

import FormItem from "./FormItem";
import { FormContext } from "stores/FormContext";

const FormMultiSelectRow = ({ field, removeRow }) => {
    return (
        <div className="form-multiselect-row">
            <FormItem field={field} className="form-multiselect-input" />
            <button className="form-negative-btn" onClick={(e) => {
                e.preventDefault();
                removeRow(field.key);
            }}>
                <i className="fa-solid fa-trash-can"></i>
            </button>
        </div>
    );
};

const FormMultiSelect = ({ label, field }) => {
    const form = useContext(FormContext);
    const [subState, setSubState] = useState(form.values[field.key]);

    const subDefinition = {};
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
        form.setValues((prev) => { return {...prev, [field.key]: newSubState}});
    }

    const removeRow = (key) => {
        const newSubState = [...subState];
        newSubState.splice(key, 1);
        setSubState(newSubState);
        form.setValues((prev) => { return {...prev, [field.key]: newSubState}});
    } 

    const childChange = (newState) => {
        const result = newState(subStateObject);
        setSubState(Object.values(result));
        form.setValues((prev) => { return {...prev, [field.key]: Object.values(result)}});
    }

    const formSubContext = {
        values: subStateObject,
        setValues: childChange,
        errors: form.errors,
        setErrors: form.setErrors
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
                <FormContext.Provider value={formSubContext}>
                    <FormMultiSelectRow 
                        field={subDefinition[key]}
                        removeRow={removeRow}
                    />
                </FormContext.Provider>
            ))}
        </div>
    );
};

export default FormMultiSelect;