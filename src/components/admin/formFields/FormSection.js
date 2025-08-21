import ChildItems from "./ChildItems";

const FormSection = ({ label, field }) => {
    return (
        <div className="form-section">
            <div className="form-section-header">{label}</div>
            <div className="form-section-body">
                <ChildItems 
                    items={field.children}
                    className="form-section-item"
                />
            </div>
        </div>
    );
}

export default FormSection;