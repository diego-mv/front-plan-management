import axios from "axios";
import { getTokenLocalStorage } from "../services";


axios.interceptors.request.use(
    request => {
        const tokenInfo = getTokenLocalStorage();

        if (tokenInfo && tokenInfo.token) {
            request.headers['Authorization'] = 'Bearer ' + tokenInfo.token;
        }

        return request;
    }
)

export default axios;