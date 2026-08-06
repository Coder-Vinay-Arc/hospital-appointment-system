import axios from "axios";

const API_URL = "http://localhost:8080/doctors";

export const getDoctors = () => {
  return axios.get(API_URL);
};

export const addDoctor = (doctor) => {
  return axios.post(API_URL, doctor);
};

export const deleteDoctor = (id) => {
    return axios.delete(`${API_URL}/${id}`);
};

export const updateDoctor = (id, doctor) => {
  return axios.put(`${API_URL}/${id}`, doctor);
};