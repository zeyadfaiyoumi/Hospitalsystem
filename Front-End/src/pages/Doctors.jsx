// import React, { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchDoctors } from '../features/Doctors/doctorThunks';
// import { useNavigate } from 'react-router-dom';
// import { motion, AnimatePresence } from 'framer-motion';
// import { Search, Calendar, FileText } from 'lucide-react';
// import NavBar from '../components/NavBar';

// const Doctors = () => {
//   const dispatch = useDispatch();
//   const { doctors, status, error } = useSelector((state) => state.doctors);
//   const navigate = useNavigate();
//   const [searchTerm, setSearchTerm] = useState('');
//   const [currentPage, setCurrentPage] = useState(1);
//   const doctorsPerPage = 8;

//   useEffect(() => {
//     if (status === 'idle') {
//       dispatch(fetchDoctors());
//     }
//   }, [dispatch, status]);

//   if (status === 'loading') return (
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       exit={{ opacity: 0 }}
//       className="flex justify-center items-center h-screen"
//     >
//       <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-mintD"></div>
//     </motion.div>
//   );

//   if (status === 'failed') return (
//     <motion.p
//       initial={{ opacity: 0, y: -20 }}
//       animate={{ opacity: 1, y: 0 }}
//       className="text-center text-xl mt-8 text-red-500"
//     >
//       Error: {error}
//     </motion.p>
//   );

//   const filteredDoctors = doctors.filter(doctor =>
//     doctor.name.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const indexOfLastDoctor = currentPage * doctorsPerPage;
//   const indexOfFirstDoctor = indexOfLastDoctor - doctorsPerPage;
//   const currentDoctors = filteredDoctors.slice(indexOfFirstDoctor, indexOfLastDoctor);

//   const paginate = (pageNumber) => setCurrentPage(pageNumber);

//   const goToDoctorDetails = (doctorId) => {
//     navigate(`/Doctors/${doctorId}`);
//   };

//   return (
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       exit={{ opacity: 0 }}
//     >
//       <NavBar />
//       <div className="relative">
//         {/* Hero Section */}
//         <motion.div
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8 }}
//           className="relative h-72 flex items-center justify-center text-white bg-black"
//         >
//           {/* Background Image with Overlay */}
//           <div
//             className="absolute inset-0 bg-cover bg-center"
//             style={{
//               backgroundImage: `url('https://i.pinimg.com/564x/9d/a4/84/9da484e04b4375f51b47d26bf256b54e.jpg')`,
//               opacity: 0.5 // Adjust opacity as needed
//             }}
//           ></div>
//           <div className="relative z-10 text-center px-4">
//             <h1 className="text-5xl font-bold mb-4 text-mintD mt-36">Eye Care Specialists</h1>
//             <p className="text-xl text-mintD mb-12">Find the best eye care doctors to protect and enhance your vision.</p>
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.5, duration: 0.8 }}
//               className="relative w-full max-w-xl mx-auto"
//             >
//               <input
//                 type="text"
//                 placeholder="Search doctors by name"
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="w-full p-4 pl-12 rounded-full border-2 border-mintD focus:border-mint focus:outline-none transition-colors duration-300 text-gray-800"
//               />
//               <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-mintD" />
//             </motion.div>
//           </div>
//         </motion.div>

//         {/* Doctors Grid */}
//         <div className="container mx-auto px-4 py-16">
//           <AnimatePresence>
//             <motion.div
//               className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               transition={{ duration: 0.5, staggerChildren: 0.1 }}
//             >
//               {currentDoctors.map((doctor) => (
//                 <motion.div
//                   key={doctor.user_id}
//                   className="bg-white shadow-lg rounded-xl overflow-hidden cursor-pointer hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
//                   onClick={() => goToDoctorDetails(doctor.user_id)}
//                   whileHover={{ scale: 1.03 }}
//                   whileTap={{ scale: 0.98 }}
//                   layout
//                 >
//                   <div className="relative">
//                     <img
//                       src={doctor.profile_image || '/default-doctor-image.jpg'}
//                       alt={doctor.name}
//                       className="w-full h-64 object-cover"
//                     />
//                     <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
//                       <h2 className="text-xl font-semibold text-white mb-1">{doctor.name}</h2>
//                     </div>
//                   </div>
//                   <div className="p-4">
//                     <div className="flex items-center mb-2">
//                       <Calendar className="text-yellow-400 mr-1" size={18} />
//                       <span className="text-gray-700">Years of Experience: {doctor.years_of_exprience} years</span>
//                     </div>
//                     <div className="flex items-center">
//                       <FileText className="text-mintD mr-1" size={18} />
//                       <span className="text-gray-600 text-sm">Bio: {doctor.bio.slice(0, 20) + "....."}</span>
//                     </div>
//                   </div>
//                 </motion.div>
//               ))}
//             </motion.div>
//           </AnimatePresence>

