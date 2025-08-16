import { useContext } from "react";

import Modal from "components/Modal";
import Form from "components/admin/Form";

import { ItemsContext } from "stores/ItemsContext";

const ItemEditForm = ({ item, closeFunc, childDefinition, action, refresh }) => {
    const data = useContext(ItemsContext);

    const footer = () => (
        <div className="item-modal-btn-row">
            <button className="item-list-page-button item-edit-modal-action-btn form-negative-btn" onClick={closeFunc}>Cancel</button>
            <input type="submit" className="item-list-page-button item-edit-modal-action-btn form-positive-btn" value="Save"/>
        </div>
    );

    const callback = (response) => {
        closeFunc();
        refresh();
    }

    return (
        <Modal title={childDefinition ? '' : `${action} ${data.itemName}`} className="item-edit-modal" closeFunc={closeFunc}>
            <Form 
                endpoint={`${data.endpoint}/${action.toLowerCase()}`}
                disableAuto={true}
                values={item}
                definition={childDefinition ? childDefinition : data.itemDefinition}
                footer={footer}
                callback={callback}
            />
        </Modal>
    );
};

export default ItemEditForm;