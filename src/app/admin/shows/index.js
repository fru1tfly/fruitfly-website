import { useGet } from "hooks/useGet";

import { buildValidationObject } from "utils/validation";

import ItemListPage from "components/admin/ItemListPage";
import { showMapping, showCard } from "./model";
import { showValidations } from "./validation";
import FormObject from "types/FormObject";

import { ItemsContext, ItemsUpdateContext } from "stores/ItemsContext";


const AdminShows = () => {
    const endpoint = "/shows";
    const [shows, error] = useGet(endpoint);

    const itemsContext = {
        title: "Shows",
        itemName: "Show",
        endpoint: endpoint,
        itemDefinition: new FormObject(showCard, showMapping, showValidations),
        items:shows
    }

    return (
        <ItemsContext.Provider value={itemsContext}>
            <ItemListPage />
        </ItemsContext.Provider>
    );
};

export default AdminShows;