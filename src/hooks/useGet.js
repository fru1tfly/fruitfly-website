import { useEffect, useState } from 'react';
import axios from 'stores/axios';

export function useGet(endpoint) {
    const [result, setResult] = useState();
    const [error, setError] = useState();

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_ENDPOINT}${endpoint}`).then(res => {
            console.log(res.data);
            setResult(res.data);
        }).catch(err => {
            setError(err);
        });
    }, []);

    return [result, error];
}