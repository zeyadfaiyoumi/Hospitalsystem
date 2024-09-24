
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchDoctorById } from "../features/Doctors/doctorThunks";
import { fetchDoctorAppointments } from "../features/Doctors/doctorThunksA";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  User,
  Clock,
  MapPin,
  Star,
  Calendar,
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  XCircle,
} from "lucide-react";
import NavBar from "../components/NavBar";
import Cookies from "js-cookie";
import Swal from "sweetalert2";


const DoctorDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [feedback, setFeedback] = useState('');
  const [feedbackList, setFeedbackList] = useState([]);

  const {
    selectedDoctor,
    status: doctorStatus,
    error: doctorError,
  } = useSelector((state) => state.doctor);
  const {
    data: appointments,
    status: appointmentsStatus,
    error: appointmentsError,
  } = useSelector((state) => state.appointments);

  useEffect(() => {
    dispatch(fetchDoctorById(id));
    dispatch(fetchDoctorAppointments(id));
    fetchFeedback();
  }, [dispatch, id]);


  useEffect(() => {
    const bookedAppointment = Cookies.get("bookedAppointment");
    if (bookedAppointment) {
      Cookies.remove("bookedAppointment");
    }
  }, []);

  if (doctorStatus === "loading" || appointmentsStatus === "loading") {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="flex justify-center items-center h-screen bg-gray-100"
      >
        <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-mintD"></div>
      </motion.div>
    );
  }

  if (doctorStatus === "failed" || appointmentsStatus === "failed") {
    return (
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center justify-center h-screen bg-gray-100"
      >
        <XCircle className="text-red-500 w-16 h-16 mb-4" />
        <p className="text-xl text-gray-800">
          Error: {doctorError || appointmentsError}
        </p>
      </motion.div>
    );
  }

  const fetchFeedback = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/feedback/${id}`);
      const data = await response.json();
      setFeedbackList(data);
    } catch (error) {
      console.error('Error fetching feedback:', error);
    }
  };

  const handleSubmitFeedback = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://localhost:5000/api/feedback`, {
        doctor_id: id,
        comment: feedback,
      }, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${Cookies.get('token')}`
        },
        withCredentials: true
      });


      if (response.status === 201) {
        setFeedback('');
        fetchFeedback();
        Swal.fire({
          title: 'Feedback Submitted',
          text: 'Thank you for your feedback!',
          icon: 'success',
          confirmButtonColor: '#10B981',
        });
      }
    } catch (error) {
      console.error('Error submitting feedback:', error);
      Swal.fire({
        title: 'Error',
        text: 'Failed to submit feedback. Please try again.',
        icon: 'error',
        confirmButtonColor: '#EF4444',
      });
    }
  };

  const handleBookAppointment = (appointment) => {
    Swal.fire({

      title: 'Confirm Booking',
      text: 'Are you sure you want to book this appointment?',
      icon: 'question',

      showCancelButton: true,
      confirmButtonColor: "#10B981",
      cancelButtonColor: "#EF4444",
      confirmButtonText: "Yes, book it!",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        const bookingDetails = {
          doctor: {
            name: selectedDoctor.name,
            email: selectedDoctor.email,
            gender: selectedDoctor.gender,
            profile_image:
              selectedDoctor.profile_image || "/default-doctor-image.jpg",
          },
          appointment: {
            start_time: appointment.start_time,
            end_time: appointment.end_time,
            is_available: appointment.is_available,
          },
        };
        Cookies.set("bookedAppointment", JSON.stringify(bookingDetails), {
          expires: 7,
        });
        navigate("/checkout");
      }
    });
  };

  const filterAppointments = () => {
    if (!Array.isArray(appointments)) return [];
    return appointments.filter((appointment) => {
      const appointmentDate = new Date(appointment.start_time);
      return (
        appointmentDate.toDateString() === selectedDate.toDateString() &&
        (!selectedTimeSlot ||
          (appointmentDate.getHours() >= selectedTimeSlot[0] &&
            appointmentDate.getHours() < selectedTimeSlot[1]))
      );
    });
  };

  const filteredAppointments = filterAppointments();

  const changeDate = (days) => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() + days);
    setSelectedDate(newDate);
  };

  if (doctorStatus === 'loading' || appointmentsStatus === 'loading') {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="flex justify-center items-center h-screen bg-gray-100"
      >
        <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-mintD"></div>
      </motion.div>
    );
  }

  if (doctorStatus === 'failed' || appointmentsStatus === 'failed') {
    return (
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center justify-center h-screen bg-gray-100"
      >
        <XCircle className="text-red-500 w-16 h-16 mb-4" />
        <p className="text-xl text-gray-800">Error: {doctorError || appointmentsError}</p>
      </motion.div>
    );
  }

  if (!selectedDoctor) {
    return (
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center justify-center h-screen bg-gray-100"
      >
        <User className="text-gray-400 w-16 h-16 mb-4" />
        <p className="text-xl text-gray-800">No doctor found.</p>
      </motion.div>
    );
  }

  return (
    <>
      <NavBar />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}

        className=" min-h-screen"
      >
        <div className="container mx-auto py-12 px-4 mt-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white shadow-xl rounded-2xl overflow-hidden mb-8"
          >
            <div className="bg-gradient-to-r from-mintD to-mint p-8 text-white">
              <div className="flex flex-col md:flex-row items-center">
                <img
                  src={
                    selectedDoctor.profile_image || "/default-doctor-image.jpg"
                  }
                  alt={selectedDoctor.name}
                  className="w-48 h-48 rounded-full object-cover border-4 border-white shadow-lg mb-4 md:mb-0 md:mr-8"
                />
                <div>
                  <h1 className="text-4xl font-bold mb-2">
                    {selectedDoctor.name}
                  </h1>
                  <div className="flex items-center mb-2">
                    <Calendar className="text-yellow-300 mr-1" size={20} />
                    <span className="text-xl">
                      {selectedDoctor.years_of_exprience} years
                    </span>
                  </div>
                  <p className="text-lg mb-2">
                    {selectedDoctor.specialization}
                  </p>
                  <div className="flex flex-wrap gap-4 mt-4">
                    <p className="flex items-center">
                      <Mail className="mr-2" size={18} /> {selectedDoctor.email}
                    </p>
                    <p className="flex items-center">
                      <User className="mr-2" size={18} />{" "}
                      {selectedDoctor.gender}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-8">
              <h2 className="text-2xl font-semibold mb-4">
                About Dr. {selectedDoctor.name}
              </h2>
              <p className="text-gray-700">
                {selectedDoctor.bio || "No bio available."}
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="bg-white shadow-xl rounded-2xl p-8 mb-8"
          >
            <h2 className="text-3xl font-bold text-mintD mb-6">
              Book an Appointment
            </h2>
            <div className="flex flex-wrap items-center justify-between mb-6">
              <div className="flex items-center space-x-4 mb-4 sm:mb-0">
                <button
                  onClick={() => changeDate(-1)}
                  className="p-2 rounded-full bg-mintL hover:bg-mint transition-colors"
                >
                  <ChevronLeft size={24} />
                </button>
                <div className="text-xl font-semibold">
                  {new Intl.DateTimeFormat("en-US", {
                    weekday: "long",
                    month: "long",
                    day: "numeric",
                  }).format(selectedDate)}
                </div>
                <button
                  onClick={() => changeDate(1)}
                  className="p-2 rounded-full bg-mintL hover:bg-mint transition-colors"
                >
                  <ChevronRight size={24} />
                </button>
              </div>
              <div className="flex items-center space-x-4">
                <Clock size={24} className="text-mintD" />
                <select
                  className="p-2 border border-mintD rounded-lg"
                  onChange={(e) =>
                    setSelectedTimeSlot(JSON.parse(e.target.value))
                  }
                >
                  <option>All Time Slots</option>
                  <option value="[9, 12]">Morning (9 AM - 12 PM)</option>
                  <option value="[12, 15]">Afternoon (12 PM - 3 PM)</option>
                  <option value="[15, 18]">Evening (3 PM - 6 PM)</option>
                </select>
              </div>
            </div>

            {filteredAppointments.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-center justify-center">
                {filteredAppointments.map((appointment) => (
                  <motion.div
                    key={appointment.id}
                    whileHover={{ scale: 1.05 }}
                    className={`border p-4 rounded-lg shadow-md ${
                      appointment.is_available ? "bg-mintL" : "bg-gray-200"
                    }`}
                  >
                    <h3 className="text-lg font-semibold">
                      {new Intl.DateTimeFormat("en-US", {
                        hour: "numeric",
                        minute: "numeric",
                        hour12: true,
                      }).format(new Date(appointment.start_time))}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {appointment.is_available ? "Available" : "Not Available"}
                    </p>
                    {appointment.is_available && (
                      <button
                        onClick={() => handleBookAppointment(appointment)}
                        className="mt-4 bg-mintD text-white py-2 px-4 rounded-lg hover:bg-mint transition-colors"
                      >
                        Book Appointment NOW
                      </button>
                    )}
                  </motion.div>
                ))}
              </div>
            ) : (
              <p className="text-gray-600">
                No available appointments for the selected date and time.
              </p>
            )}
          </motion.div>

        </div>
      </motion.div>
    </>
  );
};

export default DoctorDetails;