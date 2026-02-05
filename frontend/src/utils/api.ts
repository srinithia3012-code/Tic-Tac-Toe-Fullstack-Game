import axios from "axios";

export const API_BASE =
  process.env.REACT_APP_API_BASE ||
  (typeof import.meta !== "undefined"
    ? // @ts-ignore - Vite injects import.meta.env
      import.meta.env?.VITE_API_BASE
    : undefined) ||
  "http://localhost:4000";

export const api = axios.create({
  baseURL: API_BASE,
});

export const setAuthToken = (token: string | null) => {
  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common["Authorization"];
  }
};
