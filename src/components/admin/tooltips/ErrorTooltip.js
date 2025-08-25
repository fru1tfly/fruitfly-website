import Tooltip from "./Tooltip";

const ErrorTooltip = ({ text, row }) => {
    const updatePosition = (tooltip, setPosition) => {
        const rowRect = row.current?.getBoundingClientRect();
        const tooltipRect = tooltip.current?.getBoundingClientRect();

        const newPosition = {
            top: rowRect?.top - 75,
            left: rowRect?.left + rowRect?.width - tooltipRect?.width + 10
        };

        if (setPosition) {
            setPosition(newPosition);
        }
    };

    return <Tooltip 
        tooltipType="error"
        tooltipText={text}
        updatePosition={updatePosition}
        positionRefs={[row]}
    />;
};

export default ErrorTooltip;