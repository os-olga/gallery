import axios from "axios";

export const baseURL = `http://localhost:3000/`;

export const axiosInstance = axios.create({
  baseURL,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
  },
});
