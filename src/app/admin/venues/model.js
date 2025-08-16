import ItemCardPill from "components/admin/itemCard/ItemCardPill";
import TimeBadge from "components/admin/itemCard/TimeBadge";

import { formatDate } from "utils/dates";
import { FormValueType } from "types/FormValueType";


export const venueMapping = {
    form: {
        type: FormValueType.COLUMNS,
        columns: [
            {
                defaultImgUrl: {
                    label: "Default Image",
                    type: FormValueType.IMAGE,
                    info: "Will display if a Show at this Venue has no flyer"
                }
            },
            {
                venueName: {
                    label: "Name",
                    type: FormValueType.TEXT,
                },
                address: {
                    type: FormValueType.TEXT,
                    info: "For DIY Venues that don't publicize their address, enter 'House'"
                },
                city: {
                    type: FormValueType.TEXT
                },
                ageRestriction: {
                    label: "Age Restriction",
                    type: FormValueType.TEXT,
                    placeholder: "All Ages"
                }
            }
        ]
    }
};

export const venueCard = (venue) => {
    return (
        <>
            <h4 className="item-card-title">
                <span className="item-card-title-text">{venue.venueName}</span>
                <span className="item-card-id">#{(venue.id + '').padStart(3, '0')}</span>
            </h4>
            <div className="item-card-pills">
                <ItemCardPill value={venue.ageRestriction} label="Age Restriction" required={false} />
                <ItemCardPill value={venue.defaultImgUrl} label="Default Image" required={false} />
            </div>
            {venue.address && <h5 className="item-card-subtitle">{venue.address} {venue.address === 'House' ? `(${venue.city})` : ''}</h5>}

        </>
    );
};
