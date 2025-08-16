import { useEffect, useState, useCallback } from 'react';
import axios from 'stores/axios';
import { getAuthToken } from 'utils';

export function useGet(endpoint) {
    const [result, setResult] = useState();
    const [error, setError] = useState();
    const [loading, setLoading] = useState(false);

     const fetchData = useCallback(async () => {
        setLoading(true);
        setError(undefined);
        try {
            const res = await axios.get(
                `${process.env.REACT_APP_API_ENDPOINT}${endpoint}`,
                { headers: { token: getAuthToken() }}
            );
            setResult(res.data);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    }, [endpoint]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);


    return { result, error, loading, refresh: fetchData };
}