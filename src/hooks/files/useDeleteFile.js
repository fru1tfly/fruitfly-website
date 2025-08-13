import { useState } from 'react';
import axios from 'stores/axios';
import { getAuthToken } from 'utils';

export function useDeleteFile() {
    const [isDeleting, setIsDeleting] = useState(false);

    const deleteFile = (filePath) => {
        setIsDeleting(true);

        return axios.post(
            `${process.env.REACT_APP_API_ENDPOINT}/files/delete/${encodeURIComponent(filePath)}`, 
            {},
            { headers: { token: getAuthToken() } }
        ).then((response) => {
            setIsDeleting(false);
        });
    };

    return { isDeleting, deleteFile };
}