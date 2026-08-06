import { useEffect, useState } from "react";
import { getPatients, deletePatient } from "../services/patientService";
import AddPatientModal from "../components/AddPatientModal";
import { FaEdit, FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";
import DeletePatientModal from "../components/DeletePatientModal";


function Patients() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [patients, setPatients] = useState([]);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedPatientId, setSelectedPatientId] = useState(null);

  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);

  const loadPatients = async () => {
    try {
      const response = await getPatients();
      setPatients(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadPatients();
  }, []);

  const handleDelete = async (id) => {
  try {
    const response = await deletePatient(id);

    toast.success(response.data);
    loadPatients();

  } catch (error) {
    toast.error(
      error.response?.data?.message || "Something went wrong!"
    );
  }
};

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Patients</h1>

        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg cursor-pointer"
        >
          + Add Patient
        </button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="p-3 text-left">ID</th>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Age</th>
              <th className="p-3 text-left">Gender</th>
              <th className="p-3 text-left">Phone</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {patients.map((patient) => (
              <tr key={patient.id} className="border-b hover:bg-gray-50">
                <td className="p-3">{patient.id}</td>

                <td className="p-3">{patient.name}</td>

                <td className="p-3">{patient.age}</td>

                <td className="p-3">{patient.gender}</td>

                <td className="p-3">{patient.phone}</td>

                <td className="p-3">
                  <div className="flex justify-center gap-4">
                    <button
  onClick={() => {
  setSelectedPatient(patient);
  setIsEditMode(true);
  setIsModalOpen(true);
}}
  className="text-blue-600 hover:text-blue-800 cursor-pointer"
>
  <FaEdit />
</button>
                    <button
                      onClick={() => {
                        setSelectedPatientId(patient.id);
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
          <AddPatientModal
    onClose={() => {
        setIsModalOpen(false);
        setSelectedPatient(null);
        setIsEditMode(false);
    }}
    loadPatients={loadPatients}
    patient={selectedPatient}
    isEditMode={isEditMode}
/>
        )}
        {isDeleteModalOpen && (
  <DeletePatientModal
    onClose={() => {
      setIsDeleteModalOpen(false);
      setSelectedPatientId(null);
    }}
    onConfirm={() => {
      handleDelete(selectedPatientId);
      setIsDeleteModalOpen(false);
      setSelectedPatientId(null);
    }}
  />
)}
      </div>
    </div>
  );
}

export default Patients;
