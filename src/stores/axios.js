import axios from 'axios';
import { getAuthToken } from 'utils';

const instance = axios.create({
    baseURL: process.env.REACT_APP_API_ENDPOINT
});

instance.defaults.headers.common['Authorization'] = getAuthToken();
instance.defaults.headers.post['Content-Type'] = 'application/json';

export default instance;