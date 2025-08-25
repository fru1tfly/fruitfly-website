import Tooltip from "./Tooltip";

const InfoTooltip = ({ message, icon }) => {
    const updatePosition = (tooltip, setPosition) => {
        const iconRect = icon.current?.getBoundingClientRect();
        const tooltipRect = tooltip.current?.getBoundingClientRect();

        const newPosition = {
            top: iconRect?.top - 75,
            left: iconRect?.x - tooltipRect?.width / 2 + iconRect?.width / 4 + 1
        };

        if (setPosition) {
            setPosition(newPosition);
        }
    }

    return <Tooltip 
        tooltipType="info"
        tooltipText={message}
        updatePosition={updatePosition}
        positionRefs={[icon]}
    />;
};

export default InfoTooltip;