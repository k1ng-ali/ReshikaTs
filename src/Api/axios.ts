import axios from "axios";
import Cookies from "js-cookie";

const url2 = "https://801db791-e5ec-466d-9780-bf4fd5521d93-00-18vfa7yeo31sn.sisko.replit.dev/api"

export const api = axios.create({
    baseURL: url2,
    withCredentials: true,
})

api.interceptors.request.use((config) => {
    const token = Cookies.get('csrftoken');
    if (token && config.method !== 'get') {
        config.headers['X-CSRFToken'] = token;
    }
    return config;
});
