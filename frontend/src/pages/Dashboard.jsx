import { useEffect, useState } from "react";
import { FaUserMd, FaUsers, FaCalendarCheck, FaClock } from "react-icons/fa";

import { getDoctors } from "../services/doctorService";
import { getPatients } from "../services/patientService";
import { getAppointments } from "../services/appointmentService";

function Dashboard() {
  const [doctors, setDoctors] = useState([]);
  const [patients, setPatients] = useState([]);
  const [appointments, setAppointments] = useState([]);

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

  const loadAppointments = async () => {
    try {
      const response = await getAppointments();
      setAppointments(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadDoctors();
    loadPatients();
    loadAppointments();
  }, []);

  const today = new Date();

  const todayAppointments = appointments.filter((appointment) => {
    const appointmentDate = new Date(appointment.appointmentDate);

    if (Number.isNaN(appointmentDate.getTime())) {
      return false;
    }

    return (
      appointmentDate.getFullYear() === today.getFullYear() &&
      appointmentDate.getMonth() === today.getMonth() &&
      appointmentDate.getDate() === today.getDate()
    );
  });

  const appointmentStatusCounts = appointments.reduce(
    (counts, appointment) => {
      const status = appointment.status || "Others";

      if (status === "Pending") {
        counts.Pending += 1;
      } else if (status === "Confirmed") {
        counts.Confirmed += 1;
      } else if (status === "Cancelled") {
        counts.Cancelled += 1;
      } else {
        counts.Others += 1;
      }

      return counts;
    },
    {
      Confirmed: 0,
      Pending: 0,
      Cancelled: 0,
      Others: 0,
    },
  );

  const totalStatus =
    appointmentStatusCounts.Confirmed +
    appointmentStatusCounts.Pending +
    appointmentStatusCounts.Cancelled +
    appointmentStatusCounts.Others;

  const statusSegments = [
    {
      key: "Confirmed",
      label: "Confirmed",
      color: "#2563eb",
      count: appointmentStatusCounts.Confirmed,
    },
    {
      key: "Pending",
      label: "Pending",
      color: "#16a34a",
      count: appointmentStatusCounts.Pending,
    },
    {
      key: "Cancelled",
      label: "Cancelled",
      color: "#f59e0b",
      count: appointmentStatusCounts.Cancelled,
    },
    {
      key: "Others",
      label: "Others",
      color: "#ef4444",
      count: appointmentStatusCounts.Others,
    },
  ];

  const circumference = 2 * Math.PI * 40;
  let offset = 0;

  const statusChartData = statusSegments.map((segment) => {
    const percentage = totalStatus > 0 ? segment.count / totalStatus : 0;
    const dash = percentage * circumference;
    const result = {
      ...segment,
      percentage,
      dash,
      offset,
    };

    offset += dash;
    return result;
  });

  const recentAppointments = [...appointments]
    .sort((a, b) => {
      const dateA = new Date(`${a.appointmentDate}T${a.appointmentTime}`);
      const dateB = new Date(`${b.appointmentDate}T${b.appointmentTime}`);

      return dateB - dateA;
    })
    .slice(0, 5);

  return (
    <div>
      <h1 className="text-4xl font-bold mb-6">Dashboard</h1>

      <div className="grid gap-6 xl:grid-cols-[2fr_1.25fr]">
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6 flex items-center justify-between gap-6">
            <div>
              <p className="text-sm text-slate-500">Doctors</p>
              <h2 className="text-4xl font-bold mt-3 text-slate-900">{doctors.length}</h2>
            </div>
            <div className="bg-blue-50 text-blue-700 p-4 rounded-3xl shadow-inner">
              <FaUserMd className="text-3xl" />
            </div>
          </div>

          <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6 flex items-center justify-between gap-6">
            <div>
              <p className="text-sm text-slate-500">Patients</p>
              <h2 className="text-4xl font-bold mt-3 text-slate-900">{patients.length}</h2>
            </div>
            <div className="bg-emerald-50 text-emerald-700 p-4 rounded-3xl shadow-inner">
              <FaUsers className="text-3xl" />
            </div>
          </div>

          <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6 flex items-center justify-between gap-6">
            <div>
              <p className="text-sm text-slate-500">Appointments</p>
              <h2 className="text-4xl font-bold mt-3 text-slate-900">{appointments.length}</h2>
            </div>
            <div className="bg-violet-50 text-violet-700 p-4 rounded-3xl shadow-inner">
              <FaCalendarCheck className="text-3xl" />
            </div>
          </div>

          <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6 flex items-center justify-between gap-6">
            <div>
              <p className="text-sm text-slate-500">Today's Appointments</p>
              <h2 className="text-4xl font-bold mt-3 text-slate-900">{todayAppointments.length}</h2>
            </div>
            <div className="bg-orange-50 text-orange-700 p-4 rounded-3xl shadow-inner">
              <FaClock className="text-3xl" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6">
          <div className="flex items-center justify-between gap-4 mb-6">
            <div>
              <p className="text-lg font-semibold text-slate-900">Appointments by Status</p>
              <p className="text-sm text-slate-500 mt-1">Status distribution for all bookings</p>
            </div>
          </div>

          <div className="flex flex-col xl:flex-row items-center xl:items-start gap-6">
            <div className="w-full xl:w-auto">
              <svg viewBox="0 0 100 100" className="w-48 h-48 mx-auto">
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="#e2e8f0"
                  strokeWidth="12"
                />
                {statusChartData.map((segment) => (
                  <circle
                    key={segment.key}
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke={segment.color}
                    strokeWidth="12"
                    strokeDasharray={`${segment.dash} ${circumference - segment.dash}`}
                    strokeDashoffset={circumference - segment.offset}
                    strokeLinecap="round"
                    transform="rotate(-90 50 50)"
                  />
                ))}
                <circle cx="50" cy="50" r="25" fill="white" />
              </svg>
            </div>

            <div className="w-full xl:w-2/3">
              <div className="space-y-3">
                {statusSegments.map((segment) => (
                  <div key={segment.key} className="flex items-center justify-between gap-4 rounded-2xl bg-slate-50 p-3">
                    <div className="flex items-center gap-3">
                      <span
                        className="inline-flex h-3.5 w-3.5 rounded-full"
                        style={{ backgroundColor: segment.color }}
                      />
                      <span className="text-sm text-slate-700">{segment.label}</span>
                    </div>
                    <span className="text-sm font-semibold text-slate-900">{segment.count}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 bg-white rounded-3xl border border-slate-100 shadow-sm p-6">
        <div className="flex items-center justify-between mb-5">
          <div>
            <p className="text-xl font-semibold text-slate-900">Recent Bookings</p>
            <p className="text-sm text-slate-500 mt-1">Last five appointment entries</p>
          </div>
          <a
            href="/appointments"
            className="text-blue-600 hover:text-blue-800 text-sm font-semibold"
          >
            View All Appointments
          </a>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-100 text-slate-600 text-sm uppercase tracking-wide">
              <tr>
                <th className="px-4 py-4">ID</th>
                <th className="px-4 py-4">Doctor</th>
                <th className="px-4 py-4">Patient</th>
                <th className="px-4 py-4">Date</th>
                <th className="px-4 py-4">Time</th>
                <th className="px-4 py-4">Status</th>
              </tr>
            </thead>
            <tbody className="text-slate-700">
              {recentAppointments.map((appointment) => (
                <tr key={appointment.id} className="border-b border-slate-100 hover:bg-slate-50">
                  <td className="px-4 py-4">{appointment.id}</td>
                  <td className="px-4 py-4">{appointment.doctor?.name || "-"}</td>
                  <td className="px-4 py-4">{appointment.patient?.name || "-"}</td>
                  <td className="px-4 py-4">
                    {new Date(appointment.appointmentDate).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </td>
                  <td className="px-4 py-4">
                    {appointment.appointmentTime
                      ? new Date(`1970-01-01T${appointment.appointmentTime}`).toLocaleTimeString("en-US", {
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: true,
                        })
                      : "-"}
                  </td>
                  <td className="px-4 py-4">
                    <span
                      className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-semibold ${
                        appointment.status === "Pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : appointment.status === "Confirmed"
                          ? "bg-emerald-100 text-emerald-700"
                          : appointment.status === "Cancelled"
                          ? "bg-red-100 text-red-700"
                          : "bg-slate-100 text-slate-700"
                      }`}
                    >
                      {appointment.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
