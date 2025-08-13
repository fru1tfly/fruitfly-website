import { formatTime
    
 } from "utils/dates";
const TimeBadge = ({ category, value }) => {
    const iconMap = {
        'doorsTime' : 'fa-door-open',
        'showTime': 'fa-music',
        'setTime': 'fa-clock'
    };

    const iconClass = `fa-solid ${iconMap[category]}`;

    return (
        <>
            {value && 
                <div className="item-card-badge">
                    <i className={iconClass}></i>
                    <span>{formatTime(value)}</span>
                </div>
            }
        </>
    );
};

export default TimeBadge;