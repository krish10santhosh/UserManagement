import axios from "axios";

const axios_instance = axios.create({
});

axios_instance.interceptors.request.use((config, error) => {
    config.baseURL = "http://localhost:4000/api/";
    return config;
});

export default axios_instance;