//           {/* Pagination */}
//           {filteredDoctors.length > doctorsPerPage && (
//             <motion.div
//               className="mt-12 flex justify-center"
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.3, duration: 0.5 }}
//             >
//               {[...Array(Math.ceil(filteredDoctors.length / doctorsPerPage))].map((_, index) => (
//                 <motion.button
//                   key={index}
//                   onClick={() => paginate(index + 1)}
//                   className={`mx-1 px-4 py-2 rounded-full ${
//                     currentPage === index + 1 ? 'bg-mintD text-white' : 'bg-gray-200 text-gray-700'
//                   } hover:bg-mint transition-colors duration-300`}
//                   whileHover={{ scale: 1.1 }}
//                   whileTap={{ scale: 0.95 }}
//                 >
//                   {index + 1}
//                 </motion.button>
//               ))}
//             </motion.div>
//           )}
//         </div>
//       </div>
//     </motion.div>
//   );
// };

// export default Doctors;

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDoctors } from "../features/Doctors/doctorThunks";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Calendar, FileText } from "lucide-react";
import NavBar from "../components/NavBar";

const Doctors = () => {
  const dispatch = useDispatch();
  const { doctors, status, error } = useSelector((state) => state.doctor);
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const doctorsPerPage = 8;

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchDoctors());
    }
  }, [dispatch, status]);

  if (status === "loading")
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="flex justify-center items-center h-screen"
      >
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-mintD"></div>
      </motion.div>
    );

  if (status === "failed")
    return (
      <motion.p
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center text-xl mt-8 text-red-500"
      >
        Error: {error}
      </motion.p>
    );

  const filteredDoctors = doctors.filter((doctor) =>
    doctor.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastDoctor = currentPage * doctorsPerPage;
  const indexOfFirstDoctor = indexOfLastDoctor - doctorsPerPage;
  const currentDoctors = filteredDoctors.slice(
    indexOfFirstDoctor,
    indexOfLastDoctor
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const goToDoctorDetails = (doctorId) => {
    navigate(`/Doctors/${doctorId}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <NavBar />
      <div className="relative">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative h-72 flex items-center justify-center text-white bg-black"
        >
          {/* Background Image with Overlay */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url('https://i.pinimg.com/564x/9d/a4/84/9da484e04b4375f51b47d26bf256b54e.jpg')`,
              opacity: 0.5, // Adjust opacity as needed
            }}
          ></div>
          <div className="relative z-10 text-center px-4">
            <h1 className="text-5xl font-bold mb-4 text-mintD mt-36">
              Eye Care Specialists
            </h1>
            <p className="text-xl text-mintD mb-12">
              Find the best eye care doctors to protect and enhance your vision.
            </p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="relative w-full max-w-xl mx-auto"
            >
              <input
                type="text"
                placeholder="Search doctors by name"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full p-4 pl-12 rounded-full border-2 border-mintD focus:border-mint focus:outline-none transition-colors duration-300 text-gray-800"
              />
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-mintD" />
            </motion.div>
          </div>
        </motion.div>

        {/* Doctors Grid */}
        <div className="container mx-auto px-4 py-16">
          <AnimatePresence>
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, staggerChildren: 0.1 }}
            >
              {currentDoctors.map((doctor) => (
                <motion.div
                  key={doctor.user_id}
                  className="bg-white shadow-lg rounded-xl overflow-hidden cursor-pointer hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
                  onClick={() => goToDoctorDetails(doctor.user_id)}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  layout
                >
                  <div className="relative">
                    <img
                      src={doctor.profile_image || "/default-doctor-image.jpg"}
                      alt={doctor.name}
                      className="w-full h-64 object-cover"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                      <h2 className="text-xl font-semibold text-white mb-1">
                        {doctor.name}
                      </h2>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex items-center mb-2">
                      <Calendar className="text-yellow-400 mr-1" size={18} />
                      <span className="text-gray-700">
                        Years of Experience: {doctor.years_of_exprience} years
                      </span>
                    </div>
                    <div className="flex items-center">
                      <FileText className="text-mintD mr-1" size={18} />
                      <span className="text-gray-600 text-sm">
                        Bio:{" "}
                        {doctor.bio
                          ? doctor.bio.slice(0, 20) + "..."
                          : "No bio available"}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Pagination */}
          {filteredDoctors.length > doctorsPerPage && (
            <motion.div
              className="mt-12 flex justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              {[
                ...Array(Math.ceil(filteredDoctors.length / doctorsPerPage)),
              ].map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => paginate(index + 1)}
                  className={`mx-1 px-4 py-2 rounded-full ${
                    currentPage === index + 1
                      ? "bg-mintD text-white"
                      : "bg-gray-200 text-gray-700"
                  } hover:bg-mint transition-colors duration-300`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {index + 1}
                </motion.button>
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default Doctors;
