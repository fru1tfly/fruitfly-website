import { useLayoutEffect, useState, useRef } from "react";

const ErrorTooltip = ({ text, icon, row}) => {
    const [position, setPosition] = useState({ top: 0, right: 0});
    const tooltip = useRef();

    useLayoutEffect(() => {
        let newPosition = {...position};

        const updatePosition = () => {
            const iconRect = icon.current.getBoundingClientRect();
            const rowRect = row.current.getBoundingClientRect();

            newPosition = {
                top: iconRect.top - 80,
                right: iconRect.right - rowRect.width - 10
            };
            setPosition(newPosition);
        }
        
        updatePosition();

        window.addEventListener('resize', updatePosition);
        window.addEventListener('scroll', updatePosition, true);

        return () => {
            window.removeEventListener('resize', updatePosition);
            window.removeEventListener('scroll', updatePosition, true);
        }
    }, [icon, row]);

    return (
        <div className="error-tooltip-container" ref={tooltip} style={{ 
            top: position.top, 
            right: position.right
        }}>
            <div className="error-tooltip-header">
                Error
            </div>
            <div className="error-tooltip-body">
                {text}
            </div>
        </div>
    );
};

export default ErrorTooltip;