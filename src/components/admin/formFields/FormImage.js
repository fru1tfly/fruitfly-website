import { useUploadFile } from "hooks/files/useUploadFile";
import { useDeleteFile } from "hooks/files/useDeleteFile";
import { useContext, useState } from "react";
import Spinner from "../Spinner";
import { FormContext } from "stores/FormContext";

const FormImage = ({ label, field }) => {

    const form = useContext(FormContext);

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
            form.setValues((prev) => ({...prev, [field.key]: imageUrl}));
            setIsBroken(false);
        });
    };

    const deleteImage = async (e) => {
        const filename = form.values[field.key].split('/').pop();
        deleteFile(field.destination + '/' + filename).then(res => 
            form.setValues((prev) => ({...prev, [field.key]: null}))
        );
    }

    const imageDisplayed = form.values[field.key] && !isBroken;

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
                                src={form.values[field.key]} 
                                alt={label} 
                                onLoad={() => setIsLoading(false)}
                                onError={() => {
                                    setIsBroken(true); 
                                    setImageIcon("fa-link-slash"); 
                                }} 
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
};

export default FormImage;