import { FaTimes } from "react-icons/fa";
import { useEffect, useState } from "react";
import { addDoctor, updateDoctor } from "../services/doctorService";
import { toast } from "react-toastify";


function AddDoctorModal({
  onClose,
  loadDoctors,
  doctor,
  isEditMode,
}) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [specialization, setSpecialization] = useState("");

    useEffect(() => {
  if (doctor) {
    setName(doctor.name);
    setEmail(doctor.email);
    setPhone(doctor.phone);
    setSpecialization(doctor.specialization);
  } else {
    setName("");
    setEmail("");
    setPhone("");
    setSpecialization("");
  }
}, [doctor]);

  const handleSubmit = async () => {
  try {
    const doctorData = {
      name,
      email,
      phone,
      specialization,
    };

    if (isEditMode) {
  await updateDoctor(doctor.id, doctorData);
  toast.success("Doctor updated successfully");
  
    } else {
      await addDoctor(doctorData);

      toast.success("Doctor added successfully");
    }

    loadDoctors();
    onClose();

  } catch (error) {
    console.error(error);

    toast.error(
      error.response?.data?.message || "Something went wrong!"
    );
  }
};
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
    {isEditMode ? "Update Doctor" : "Add Doctor"}
</h2>

    <button
        onClick={onClose}
        className="text-gray-500 hover:text-red-500 text-xl cursor-pointer"
    >
        <FaTimes />
    </button>
</div>

        <div className="mb-4">
  <label className="block mb-2 font-medium">
    Doctor Name
  </label>

  <input
    type="text"
    value={name}
    onChange={(e) => setName(e.target.value)}
    placeholder="Enter name"
    className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
  />
</div>

<div className="mb-4">
  <label className="block mb-2 font-medium">
    Email
  </label>

  <input
    type="email"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
    placeholder="Enter email"
    className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
  />
</div>

<div className="mb-4">
  <label className="block mb-2 font-medium">
    Phone No.
  </label>

  <input
    type="tel"
    value={phone}
    onChange={(e) => setPhone(e.target.value)}
    placeholder="Enter phone no"
    className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
  />
</div>

<div className="mb-4">
  <label className="block mb-2 font-medium">
    Specialization
  </label>

  <input
    type="text"
    value={specialization}
    onChange={(e) => setSpecialization(e.target.value)}
    placeholder="Enter specialization"
    className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
  />
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

export default AddDoctorModal;