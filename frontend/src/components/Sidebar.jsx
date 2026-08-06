import { NavLink } from "react-router-dom";
import { FaUserDoctor } from "react-icons/fa6";
import { FaUsers, FaCalendarAlt, FaHome } from "react-icons/fa";

function Sidebar() {
  return (
    <div className="w-64 min-h-screen bg-blue-600 text-white p-5">
      <h1 className="text-2xl font-bold mb-8">HMS</h1>

      <nav className="flex flex-col gap-3">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-2 rounded-lg ${
              isActive
                ? "bg-white text-blue-600 font-semibold"
                : "hover:bg-blue-500"
            }`
          }
        >
          <FaHome />
            Dashboard
        </NavLink>

        <NavLink
          to="/doctors"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-2 rounded-lg ${
              isActive
                ? "bg-white text-blue-600 font-semibold"
                : "hover:bg-blue-500"
            }`
          }
        >
            <FaUserDoctor/>
          Doctors
        </NavLink>

        <NavLink
          to="/patients"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-2 rounded-lg ${
              isActive
                ? "bg-white text-blue-600 font-semibold"
                : "hover:bg-blue-500"
            }`
          }
        >
            <FaUsers/>
          Patients
        </NavLink>

        <NavLink
          to="/appointments"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-2 rounded-lg ${
              isActive
                ? "bg-white text-blue-600 font-semibold"
                : "hover:bg-blue-500"
            }`
          }
        >
            <FaCalendarAlt/>
          Appointments
        </NavLink>
      </nav>
    </div>
  );
}

export default Sidebar;
