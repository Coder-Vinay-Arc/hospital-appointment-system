import { useEffect, useState } from "react";
import { getDoctors, deleteDoctor } from "../services/doctorService";
import AddDoctorModal from "../components/AddDoctorModal";
import { FaEdit, FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";
import DeleteDoctorModal from "../components/DeleteDoctorModal";


function Doctors() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [doctors, setDoctors] = useState([]);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedDoctorId, setSelectedDoctorId] = useState(null);

  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  const loadDoctors = async () => {
    try {
      const response = await getDoctors();
      setDoctors(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadDoctors();
  }, []);

  const handleDelete = async (id) => {
  try {
    const response = await deleteDoctor(id);

    toast.success(response.data);
    loadDoctors();

  } catch (error) {
    toast.error(
      error.response?.data?.message || "Something went wrong!"
    );
  }
};

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Doctors</h1>

        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg cursor-pointer"
        >
          + Add Doctor
        </button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="p-3 text-left">ID</th>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Specialization</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Phone</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {doctors.map((doctor) => (
              <tr key={doctor.id} className="border-b hover:bg-gray-50">
                <td className="p-3">{doctor.id}</td>

                <td className="p-3">{doctor.name}</td>

                <td className="p-3">{doctor.specialization}</td>

                <td className="p-3">{doctor.email}</td>

                <td className="p-3">{doctor.phone}</td>

                <td className="p-3">
                  <div className="flex justify-center gap-4">
                    <button
  onClick={() => {
  setSelectedDoctor(doctor);
  setIsEditMode(true);
  setIsModalOpen(true);
}}
  className="text-blue-600 hover:text-blue-800 cursor-pointer"
>
  <FaEdit />
</button>
                    <button
                      onClick={() => {
                        setSelectedDoctorId(doctor.id);
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
        {isModalOpen && (
          <AddDoctorModal
    onClose={() => {
        setIsModalOpen(false);
        setSelectedDoctor(null);
        setIsEditMode(false);
    }}
    loadDoctors={loadDoctors}
    doctor={selectedDoctor}
    isEditMode={isEditMode}
/>
        )}
        {isDeleteModalOpen && (
  <DeleteDoctorModal
    onClose={() => {
      setIsDeleteModalOpen(false);
      setSelectedDoctorId(null);
    }}
    onConfirm={() => {
      handleDelete(selectedDoctorId);
      setIsDeleteModalOpen(false);
      setSelectedDoctorId(null);
    }}
  />
)}
      </div>
    </div>
  );
}

export default Doctors;
