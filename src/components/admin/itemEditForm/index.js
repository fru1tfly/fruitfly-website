import { useContext } from "react";

import Modal from "components/admin/Modal";
import Form from "components/admin/Form";

import { ItemsContext } from "stores/ItemsContext";

const ItemEditForm = ({ item, closeFunc, action, refresh, childDefinition, childEndpoint }) => {
    const data = useContext(ItemsContext);

    const footer = () => (
        <div className="item-modal-btn-row">
            <button className="item-list-page-button item-edit-modal-action-btn form-negative-btn" onClick={closeFunc}>Cancel</button>
            <input type="submit" className="item-list-page-button item-edit-modal-action-btn form-positive-btn" value="Save"/>
        </div>
    );

    const callback = (response) => {
        closeFunc();
        refresh(response);
    }

    return (
        <Modal title={childDefinition ? '' : `${action} ${data.itemName}`} className="item-edit-modal" closeFunc={closeFunc}>
            <Form 
                definition={childDefinition ?? data.itemDefinition}
                endpoint={`${childEndpoint ?? data.endpoint}/${action.toLowerCase()}`}
                footer={footer}
                disableAuto={true}
                callback={callback}
                values={item}
            />
        </Modal>
    );
};

export default ItemEditForm;