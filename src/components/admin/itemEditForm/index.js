import { useContext } from "react";

import Modal from "components/Modal";
import Form from "components/admin/Form";

import { ItemsContext } from "stores/ItemsContext";

const ItemEditForm = ({ item, closeFunc }) => {
    const data = useContext(ItemsContext);

    return (
        <Modal title={`Edit ${data.itemName}`} className="item-edit-modal" closeFunc={closeFunc}>
            <Form 
                values={item}
                definition={data.itemDefinition}
            />
        </Modal>
    );
};

export default ItemEditForm;