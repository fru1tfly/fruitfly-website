import { requireField } from "utils/validation";

export const venueValidations = {
    venueName: {
        onSubmit: [
            (data) => requireField('Name', data.venueName)
        ],
        realTime: []
    },
    address: {
        onSubmit: [
            (data) => requireField('Address', data.address)
        ],
        realTime: []
    }
}