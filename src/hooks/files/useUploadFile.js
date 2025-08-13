import { useState } from 'react';
import axios from 'stores/axios';
import { getAuthToken } from 'utils';

export function useUploadFile() {
    const [isLoading, setIsLoading] = useState(false);

    const uploadFile = (file, destination) => {
        setIsLoading(true);
        const form = new FormData();
        form.append('file', file);

        return axios.post(
            `${process.env.REACT_APP_API_ENDPOINT}/files/upload/${encodeURIComponent(destination)}`, 
            form,
            { headers: { token: getAuthToken() } }
        ).then((response) => {
            return response.data.file.replaceAll('\\', '/');
        });
    };

    return { isLoading, setIsLoading, uploadFile };
}