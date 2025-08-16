import { useState } from 'react';
import axios from 'stores/axios';
import { getAuthToken } from 'utils';

export function useDeleteRecord(endpoint, id) {
    const [isDeleting, setIsDeleting] = useState(false);

    const deleteRecord = () => {
        setIsDeleting(true);

        return axios.delete(
            `${process.env.REACT_APP_API_ENDPOINT}${endpoint}/${id}`, 
            { headers: { token: getAuthToken() } }
        ).then((response) => {
            setIsDeleting(false);
        });
    };

    return { isDeleting, deleteRecord };
}