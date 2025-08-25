import { useState, useRef, useContext } from "react";
import { createPortal } from "react-dom";
import InfoTooltip from "../tooltips/InfoTooltip";
import { ModalContext } from "stores/ModalContext";

const FieldLabel = ({ field, label }) => {
    const [showTooltip, setShowTooltip] = useState(false);
    const modal = useContext(ModalContext);

    const iconRef = useRef(null);
    return (
        <>
            {label && 
                <label htmlFor={field.key}>
                    <span>{label}</span>
                    {field.info && 
                        <i 
                            ref={iconRef}
                            className="fa-solid fa-info-circle info-tooltip-icon"
                            onClick={() => setShowTooltip(!showTooltip)}
                        >
                        </i>
                    }
                </label>
            }
            {showTooltip && !modal.isClosing &&
                createPortal(
                    <InfoTooltip 
                        message={field.info}
                        icon={iconRef}
                    />,
                    document.body
                )
            }
        </>
    );
};

export default FieldLabel;