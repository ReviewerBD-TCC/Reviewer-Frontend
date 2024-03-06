import axios from "axios";

const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
};

const api = axios.create({
    baseURL:"http://10.234.84.188:8056/",
    headers: headers
})

export default api