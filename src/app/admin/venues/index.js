import { useGet } from "hooks/useGet";

import { buildValidationObject } from "utils/validation";

import ItemListPage from "components/admin/ItemListPage";
import { venueMapping, venueCard } from "./model";
import { venueValidations } from "./validation";
import FormObject from "types/FormObject";

import { ItemsContext, ItemsUpdateContext } from "stores/ItemsContext";


const AdminVenues = () => {
    const endpoint = "/venues";
    const {result, error, loading, refresh} = useGet(endpoint);

    const itemsContext = {
        title: "Venues",
        itemName: "Venue",
        nameField: "venueName",
        endpoint: endpoint,
        itemDefinition: new FormObject(venueCard, venueMapping, venueValidations),
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

export default AdminVenues;