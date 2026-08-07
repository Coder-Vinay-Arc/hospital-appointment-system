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
    const [errors, setErrors] = useState({});

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
  setErrors({});
}, [doctor]);

  const validate = () => {
    const newErrors = {};
    if (!name || !name.trim()) {
      newErrors.name = "Doctor Name is required";
    }
    if (!phone || !phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(phone.trim())) {
      newErrors.phone = "Phone number must be exactly 10 digits";
    }
    if (!specialization || !specialization.trim()) {
      newErrors.specialization = "Specialization is required";
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
      const doctorData = {
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        specialization: specialization.trim(),
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
    onChange={(e) => {
      setName(e.target.value);
      if (errors.name) setErrors((prev) => ({ ...prev, name: null }));
    }}
    placeholder="Enter name"
    className={`w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 ${
      errors.name ? "border-red-500 focus:ring-red-500" : "focus:ring-blue-500"
    }`}
  />
  {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
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
    onChange={(e) => {
      setPhone(e.target.value);
      if (errors.phone) setErrors((prev) => ({ ...prev, phone: null }));
    }}
    placeholder="Enter phone no"
    className={`w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 ${
      errors.phone ? "border-red-500 focus:ring-red-500" : "focus:ring-blue-500"
    }`}
  />
  {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
</div>

<div className="mb-4">
  <label className="block mb-2 font-medium">
    Specialization
  </label>

  <input
    type="text"
    value={specialization}
    onChange={(e) => {
      setSpecialization(e.target.value);
      if (errors.specialization) setErrors((prev) => ({ ...prev, specialization: null }));
    }}
    placeholder="Enter specialization"
    className={`w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 ${
      errors.specialization ? "border-red-500 focus:ring-red-500" : "focus:ring-blue-500"
    }`}
  />
  {errors.specialization && <p className="text-red-500 text-xs mt-1">{errors.specialization}</p>}
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