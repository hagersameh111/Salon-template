import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/api", // after install and run the backend, change this to the actual backend URL
});

export default api;