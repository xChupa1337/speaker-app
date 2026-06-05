import axios from "axios";
import { BACKEND_URL } from "@/config/env";

export const axiosInstance = axios.create({
  baseURL: BACKEND_URL,
  timeout: 60000,
  headers: {
    "Bypass-Tunnel-Reminder": "true"
  }
});
