const ItemCard = ({ item, editFunc, deleteFunc, children }) => {
    return (
        <div className="item-card-container">
            {children}
            <div className="item-card-action-row">
                <button className="item-card-warning-btn" onClick={() => editFunc(item)}>Edit</button>
                <button className="item-card-error-btn" onClick={() => deleteFunc(item)}>Delete</button>
            </div>
        </div>
    );
};

export default ItemCard;