
const ItemCardPill = ({ value, label, required = true }) => {
    const pillClass = `item-card-pill ${value ? '' : required ? 'item-card-pill-error' : 'item-card-pill-warning'}`;
    const iconClass = `fa-solid fa-circle-${value ? 'check' : required ? 'xmark' : 'question'}`;

    return (
        <div className={pillClass}>
            <i className={iconClass}></i>
            <span>{label}</span>
        </div>
    );
};

export default ItemCardPill;