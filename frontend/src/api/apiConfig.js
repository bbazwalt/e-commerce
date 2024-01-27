import axios from "axios";

export const API_BASE_URL = "https://ecommerce-server-railway-production.up.railway.app";

export const getApi = (jwt) => {
  return axios.create({
    baseURL: API_BASE_URL,
    headers: {
      Authorization: `Bearer ${jwt}`,
      "Content-Type": "application/json",
    },
  });
};
