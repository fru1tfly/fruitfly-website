import { useContext } from "react";
import { ItemsContext } from "stores/ItemsContext";
import Modal from "components/admin/Modal";
import { useDeleteRecord } from "hooks/useDeleteRecord";

const ItemDeleteForm = ({ item, closeFunc, refresh }) => {
    const data = useContext(ItemsContext);
    const { isDeleting, deleteRecord } = useDeleteRecord(data.endpoint, item.id);

    const confirm = (e) => {
        deleteRecord().then(() => {
            closeFunc();
            refresh();
        })
    };

    return (
        <Modal className="item-delete-modal" closeFunc={closeFunc}>
            <div className="delete-modal-text">Are you sure you want to delete {item[data.nameField]}?</div>
            <div className="item-modal-btn-row center-row">
                <button className="form-positive-btn" onClick={confirm}>Yes</button>
            </div>
        </Modal>
    );
}

export default ItemDeleteForm;