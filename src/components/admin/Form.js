import { useForm } from "hooks/useForm";
import { useFormSubmit } from "hooks/useFormSubmit";
import Spinner from "components/admin/Spinner";
import { buildValidationObject } from "utils/validation";
import { getFormDataKeys, normalizeFormData } from "utils/formData";

import FormItem from "./formFields/FormItem";

const Form = ({ definition, endpoint, header, footer, disableAuto, callback, values }) => {
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

    console.log(definition);

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
                            field={fieldData} 
                            definition={definition}
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