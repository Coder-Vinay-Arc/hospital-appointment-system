import { FaTimes } from "react-icons/fa";
import { useEffect, useState } from "react";
import { addPatient, updatePatient } from "../services/patientService";
import { toast } from "react-toastify";



function AddPatientModal({
  onClose,
  loadPatients,
  patient,
  isEditMode,
}) {
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [age, setAge] = useState("");
    const [gender, setGender] = useState("");
    const [errors, setErrors] = useState({});
    

    useEffect(() => {
  if (patient) {
    setName(patient.name);
    setAge(patient.age);
    setPhone(patient.phone);
    setGender(patient.gender);
  } else {
    setName("");
    setAge("");
    setPhone("");
    setGender("");
  }
  setErrors({});
}, [patient]);

  const validate = () => {
    const newErrors = {};
    if (!name || !name.trim()) {
      newErrors.name = "Patient Name is required";
    }
    if (!phone || !phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(phone.trim())) {
      newErrors.phone = "Phone number must be exactly 10 digits";
    }
    if (age === "" || age === undefined || age === null) {
      newErrors.age = "Age is required";
    } else if (Number(age) <= 0) {
      newErrors.age = "Age must be greater than 0";
    }
    if (!gender || !gender.trim()) {
      newErrors.gender = "Gender is required";
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
      const patientData = {
        name: name.trim(),
        age: Number(age),
        phone: phone.trim(),
        gender,
      };

      if (isEditMode) {
        await updatePatient(patient.id, patientData);
        toast.success("Patient updated successfully");
      } else {
        await addPatient(patientData);
        toast.success("Patient added successfully");
      }

      loadPatients();
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
    {isEditMode ? "Update Patient" : "Add Patient"}
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
    Patient Name
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
    Age
  </label>

  <input
    type="number"
    value={age}
    onChange={(e) => {
      setAge(e.target.value);
      if (errors.age) setErrors((prev) => ({ ...prev, age: null }));
    }}
    placeholder="Enter age"
    className={`w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 ${
      errors.age ? "border-red-500 focus:ring-red-500" : "focus:ring-blue-500"
    }`}
  />
  {errors.age && <p className="text-red-500 text-xs mt-1">{errors.age}</p>}
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
    Gender
  </label>

  <select
    value={gender}
    onChange={(e) => {
      setGender(e.target.value);
      if (errors.gender) setErrors((prev) => ({ ...prev, gender: null }));
    }}
    className={`w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 ${
      errors.gender ? "border-red-500 focus:ring-red-500" : "focus:ring-blue-500"
    }`}
  >
    <option value="">Select Gender</option>
    <option value="Male">Male</option>
    <option value="Female">Female</option>
    <option value="Other">Other</option>
  </select>
  {errors.gender && <p className="text-red-500 text-xs mt-1">{errors.gender}</p>}
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

export default AddPatientModal;