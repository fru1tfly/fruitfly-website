import { useGet } from "hooks/useGet";

import ItemListPage from "components/admin/ItemListPage";
import { showMapping, showCard } from "./model";
import { showValidations } from "./validation";
import FormObject from "types/FormObject";

import { ItemsContext } from "stores/ItemsContext";


const AdminShows = () => {
    const endpoint = "/shows";
    const { result, error, loading, refresh } = useGet(endpoint);

    const itemsContext = {
        title: "Shows",
        itemName: "Show",
        nameField: "showName",
        endpoint: endpoint,
        itemDefinition: new FormObject(showCard, showMapping, showValidations),
        items: result
    }

    return (
        <ItemsContext.Provider value={itemsContext}>
            <ItemListPage 
                refresh={refresh}
            />
        </ItemsContext.Provider>
    );
};

export default AdminShows;