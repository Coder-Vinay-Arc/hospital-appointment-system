import { useEffect, useState } from "react";
import { getAppointments } from "../services/appointmentService";
import { FaEdit, FaTrash } from "react-icons/fa";
import AddAppointmentModal from "../components/AddAppointmentModal";
import { deleteAppointment } from "../services/appointmentService";
import DeleteAppointmentModal from "../components/DeleteAppointmentModal";
import { toast } from "react-toastify";

function Appointments() {
  const [appointments, setAppointments] = useState([]);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [appointmentToDelete, setAppointmentToDelete] = useState(null);
  const [selectedAppointmentId, setSelectedAppointmentId] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  const loadAppointments = async () => {
    try {
      const response = await getAppointments();
      setAppointments(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await deleteAppointment(id);

      toast.success(response.data);

      loadAppointments();
    } catch (error) {
      console.error(error);

      toast.error(error.response?.data?.message || "Something went wrong!");
    }
  };

  useEffect(() => {
    loadAppointments();
  }, []);

  const filteredAppointments = appointments.filter((appointment) => {
    const q = search.trim().toLowerCase();
    if (!q) return true;
    const doctorName = appointment.doctor?.name || "";
    const patientName = appointment.patient?.name || "";
    return (
      doctorName.toLowerCase().includes(q) ||
      patientName.toLowerCase().includes(q)
    );
  });

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
        <div className="flex items-center gap-4">
          <h1 className="text-3xl font-bold">Appointments</h1>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="🔍 Search Doctor / Patient"
            aria-label="Search Doctor or Patient"
            className="border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500 text-sm w-56 sm:w-64 md:w-72"
          />
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg cursor-pointer"
        >
          + Book Appointment
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        {filteredAppointments.length > 0 ? (
          <table className="w-full">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="p-3 text-left">ID</th>
                <th className="p-3 text-left">Doctor</th>
                <th className="p-3 text-left">Patient</th>
                <th className="p-3 text-left">Date</th>
                <th className="p-3 text-left">Time</th>
                <th className="p-3 text-center">Status</th>
                <th className="p-3 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredAppointments.map((appointment) => (
                <tr key={appointment.id} className="border-b hover:bg-gray-50">
                  <td className="p-3">{appointment.id}</td>

                  <td className="p-3">{appointment.doctor?.name}</td>

                  <td className="p-3">{appointment.patient?.name}</td>

                  <td className="p-3">
                    {new Date(appointment.appointmentDate).toLocaleDateString(
                      "en-GB",
                      {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      },
                    )}
                  </td>

                  <td className="p-3">
                    {appointment.appointmentTime
                      ? new Date(`1970-01-01T${appointment.appointmentTime}`).toLocaleTimeString("en-US", {
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: true,
                        })
                      : "-"}
                  </td>

                  <td className="p-3">
                    <div className="flex justify-center">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          appointment.status === "Pending"
                            ? "bg-yellow-100 text-yellow-700"
                            : appointment.status === "Confirmed"
                            ? "bg-green-100 text-green-700"
                            : appointment.status === "Cancelled"
                            ? "bg-red-100 text-red-700"
                            : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {appointment.status}
                      </span>
                    </div>
                  </td>

                  <td className="p-3">
                    <div className="flex justify-center gap-4">
                      <button
                        title="Edit appointment"
                        aria-label="Edit appointment"
                        onClick={() => {
                          setSelectedAppointment(appointment);
                          setIsEditMode(true);
                          setIsModalOpen(true);
                        }}
                        className="text-blue-600 hover:text-blue-800 cursor-pointer"
                      >
                        <FaEdit />
                      </button>

                      <button
                        title="Delete appointment"
                        aria-label="Delete appointment"
                        onClick={() => {
                          setSelectedAppointmentId(appointment.id);
                          setIsDeleteModalOpen(true);
                        }}
                        className="text-red-600 hover:text-red-800 cursor-pointer"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="p-8 text-center">
            <p className="text-lg font-semibold text-slate-700">No Appointments Found</p>
            <p className="text-sm text-slate-500 mt-2">Book an appointment to see it listed here.</p>
          </div>
        )}
      </div>

      {/* Appointment Modal will come here */}
      {isModalOpen && (
        <AddAppointmentModal
          onClose={() => {
            setIsModalOpen(false);
            setSelectedAppointment(null);
            setIsEditMode(false);
          }}
          loadAppointments={loadAppointments}
          appointment={selectedAppointment}
          isEditMode={isEditMode}
        />
      )}

      {isDeleteModalOpen && (
        <DeleteAppointmentModal
          onClose={() => {
            setIsDeleteModalOpen(false);
            setSelectedAppointmentId(null);
          }}
          onConfirm={() => {
            handleDelete(selectedAppointmentId);
            setIsDeleteModalOpen(false);
            setSelectedAppointmentId(null);
          }}
        />
      )}
    </div>
  );
}

export default Appointments;
