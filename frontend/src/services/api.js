import axios from "axios";

const API = axios.create({
  baseURL:
  import.meta.env.VITE_API_URL || 
  "http://localhost:5000/api",
});
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  console.log("TOKEN:", token);

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

  // services/api.js

export const updateProfile = async (data) => {
  const token = localStorage.getItem("token");

  const response = await API.put(
    "/user/profile",
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

   return response.data;
 };



export default API;