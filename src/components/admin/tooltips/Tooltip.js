import { useLayoutEffect, useRef, useState } from "react";


const Tooltip = ({tooltipType, tooltipText, updatePosition, positionRefs}) => {
    const [position, setPosition] = useState({ top: 0, left: 0 });
    const tooltip = useRef();

    useLayoutEffect(() => {
        updatePosition(tooltip, setPosition);

        window.addEventListener('resize', updatePosition);
        window.addEventListener('scroll', updatePosition, true);

        return () => {
            window.removeEventListener('resize', updatePosition);
            window.removeEventListener('scroll', updatePosition, true);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [tooltipText, ...positionRefs])

    return (
        <div 
            className={`tooltip-container ${tooltipType}-tooltip-container`} 
            ref={tooltip} 
            style={{
                top: position.top,
                left: position.left
            }}
        >
            <div className="tooltip-header">
                {tooltipType.toUpperCase().charAt(0) + tooltipType.slice(1)}
            </div>
            <div className="tooltip-body">
                {tooltipText}
            </div>
        </div>
    );
};

export default Tooltip;