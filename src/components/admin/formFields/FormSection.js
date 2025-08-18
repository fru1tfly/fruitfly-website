import ChildItems from "./ChildItems";

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

export default FormSection;