import { useState } from "react";

import { useForm } from "hooks/useForm";
import { useFormSubmit } from "hooks/useFormSubmit";
import { FormValueType } from "types/FormValueType";

import InputRow from "./InputRow";
import Spinner from "components/Spinner";
import { buildValidationObject } from "utils/validation";
import { useUploadFile } from "hooks/files/useUploadFile";
import { MIN_IMG_HEIGHT, MIN_IMG_WIDTH } from "stores/uiConstants";
import { useDeleteFile } from "hooks/files/useDeleteFile";

const inputRowTypes = [
    FormValueType.TEXT,
    FormValueType.PASSWORD,
    FormValueType.URL,
    FormValueType.DATE,
    FormValueType.TIME,
    FormValueType.NUMBER
];

const ChildItems = ({ field, definition, formState, formErrors }) => {
    return Object.keys(field.children).map(key => {
        const fieldData = {
            ...field.children[key],
            key: key
        }

        return <FormItem 
            definition={definition}
            field={fieldData} 
            formState={formState} 
            formErrors={formErrors}
            className={field.childClass}
        />;
    });
}

const FormSection = ({ label, field, definition, formState, formErrors}) => {
    return (
        <div className="form-section">
            <div className="form-section-header">{label}</div>
            <div className="form-section-body">
                <ChildItems 
                    field={field}
                    definition={definition}
                    formState={formState}
                    formErrors={formErrors}
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
                            <>
                                <img 
                                    className="form-image"
                                    src={formState.value[field.key]} 
                                    alt={label} 
                                    onLoad={
                                        () => {
                                            setIsLoading(false);
                                        }
                                    }
                                    onError={
                                        () => {
                                            setIsBroken(true); 
                                            setImageIcon("fa-link-slash"); 
                                        }
                                    } 
                                />
                            </>
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

const FormItem = ({ field, definition, formState, formErrors, className }) => {
    const label = field.label ?? field.key.charAt(0).toUpperCase() + field.key.slice(1);

    if (inputRowTypes.includes(field.type)) {
        return <InputRow 
            inputType={field.type} 
            inputName={field.key} 
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
            case FormValueType.IMAGE:
                return (
                    <div className="form-two-columns">
                        <div className="form-column">
                            <FormImage 
                                label={label}
                                field={field}
                                formState={formState}
                                formErrors={formErrors}
                            />
                        </div>
                        <div className="form-column">
                            <ChildItems 
                                field={field}
                                definition={definition}
                                formState={formState}
                                formErrors={formErrors}
                            />
                        </div>
                    </div>
                );
            default:
                return <></>;
        }
    }
};

const Form = ({ values, definition, endpoint, header, footer }) => {
    const { data, errors } = useForm(
        definition.mapping ? buildValidationObject(definition.mapping) : null,
        values
    );

    const { submit, isLoading, serverError } = useFormSubmit(
        data, 
        errors, 
        definition.validations, 
        endpoint
    );

    return (
        <Spinner visible={isLoading}>
            {header && header(serverError)}
            <form onSubmit={submit} action={null}>
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
                {footer && footer()}
            </form>
        </Spinner>
    );
};

export default Form;