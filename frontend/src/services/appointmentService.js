import axios from "axios";

const getApiBaseUrl = () => {
  if (import.meta.env.VITE_API_BASE_URL) {
    return import.meta.env.VITE_API_BASE_URL;
  }
  const isLocal = typeof window !== "undefined" && (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1");
  return isLocal ? "http://localhost:8080" : "https://hospital-appointment-system-1-oxge.onrender.com";
};

const API_BASE_URL = getApiBaseUrl();
const API_URL = `${API_BASE_URL}/appointments`;

export const getAppointments = () => {
  return axios.get(API_URL);
};

export const addAppointment = (appointment) => {
  return axios.post(API_URL, appointment);
};

export const updateAppointment = (id, appointment) => {
  return axios.put(`${API_URL}/${id}`, appointment);
};

export const deleteAppointment = (id) => {
  return axios.delete(`${API_URL}/${id}`);
};

