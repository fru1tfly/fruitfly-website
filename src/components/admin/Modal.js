import { ModalContext } from "stores/ModalContext";
import { closeModal } from "utils/modal";

const Modal = ({ title, className, closing, setClosing, closeFunc, children }) => {

    const modalContext = {
        isClosing: closing,
        setClosing: setClosing
    };

    return (
        <ModalContext.Provider value={modalContext}>
            <div className={`modal-background ${closing ? 'modal-background-closing' : ''}`}>
                <div className={`modal-container ${className} ${closing ? 'modal-container-closing' : ''} full-center`}>
                    <div className="modal-header">
                        <div className="modal-title">
                            {title}
                        </div>
                        <div className="modal-close-btn" onClick={() => closeModal(setClosing, closeFunc)}>
                            <i className="fa-solid fa-xmark"></i>
                        </div>
                    </div>
                    {children}
                </div>
            </div>
        </ModalContext.Provider>
    );
};

export default Modal;