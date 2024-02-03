import axios from "axios";

export const API_BASE_URL = "https://e-commerce-pzp8.onrender.com";

export const getApi = () => {
  return axios.create({
    baseURL: API_BASE_URL,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      "Content-Type": "application/json",
    },
  });
};
