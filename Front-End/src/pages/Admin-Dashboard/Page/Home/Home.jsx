import React, { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useDispatch, useSelector } from "react-redux";
import { fetchPatient } from "../../../../features/Admin/PatientSlice";
import { fetchDoctor } from "../../../../features/Admin/DoctorSlice";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/Loading";

import { fetchAppointments } from "../../../../features/Admin/Appointments";
const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const doctors = useSelector((state) => state.Doctor.Doctor);
  const doctorStatus = useSelector((state) => state.Doctor.status);
  const patients = useSelector((state) => state.Patient.Patient);
  const patientStatus = useSelector((state) => state.Patient.status);
  const appointments = useSelector((state) => state.appointments.appointments);

  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    dispatch(fetchAppointments());
  }, [dispatch]);
  // Combined useEffect for fetching data and handling status
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (patientStatus === "idle" && !patients) {
          await dispatch(fetchPatient()).unwrap();
        }
        if (doctorStatus === "idle") {
          await dispatch(fetchDoctor()).unwrap();
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        navigate("/Signup");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [dispatch, navigate, patientStatus, patients, doctorStatus]);
  if (patientStatus && doctorStatus == "loading") {
    return <Loading />;
  }
  const totalBillingAmount = appointments.reduce((total, appointment) => {
    return total + parseFloat(appointment.billing_amount); // تحويل إلى رقم
}, 0);
  const statistics = [
    {
      title: "Total Users",
      value: patients ? patients.length : 0,
      color: "bg-[#1f7b6f]",
    },
    {
      title: "Total Doctors",
      value: doctors ? doctors.length : 0,
      color: "bg-[#232323]",
    },
    {
      title: "Appointments",
      value: appointments ? appointments.length : 0,
      color: "bg-[#1f7b6f]",
    },
    { title: "Profits", value: totalBillingAmount.toFixed(2)+" JOD", color: "bg-[#232323]" },
  ];
  const data = [
    { name: "Jan", Profits: 200 },
    { name: "Feb", Profits: 300 },
    { name: "Mar", Profits: 600 },
    { name: "Apr", Profits: 200 },
    { name: "May", Profits: 500 },
    { name: "Jun", Profits: 222 },
    { name: "Jul", Profits: 520 },
    { name: "Aug", Profits: 300 },
    { name: "Sep", Profits: totalBillingAmount.toFixed(2) },
  ];

  return (
    <div className="flex flex-col md:flex-row bg-gray-100 min-h-screen">
      <Sidebar />
      <div className="flex-1 p-8 md:ml-64">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Dashboard</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {statistics.map((item, index) => (
            <div
              key={index}
              className={`${item.color} text-white p-4 rounded shadow`}
            >
              <h3 className="text-lg font-semibold">{item.title}</h3>
              <p className="text-2xl font-bold">{item.value}</p>
            </div>
          ))}
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            Sales Analysis
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="Profits" fill="#1f7b6f" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
