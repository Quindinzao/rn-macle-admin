// External libraries
import axios from 'axios';

// Utils
import { isIOS } from '../utils/helpers/platform';

export const api = axios.create({
  baseURL: isIOS ? 'http://127.0.0.1:3000/api' : 'http://192.168.1.9:3000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});
