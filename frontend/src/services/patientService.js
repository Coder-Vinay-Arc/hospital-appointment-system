import axios from "axios";

const getApiBaseUrl = () => {
  if (import.meta.env.VITE_API_BASE_URL) {
    return import.meta.env.VITE_API_BASE_URL;
  }
  const isLocal = typeof window !== "undefined" && (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1");
  return isLocal ? "http://localhost:8080" : "https://hospital-appointment-system-1-oxge.onrender.com";
};

const API_BASE_URL = getApiBaseUrl();
const API_URL = `${API_BASE_URL}/patients`;

export const getPatients = () => {
  return axios.get(API_URL);
};

export const addPatient = (patient) => {
  return axios.post(API_URL, patient);
};

export const updatePatient = (id, patient) => {
  return axios.put(`${API_URL}/${id}`, patient);
};

export const deletePatient = (id) => {
  return axios.delete(`${API_URL}/${id}`);
};