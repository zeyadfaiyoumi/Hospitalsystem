import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import {
  Search,
  ChevronLeft,
  ChevronRight,
  Undo2,
  Ban,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPatient,BanPatient } from "../../../../features/Admin/PatientSlice";
import Loading from "../../components/Loading";
import Swal from "sweetalert2"; // إضافة مكتبة sweetalert2
const UserDashboard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage, setUsersPerPage] = useState(5);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const patients = useSelector((state) => state.Patient.Patient);
  const patientStatus = useSelector((state) => state.Patient.status);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!patients) {
      dispatch(fetchPatient());
    }
  }, [dispatch, patients]);

  useEffect(() => {
    if (patientStatus === "idle") {
      dispatch(fetchPatient());
    }
  }, [dispatch, patientStatus]);

  useEffect(() => {
    if (patientStatus === "loading") {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
  }, [patientStatus]);

  useEffect(() => {
    if (patientStatus === "failed") {
      navigate("/Signup");
    }
  }, [patientStatus, navigate]);

  const handleBan = async (id, event) => {
    event.preventDefault();
    
    Swal.fire({
      title: 'Are you sure you want to ban this user?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#1f7b6f',
      cancelButtonColor: '#848484',
      confirmButtonText: 'Yes, ban them',
      cancelButtonText: 'Cancel'
    }).then(async (result) => {
      if (result.isConfirmed) {
        await dispatch(BanPatient(id));
        Swal.fire('Banned!', 'The user has been successfully banned.', 'success');
        dispatch(fetchPatient());
      }
    });
  };
  
  const handleUnBan = async (id, event) => {
    event.preventDefault();
    
    Swal.fire({
      title: 'Are you sure you want to unban this user?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#1f7b6f',
      cancelButtonColor: '#848484',
      confirmButtonText: 'Yes, unban them',
      cancelButtonText: 'Cancel'
    }).then(async (result) => {
      if (result.isConfirmed) {
        await dispatch(BanPatient(id));
        Swal.fire('Unbanned!', 'The user has been successfully unbanned.', 'success');
        dispatch(fetchPatient());
      }
    });
  };
  
  // فلترة المستخدمين بناءً على مصطلح البحث
  // const filteredUsers = patients?.filter(
  //   (user) =>
  //     user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //     user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //     user.gender.toLowerCase().includes(searchTerm.toLowerCase())
  // );
  const filteredUsers = (patients ? [...patients] : [])
  .sort((a, b) => b.user_id - a.user_id) // ترتيب الأطباء بناءً على user_id بشكل تنازلي
  .filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.gender.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // حساب عدد الصفحات
  const totalPages = Math.ceil(filteredUsers?.length / usersPerPage);

  // حساب المستخدمين في الصفحة الحالية
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers?.slice(indexOfFirstUser, indexOfLastUser);

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
                  User Management
                </h1>
              </div>
              <div className="my-4 flex sm:flex-row flex-col">
                <div className="flex flex-row mb-1 sm:mb-0">
                  <div className="relative">
                    <select
                      value={usersPerPage}
                      onChange={(e) => setUsersPerPage(Number(e.target.value))}
                      className="appearance-none h-full rounded-l border block w-full bg-white border-gray-400 text-gray-700 py-2 px-4 pr-8 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    >
                      <option value={5}>5</option>
                      <option value={10}>10</option>
                      <option value={20}>20</option>
                    </select>
                  </div>
                </div>
                <div className="block relative mt-2 sm:mt-0">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                    <Search className="h-5 w-5 text-gray-400" />
                  </span>
                  <input
                    placeholder="Search users..."
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
                          User
                        </th>
                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-[#1f7b6f] text-left text-xs font-semibold text-white uppercase tracking-wider">
                          Gender
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
                      {currentUsers?.map((user) => (
                        <tr key={user.user_id}>
                          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 w-10 h-10">
                                <img
                                  className="w-full h-full rounded-full"
                                  src={`https://ui-avatars.com/api/?name=${user.name}&background=random`}
                                  alt=""
                                />
                              </div>
                              <div className="ml-3">
                                <p className="text-gray-900 whitespace-no-wrap">
                                  {user.name}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                            <p className="text-gray-900 whitespace-no-wrap">
                              {user.gender}
                            </p>
                          </td>
                          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                            <p className="text-gray-900 whitespace-no-wrap">
                              {user.email}
                            </p>
                          </td>
                          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                            <div className="flex items-center space-x-4">
                             {user.isactive?  <button
                              onClick={(e) => handleBan(user.user_id, e)}
                                title="Ban User"
                                className="flex items-center text-white bg-gradient-to-r from-[#ff494c] to-[#ff494c] focus:ring-4 focus:ring-green-300 rounded-lg px-4 py-2 transition-all duration-300 ease-in-out transform hover:scale-105 shadow-lg"
                              >
                                Ban <Ban size={15} className="ml-2" />
                              </button> :  <button
                              onClick={(e) => handleUnBan(user.user_id, e)}
                                title="Ban User"
                                className="flex items-center text-white bg-gradient-to-r from-[#1F7B6F] to-[#1F7B6F] focus:ring-4 focus:ring-green-300 rounded-lg px-4 py-2 transition-all duration-300 ease-in-out transform hover:scale-105 shadow-lg"
                              >
                                UnBan <Undo2 size={15} className="ml-2" />
                              </button>}
                            </div>
                          </td>
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
                      <ChevronLeft className="w-5 h-5" />
                    </button>

                    <span className="text-gray-700 flex items-center space-x-2 ml-2">
                      <span>
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
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </span>
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

export default UserDashboard;
