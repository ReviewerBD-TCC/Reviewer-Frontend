import axios from "axios";

export const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    "Access-Control-Allow-Origin": "true",
    "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Requested-With",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  };

export const baseURL = "http://10.234.84.188:8057/"

const api = axios.create({ baseURL, headers: headers })
export default api