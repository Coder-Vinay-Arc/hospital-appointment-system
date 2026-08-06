import { FaTimes } from "react-icons/fa";
import { useEffect, useState } from "react";
import { getDoctors } from "../services/doctorService";
import { getPatients } from "../services/patientService";
import {
  addAppointment,
  updateAppointment,
} from "../services/appointmentService";
import { toast } from "react-toastify";

function AddAppointmentModal({
  onClose,
  loadAppointments,
  appointment,
  isEditMode,
}) {
  const [doctors, setDoctors] = useState([]);
  const [patients, setPatients] = useState([]);

  const [doctorId, setDoctorId] = useState("");
  const [patientId, setPatientId] = useState("");

  const [appointmentDate, setAppointmentDate] = useState("");
  const [appointmentTime, setAppointmentTime] = useState("");

  const [status, setStatus] = useState("Pending");
  const [errors, setErrors] = useState({});

  const loadDoctors = async () => {
    try {
      const response = await getDoctors();
      setDoctors(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const loadPatients = async () => {
    try {
      const response = await getPatients();
      setPatients(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!doctorId) {
      newErrors.doctorId = "Doctor selection is required";
    }
    if (!patientId) {
      newErrors.patientId = "Patient selection is required";
    }
    if (!appointmentDate) {
      newErrors.appointmentDate = "Appointment date is required";
    } else {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const [year, month, day] = appointmentDate.split("-").map(Number);
      const selectedDate = new Date(year, month - 1, day);
      if (selectedDate < today) {
        newErrors.appointmentDate = "Appointment date cannot be in the past";
      }
    }
    if (!appointmentTime) {
      newErrors.appointmentTime = "Time slot is required";
    }
    setErrors(newErrors);
    return newErrors;
  };

  const handleSubmit = async () => {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      const firstError = Object.values(validationErrors)[0];
      toast.error(firstError);
      return;
    }

    try {
      const appointmentData = {
        appointmentDate,
        appointmentTime,
        status,
        doctorId,
        patientId,
      };

      if (isEditMode) {
        await updateAppointment(appointment.id, appointmentData);

        toast.success("Appointment updated successfully");
      } else {
        await addAppointment(appointmentData);

        toast.success("Appointment booked successfully");
      }

      loadAppointments();
      onClose();
    } catch (error) {
      console.error(error);

      toast.error(error.response?.data?.message || "Something went wrong!");
    }
  };

  const timeSlots = [
    "08:00",
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
    "19:00",
    "20:00",
    "21:00",
    "22:00",
  ];

  useEffect(() => {
    if (appointment && doctors.length > 0 && patients.length > 0) {
      setDoctorId(String(appointment.doctor.id));
      setPatientId(String(appointment.patient.id));
      setAppointmentDate(appointment.appointmentDate);
      setAppointmentTime(appointment.appointmentTime.substring(0, 5));
      setStatus(appointment.status);
    } else if (!appointment) {
      setDoctorId("");
      setPatientId("");
      setAppointmentDate("");
      setAppointmentTime("");
      setStatus("Pending");
    }
    setErrors({});
  }, [appointment, doctors, patients]);

  useEffect(() => {
    loadDoctors();
    loadPatients();
  }, []);

  return (
    <div
      className="fixed inset-0 bg-black/40 flex items-center justify-center"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg p-6 w-[550px]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">
            {isEditMode ? "Update Appointment" : "Book Appointment"}
          </h2>

          <button
            onClick={onClose}
            className="text-gray-500 hover:text-red-500 text-xl cursor-pointer"
          >
            <FaTimes />
          </button>
        </div>

        <div className="mb-4">
          <label className="block mb-2 font-medium">Doctor</label>

          <select
            value={doctorId}
            onChange={(e) => {
              setDoctorId(e.target.value);
              if (errors.doctorId) setErrors((prev) => ({ ...prev, doctorId: null }));
            }}
            className={`w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 ${
              errors.doctorId ? "border-red-500 focus:ring-red-500" : "focus:ring-blue-500"
            }`}
          >
            <option value="">Select Doctor</option>

            {doctors.map((doctor) => (
              <option key={doctor.id} value={doctor.id}>
                {doctor.name}
              </option>
            ))}
          </select>
          {errors.doctorId && <p className="text-red-500 text-xs mt-1">{errors.doctorId}</p>}
        </div>
        <div className="mb-4">
          <label className="block mb-2 font-medium">Patient</label>

          <select
            value={patientId}
            onChange={(e) => {
              setPatientId(e.target.value);
              if (errors.patientId) setErrors((prev) => ({ ...prev, patientId: null }));
            }}
            className={`w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 ${
              errors.patientId ? "border-red-500 focus:ring-red-500" : "focus:ring-blue-500"
            }`}
          >
            <option value="">Select Patient</option>

            {patients.map((patient) => (
              <option key={patient.id} value={patient.id}>
                {patient.name}
              </option>
            ))}
          </select>
          {errors.patientId && <p className="text-red-500 text-xs mt-1">{errors.patientId}</p>}
        </div>

        <div className="mb-4">
          <label className="block mb-2 font-medium">Appointment Date</label>

          <input
            type="date"
            value={appointmentDate}
            onChange={(e) => {
              setAppointmentDate(e.target.value);
              if (errors.appointmentDate) setErrors((prev) => ({ ...prev, appointmentDate: null }));
            }}
            className={`w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 ${
              errors.appointmentDate ? "border-red-500 focus:ring-red-500" : "focus:ring-blue-500"
            }`}
          />
          {errors.appointmentDate && <p className="text-red-500 text-xs mt-1">{errors.appointmentDate}</p>}
        </div>

        <div className="mb-4">
          <label className="block mb-2 font-medium">Appointment Time</label>

          <select
            value={appointmentTime}
            onChange={(e) => {
              setAppointmentTime(e.target.value);
              if (errors.appointmentTime) setErrors((prev) => ({ ...prev, appointmentTime: null }));
            }}
            className={`w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 ${
              errors.appointmentTime ? "border-red-500 focus:ring-red-500" : "focus:ring-blue-500"
            }`}
          >
            <option value="">Select Time Slot</option>

            {timeSlots.map((slot) => (
              <option key={slot} value={slot}>
                {slot}
              </option>
            ))}
          </select>
          {errors.appointmentTime && <p className="text-red-500 text-xs mt-1">{errors.appointmentTime}</p>}
        </div>

        <div className="mb-4">
          <label className="block mb-2 font-medium">Status</label>

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="Pending">Pending</option>
            <option value="Confirmed">Confirmed</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>

        <div className="flex justify-end mt-6">
          <button
            onClick={handleSubmit}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg cursor-pointer"
          >
            {isEditMode ? "Update" : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddAppointmentModal;
