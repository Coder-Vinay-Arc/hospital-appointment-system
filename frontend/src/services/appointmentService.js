import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";
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

