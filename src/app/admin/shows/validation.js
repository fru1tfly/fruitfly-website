import { requireField, multiselectNoBlanks } from "utils/validation";
import { showMapping } from "./model";
import { findInMapping } from "utils/formData";

export const showValidations = {
    venue_id: {
        onSubmit: [
            (data) => !data.venue_id && 'Valid Venue record required'
        ],
        realTime: []
    },
    date: {
        onSubmit: [
            (data) => requireField('Date', data.date)
        ],
        realTime: []
    },
    otherActs: {
        // stored as string joined by joinCharacter
        onSubmit: [
            (data) => {
                const joinCharacter = findInMapping('otherActs', showMapping).joinCharacter;
                return multiselectNoBlanks('Other Acts', data.otherActs, joinCharacter);
            }
        ],
        // stored as array
        realTime: []
    }
};