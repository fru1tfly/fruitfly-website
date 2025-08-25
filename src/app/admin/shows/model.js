import ItemCardPill from "components/admin/itemCard/ItemCardPill";
import TimeBadge from "components/admin/itemCard/TimeBadge";

import { formatDate } from "utils/dates";
import { FormValueType } from "types/FormValueType";
import FormObject from "types/FormObject";
import { venueCard, venueMapping } from "../venues/model";
import { venueValidations } from "../venues/validation";


export const showMapping = {
    showName: {
        label: "Name",
        type: FormValueType.TEXT,
        info: "Defaults to Venue name if left blank"
    },
    otherActs: {
        label: "Other Acts",
        type: FormValueType.MULTISELECT,
        multiType: FormValueType.TEXT,
        joinCharacter: ';'
    },
    centerSection: {
        type: FormValueType.COLUMNS,
        columns: [
            {
                imgUrl: {
                    type: FormValueType.IMAGE,
                    label: "Flyer",
                    destination: "/photos/showFlyers"
                }
            },
            {
                venue_id: {
                    label: "Venue",
                    type: FormValueType.LOOKUP,
                    matchEndpoint: "/venues",
                    lookupLabel: "venueName",
                    lookupDefinition: new FormObject(venueCard, venueMapping, venueValidations)
                },
                date: {
                    type: FormValueType.DATE
                },
                ticketUrl: {
                    label: "Ticket Link",
                    type: FormValueType.URL
                },
                price: {
                    type: FormValueType.TEXT
                }
            }
        ]
    },
    times: {
        type: FormValueType.HEADER,
        childClass: "form-section-item",
        children: {
            doorsTime: {
                label: "Doors",
                type: FormValueType.TIME,
            },
            showTime:  {
                label: "Music",
                type: FormValueType.TIME,
            },
            setTime: {
                label: "Set",
                type: FormValueType.TIME,
            }
        }
    }
};

export const showCard = (show) => {
    return (
        <>
            <h4 className="item-card-title">
                <span className="item-card-title-text">{show.showName ? show.showName : show.venueName}</span>
                <span className="item-card-id">#{(show.id + '').padStart(3, '0')}</span>
            </h4>
            {show.showName && <h5 className="item-card-subtitle">{show.venueName}</h5>}
            {show.otherActs && <div className="item-card-other-acts">w/{show.otherActs.join(', ')}</div>}
            <div className="item-card-pills">
                <ItemCardPill value={show.imgUrl} label="Flyer" />
                <ItemCardPill value={show.address} label="Address" />
                <ItemCardPill value={show.price} label="Price" />
                <ItemCardPill value={show.ticketUrl} label="Ticket URL" required={false} />
            </div>
            <div className="item-card-time-details">
                <TimeBadge category="doorsTime" value={show.doorsTime} />
                <TimeBadge category="showTime" value={show.showTime} />
                <TimeBadge category="setTime" value={show.setTime} />
                <span className="item-card-date">
                    {formatDate(show.date)}
                </span>
            </div>
        </>
    );
};
