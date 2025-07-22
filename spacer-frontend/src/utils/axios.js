// src/utils/axios.js
import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:5000", // ✅ Update this if your backend runs elsewhere
});

export default instance;
