import axios from "axios";
import { baseUrl } from './constantsEnv';

export const publicRequest = axios.create({
  baseURL: baseUrl,
});
