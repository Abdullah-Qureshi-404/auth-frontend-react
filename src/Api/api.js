import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "/api";

const API = axios.create({
  baseURL: API_BASE_URL,
});

if (import.meta.env.DEV) {
  console.log("API base URL:", API_BASE_URL);
}

export default API;
