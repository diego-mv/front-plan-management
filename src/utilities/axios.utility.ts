import axios from 'axios';
import '../interceptors/jwt.interceptor';

axios.defaults.baseURL = 'http://localhost:3000';

export default axios;