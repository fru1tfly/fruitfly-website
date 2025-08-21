import { useState } from "react";

const Modal = ({ title, className, closeFunc, children }) => {

    const [closing, setClosing] = useState(false);

    const closeModal = () => {
        setClosing(true);
        setTimeout(closeFunc, 300);
    }

    return (
        <>
            <div className={`modal-background ${closing ? 'modal-background-closing' : ''}`}>
                <div className={`modal-container ${className} ${closing ? 'modal-container-closing' : ''} full-center`}>
                    <div className="modal-header">
                        <div className="modal-title">
                            {title}
                        </div>
                        <div className="modal-close-btn" onClick={closeModal}>
                            <i className="fa-solid fa-xmark"></i>
                        </div>
                    </div>
                    {children}
                </div>
            </div>
        </>
    );
};

export default Modal;