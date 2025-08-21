import { FormValueType } from "types/FormValueType";

import FormMultiSelect from "./FormMuiltiSelect";
import FormLookup from "./FormLookup";
import FormImage from "./FormImage";
import InputRow from "./InputRow";
import FormSection from "./FormSection";
import ChildItems from "./ChildItems";

const inputRowTypes = [
    FormValueType.TEXT,
    FormValueType.PASSWORD,
    FormValueType.URL,
    FormValueType.DATE,
    FormValueType.TIME,
    FormValueType.NUMBER
];

const fieldRenderFunctions = {
    [FormValueType.HEADER]: ({ ...props }) => (
        <FormSection {...props} />
    ),
    [FormValueType.IMAGE]: ({ ...props }) => (
        <FormImage {...props} />
    ),
    [FormValueType.LOOKUP]: ({ ...props }) => (
        <FormLookup {...props} />
    ),
    [FormValueType.MULTISELECT]: ({ ...props }) => (
        <FormMultiSelect {...props} />
    ),
    [FormValueType.COLUMNS]: ({ field, ...props }) => (
        <div className="form-columns">
            {field.columns.map(column => (
                <div className="form-column">
                    <ChildItems items={column} {...props} />
                </div>
            ))}
        </div>
    ),
    __inputRow: ({ className, ...props }) => (
        <InputRow className={className} {...props} />
    )
};

const getLabel = (field) => {
    if (field.label === "nolabel") 
        return null;
    if (field.label) 
        return field.label;

    return field.key.charAt(0).toUpperCase() + field.key.slice(1);
}

const FormItem = ({ field, className }) => {
    const label = getLabel(field);
    const render = inputRowTypes.includes(field.type) 
        ? fieldRenderFunctions.__inputRow 
        : fieldRenderFunctions[field.type];
    
    return render({ label, field, className });
};

export default FormItem;