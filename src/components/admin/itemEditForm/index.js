import { useContext, useState } from "react";

import Modal from "components/admin/Modal";
import Form from "components/admin/Form";

import { closeModal } from "utils/modal";

import { ItemsContext } from "stores/ItemsContext";

const ItemEditForm = ({ item, closeFunc, action, refresh, childDefinition, childEndpoint }) => {
    const [closing, setClosing] = useState(false);
    const itemData = useContext(ItemsContext);

    const closeButton = (e) => {
        e.preventDefault();
        e.stopPropagation();

        closeModal(setClosing, closeFunc);
    }

    const footer = () => (
        <div className="item-modal-btn-row">
            <button className="item-list-page-button item-edit-modal-action-btn form-negative-btn" onClick={closeButton}>Cancel</button>
            <input type="submit" className="item-list-page-button item-edit-modal-action-btn form-positive-btn" value="Save"/>
        </div>
    );

    const callback = (response) => {
        closeFunc();
        refresh(response);
    }

    return (
        <Modal 
            title={childDefinition ? '' : `${action} ${itemData.itemName}`} 
            className="item-edit-modal" 
            closing={closing}
            setClosing={setClosing}
            closeFunc={closeFunc}
        >
            <Form 
                definition={childDefinition ?? itemData.itemDefinition}
                endpoint={`${childEndpoint ?? itemData.endpoint}/${action.toLowerCase()}`}
                footer={footer}
                disableAuto={true}
                callback={callback}
                values={item}
            />
        </Modal>
    );
};

export default ItemEditForm;