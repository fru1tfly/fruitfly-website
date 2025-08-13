import { useState, useContext } from "react";
import ItemCard from "./itemCard";
import ItemEditForm from "./itemEditForm";

import { ItemsContext } from "stores/ItemsContext";

const ItemListPage = () => {

    const data = useContext(ItemsContext);
    const [editing, setEditing] = useState();
    const [deleting, setDeleting] = useState();

    const editItem = (item) => {
        setEditing(item);
    }
    
    const deleteItem = (item) => {
        setDeleting(item);
    }

    return (
        <div className="item-list-page-container">
            {editing && 
                <ItemEditForm 
                    item={editing} 
                    closeFunc={() => setEditing(false)}
                />
            }
            <h1 className="item-list-page-title">
                <span className="item-list-page-title-text">{data.title}</span>
                <button className="item-list-page-create-btn item-card-success-btn">
                    <i className="fa-solid fa-plus"></i>
                    <span>Create {data.itemName}</span>
                </button>
            </h1>
            <div className="item-list-page-contents">
                {data.items && data.items.map(item => (
                    <ItemCard item={item} editFunc={editItem} deleteFunc={deleteItem}>
                        {data.itemDefinition.display(item)}
                    </ItemCard>
                ))}
            </div>
        </div>
    );
};

export default ItemListPage;