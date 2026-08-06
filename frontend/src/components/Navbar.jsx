import { FaBell } from "react-icons/fa";

function Navbar() {
  return (
    <div className="h-16 bg-white border-b flex items-center justify-between px-6">

      <h2 className="text-xl font-semibold text-gray-800">
        Hospital Appointment System
      </h2>

      <div className="flex items-center gap-5">

        <FaBell className="text-xl text-gray-600 cursor-pointer" />

        <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold">
          V
        </div>

      </div>

    </div>
  );
}

export default Navbar;