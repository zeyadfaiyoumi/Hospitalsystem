import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import {
  Search,
  MoreVertical,
  Edit,
  ChevronLeft,
  ChevronRight,
  Trash,
  Ban,
  Undo2,
  Unlock,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDoctor, BanDoctor } from "../../../../features/Admin/DoctorSlice";
import Swal from "sweetalert2"; // إضافة مكتبة sweetalert2
import SoftAlert from "../../components/SoftAlert";

import Loading from "../../components/Loading";
const DoctorsDashboard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [doctorsPerPage, setDoctorsPerPage] = useState(5);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const patients = useSelector((state) => state.Patient.Patient);
  const patientStatus = useSelector((state) => state.Patient.status);
  const doctors = useSelector((state) => state.Doctor.Doctor);
  const doctorStatus = useSelector((state) => state.Doctor.status);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (doctorStatus === "idle") {
      dispatch(fetchDoctor());
    }
  }, [dispatch, doctorStatus]);

  useEffect(() => {
    if (doctorStatus === "loading") {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
  }, [doctorStatus]);

  useEffect(() => {
    if (doctorStatus === "failed") {
      navigate("/Signup");
    }
  }, [doctorStatus, navigate]);
  const handleBan = async (id, event) => {
    event.preventDefault();

    Swal.fire({
      title: "Are you sure you want to ban this Doctor?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#1f7b6f",
      cancelButtonColor: "#848484",
      confirmButtonText: "Yes, ban them",
      cancelButtonText: "Cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await dispatch(BanDoctor(id));
        Swal.fire(
          "Banned!",
          "The Doctor has been successfully banned.",
          "success"
        );
        dispatch(fetchDoctor());
      }
    });
  };

  const handleUnBan = async (id, event) => {
    event.preventDefault();

    Swal.fire({
      title: "Are you sure you want to unban this Doctor?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#1f7b6f",
      cancelButtonColor: "#848484",
      confirmButtonText: "Yes, unban them",
      cancelButtonText: "Cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await dispatch(BanDoctor(id));
        Swal.fire(
          "Unbanned!",
          "The Doctor has been successfully unbanned.",
          "success"
        );
        dispatch(fetchDoctor());
      }
    });
  };
  const [showAlert, setShowAlert] = useState(false);

  const handleOpenAlert = () => setShowAlert(true);
  const handleCloseAlert = () => setShowAlert(false);
  const filteredDoctors = (doctors ? [...doctors] : [])
    .sort((a, b) => b.user_id - a.user_id) // ترتيب الأطباء بناءً على user_id بشكل تنازلي
    .filter(
      (doctor) =>
        doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doctor.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doctor.role.toLowerCase().includes(searchTerm.toLowerCase())
    );

  // حساب عدد الصفحات
  const totalPages = Math.ceil(filteredDoctors.length / doctorsPerPage);

  // حساب الأطباء في الصفحة الحالية
  const indexOfLastDoctor = currentPage * doctorsPerPage;
  const indexOfFirstDoctor = indexOfLastDoctor - doctorsPerPage;
  const currentDoctors = filteredDoctors.slice(
    indexOfFirstDoctor,
    indexOfLastDoctor
  );

  // الانتقال للصفحة التالية
  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  // الانتقال للصفحة السابقة
  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden md:ml-64">
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
          <div className="container mx-auto px-4 sm:px-8">
            <div className="py-8">
              <div className="flex flex-col md:flex-row justify-between items-center">
                <h1 className="text-2xl font-semibold text-gray-900">
                  Doctors Management
                </h1>
                <div className="p-6">
                  <button
                    onClick={handleOpenAlert}
                    className="mt-4 md:mt-0 bg-[#1f7b6f] hover:bg-[#1a6960] text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out"
                  >
                    Add New Doctors
                  </button>
                  {showAlert && <SoftAlert onClose={handleCloseAlert} />}
                </div>
              </div>
              <div className="my-4 flex sm:flex-row flex-col">
                <div className="flex flex-row mb-1 sm:mb-0">
                  <div className="relative">
                    <select
                      value={doctorsPerPage}
                      onChange={(e) =>
                        setDoctorsPerPage(Number(e.target.value))
                      }
                      className="appearance-none h-full rounded-l border block w-full bg-white border-gray-400 text-gray-700 py-2 px-4 pr-8 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    >
                      <option value={5}>5</option>
                      <option value={10}>10</option>
                      <option value={20}>20</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                      <svg
                        className="fill-current h-4 w-4"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="block relative mt-2 sm:mt-0">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                    <Search className="h-5 w-5 text-gray-400" />
                  </span>
                  <input
                    placeholder="Search doctors..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="appearance-none rounded-r rounded-l sm:rounded-l-none border border-gray-400 border-b block pl-8 pr-6 py-2 w-full bg-white text-sm placeholder-gray-400 text-gray-700 focus:bg-white focus:placeholder-gray-600 focus:text-gray-700 focus:outline-none"
                  />
                </div>
              </div>
              <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
                  <table className="min-w-full leading-normal">
                    <thead>
                      <tr>
                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-[#1f7b6f] text-left text-xs font-semibold text-white uppercase tracking-wider">
                          Doctor
                        </th>
                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-[#1f7b6f] text-left text-xs font-semibold text-white uppercase tracking-wider">
                          Specialization
                        </th>
                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-[#1f7b6f] text-left text-xs font-semibold text-white uppercase tracking-wider">
                          Email
                        </th>
                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-[#1f7b6f] text-left text-xs font-semibold text-white uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentDoctors.map((doctor) => (
                        <tr key={doctor.user_id}>
                          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 w-10 h-10">
                                <img
                                  className="w-full h-full rounded-full"
                                  src={`https://ui-avatars.com/api/?name=${doctor.name}&background=random`}
                                  alt=""
                                />
                              </div>
                              <div className="ml-3">
                                <p className="text-gray-900 whitespace-no-wrap">
                                  {doctor.name}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                            <p className="text-gray-900 whitespace-no-wrap">
                              {doctor.role}
                            </p>
                          </td>
                          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                            <p className="text-gray-900 whitespace-no-wrap">
                              {doctor.email}
                            </p>
                          </td>
                          {doctor.isactive ? (
                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                              <div className="flex items-center space-x-4">
                                <button
                                  onClick={(e) => handleBan(doctor.user_id, e)}
                                  title="Ban User"
                                  className="flex items-center text-white bg-gradient-to-r from-[#ff494c] to-[#ff494c] focus:ring-4 focus:ring-green-300 rounded-lg px-4 py-2 transition-all duration-300 ease-in-out transform hover:scale-105 shadow-lg"
                                >
                                  Ban <Ban size={15} className="ml-2" />
                                </button>
                              </div>
                            </td>
                          ) : (
                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                              <div className="flex items-center space-x-4">
                                <button
                                  onClick={(e) =>
                                    handleUnBan(doctor.user_id, e)
                                  }
                                  title="Ban User"
                                  className="flex items-center text-white bg-gradient-to-r from-[#1F7B6F] to-[#1F7B6F] focus:ring-4 focus:ring-green-300 rounded-lg px-4 py-2 transition-all duration-300 ease-in-out transform hover:scale-105 shadow-lg"
                                >
                                  UnBan <Undo2 size={15} className="ml-2" />
                                </button>
                              </div>
                            </td>
                          )}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {/* Pagination controls */}
                  <div className="flex justify-center items-center mt-4 mb-4">
                    <button
                      onClick={prevPage}
                      className={`flex items-center px-4 py-2 bg-gray-300 text-gray-600 rounded-lg ${
                        currentPage === 1
                          ? "opacity-50 cursor-not-allowed"
                          : "hover:bg-gray-400"
                      }`}
                      disabled={currentPage === 1}
                    >
                      <ChevronLeft size={18} />
                    </button>
                    <span className="mx-4 text-gray-600">
                      Page {currentPage} of {totalPages}
                    </span>
                    <button
                      onClick={nextPage}
                      className={`flex items-center px-4 py-2 bg-gray-300 text-gray-600 rounded-lg ${
                        currentPage === totalPages
                          ? "opacity-50 cursor-not-allowed"
                          : "hover:bg-gray-400"
                      }`}
                      disabled={currentPage === totalPages}
                    >
                      <ChevronRight size={18} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DoctorsDashboard;
