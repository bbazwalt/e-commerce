import axios from "axios";

export const API_BASE_URL = "https://e-commerce-pzp8.onrender.com";

export const AUTH_API_BASE_URL = API_BASE_URL + "/auth";

export const API_BASE_URL_V1 = API_BASE_URL + "/api/v1";

axios.defaults.baseURL = API_BASE_URL_V1;
