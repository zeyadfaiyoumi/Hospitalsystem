import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAppointments,
  updateAppointmentStatus,
} from "../../../../features/Admin/Appointments"; // تأكد من مسار الاستيراد الصحيح
import Sidebar from "../../components/Sidebar";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";
import Swal from "sweetalert2";

const AppointmentsDashboard = () => {
  const dispatch = useDispatch();
  const appointments = useSelector((state) => state.appointments.appointments);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [ordersPerPage, setOrdersPerPage] = useState(5);
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  useEffect(() => {
    dispatch(fetchAppointments());
  }, [dispatch]);

  const filteredOrders = appointments
    .filter(
      (order) =>
        order.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.doctor_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        new Date(order.appointment_start)
          .toLocaleString()
          .includes(searchTerm.toLowerCase()) ||
        order.status.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => a.appointment_id - b.appointment_id); // إضافة هذا السطر للفرز

  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = filteredOrders.slice(
    indexOfFirstOrder,
    indexOfLastOrder
  );

  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleStatusChange = (id, newStatus) => {
    setSelectedAppointment({ id, status: newStatus });

    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to change the status?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(updateAppointmentStatus({ id, status: newStatus })).then(
          () => {
            dispatch(fetchAppointments()); // إعادة جلب البيانات بعد التحديث
            Swal.fire("Updated!", "The status has been changed.", "success");
          }
        );
      }
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "text-blue-500";
      case "cancelled":
        return "text-red-500";
      default:
        return "text-gray-500";
    }
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
                  Appointment Management
                </h1>
              </div>
              <div className="my-4 flex sm:flex-row flex-col">
                <div className="flex flex-row mb-1 sm:mb-0">
                  <div className="relative">
                    <select
                      value={ordersPerPage}
                      onChange={(e) => setOrdersPerPage(Number(e.target.value))}
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
                    placeholder="Search orders..."
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
                          Patient
                        </th>
                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-[#1f7b6f] text-left text-xs font-semibold text-white uppercase tracking-wider">
                          Doctor
                        </th>
                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-[#1f7b6f] text-left text-xs font-semibold text-white uppercase tracking-wider">
                          Notes
                        </th>
                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-[#1f7b6f] text-left text-xs font-semibold text-white uppercase tracking-wider">
                          Appointment date
                        </th>
                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-[#1f7b6f] text-left text-xs font-semibold text-white uppercase tracking-wider">
                        Booking price
                        </th>
                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-[#1f7b6f] text-left text-xs font-semibold text-white uppercase tracking-wider">
                        Appointment status
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentOrders.map((order) => (
                        <tr key={order.appointment_id}>
                          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 w-10 h-10">
                                <img
                                  className="w-full h-full rounded-full"
                                  src={`https://ui-avatars.com/api/?name=${order.patient_name}&background=random`}
                                  alt=""
                                />
                              </div>
                              <div className="ml-3">
                                <p className="text-gray-900 whitespace-no-wrap">
                                  {order.patient_name}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 w-10 h-10">
                                <img
                                  className="w-full h-full rounded-full"
                                  src={`https://ui-avatars.com/api/?name=${order.doctor_name}&background=random`}
                                  alt=""
                                />
                              </div>
                              <div className="ml-3">
                                <p className="text-gray-900 whitespace-no-wrap">
                                  {order.doctor_name}
                                </p>
                              </div>
                            </div>
                          </td>

                          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                            <div className="max-h-20 max-w-64 overflow-y-auto">
                              <p className="text-gray-900 whitespace-no-wrap">
                                {order.notes}
                              </p>
                            </div>
                          </td>
                          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                            <p className="text-gray-900 whitespace-no-wrap">
                              {new Date(
                                order.appointment_date
                              ).toLocaleString()}
                            </p>
                          </td>
                          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
                            <p className="text-gray-900 whitespace-no-wrap">
                            {order.billing_amount}
                            </p>
                          </td>
                          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                            <select
                              value={order.status}
                              onChange={(e) =>
                                handleStatusChange(
                                  order.appointment_id,
                                  e.target.value
                                )
                              }
                              className={`appearance-none border rounded-md py-2 px-3 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-opacity-50 ${
                                order.status === "scheduled"
                                  ? "bg-blue-100 border-blue-500 text-blue-700"
                                  : order.status === "completed"
                                  ? "bg-green-100 border-green-500 text-green-700"
                                  : "bg-red-100 border-red-500 text-red-700"
                              }`}
                            >
                              <option
                                value="completed"
                                className="text-green-700"
                              >
                                Completed
                              </option>
                              <option
                                value="cancelled"
                                className="text-red-700 "
                              >
                                Cancelled
                              </option>
                              <option
                                value="scheduled"
                                className="text-blue-700 "
                              >
                                Scheduled
                              </option>
                            </select>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
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
        </main>
      </div>
    </div>
  );
};

export default AppointmentsDashboard;
