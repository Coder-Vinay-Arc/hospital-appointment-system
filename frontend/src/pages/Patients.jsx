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
  const [search, setSearch] = useState("");

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

  const filteredPatients = patients.filter((patient) => {
    const q = search.trim().toLowerCase();
    if (!q) return true;
    return (
      (patient.name || "").toLowerCase().includes(q) ||
      String(patient.age || "").toLowerCase().includes(q) ||
      (patient.gender || "").toLowerCase().includes(q) ||
      (patient.phone || "").toLowerCase().includes(q)
    );
  });

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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
        <div className="flex items-center gap-4">
          <h1 className="text-3xl font-bold">Patients</h1>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="🔍 Search Patient"
            className="border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          />
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg cursor-pointer"
        >
          + Add Patient
        </button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        {filteredPatients.length > 0 ? (
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
              {filteredPatients.map((patient) => (
                <tr key={patient.id} className="border-b hover:bg-gray-50">
                  <td className="p-3">{patient.id}</td>

                  <td className="p-3">{patient.name}</td>

                  <td className="p-3">{patient.age}</td>

                  <td className="p-3">{patient.gender}</td>

                  <td className="p-3">{patient.phone}</td>

                  <td className="p-3">
                    <div className="flex justify-center gap-4">
                      <button
                        title="Edit patient"
                        aria-label="Edit patient"
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
                        title="Delete patient"
                        aria-label="Delete patient"
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
        ) : (
          <div className="p-8 text-center">
            <p className="text-lg font-semibold text-slate-700">No Patients Found</p>
            <p className="text-sm text-slate-500 mt-2">Add a patient to see them listed here.</p>
          </div>
        )}

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
