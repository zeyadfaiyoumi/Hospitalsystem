import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Eye, Shield, Calendar } from 'lucide-react';

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.5, when: "beforeChildren", staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } }
  };

  return (
    <motion.div 
      className="relative h-screen bg-gradient-to-br from-white to-[#eafffb] to-mint overflow-hidden"
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
      variants={containerVariants}
    >
      {/* Animated background elements */}
      <motion.div 
        className="absolute top-0 left-0 w-full h-full"
        animate={{ 
          background: [
            "radial-gradient(circle, [#eafffb] 0%, [#eafffb] 70%)",
            "radial-gradient(circle, [#eafffb] 100%, [#eafffb] 100%)"
          ]
        }}
        transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }}
      />

      <div className="container mx-auto px-4 h-full flex flex-col justify-center items-center text-center relative z-10">
        <motion.h1 
          className="text-5xl md:text-7xl font-bold text-mintD mb-6"
          variants={itemVariants}
        >
          See the World Clearly
        </motion.h1>
        
        <motion.p 
          className="text-xl md:text-2xl text-mint mb-8"
          variants={itemVariants}
        >
          Advanced eye care for a brighter future
        </motion.p>

        <motion.div 
          className="flex flex-wrap justify-center gap-4 mb-12"
          variants={itemVariants}
        >
          <FeatureCard icon={<Eye size={32} />} title="Expert Care" description="Cutting-edge diagnostics" />
          <FeatureCard icon={<Shield size={32} />} title="Protection" description="Preventive eye health" />
          <FeatureCard icon={<Calendar size={32} />} title="Convenience" description="Easy online booking" />
        </motion.div>

        <motion.button 
          className="bg-mintD text-white px-8 py-3 rounded-xl text-lg font-semibold hover:bg-mint transition-colors duration-300"
          variants={itemVariants}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Book an Appointment
        </motion.button>
      </div>

      {/* Animated iris */}
      <motion.div 
        className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-500 rounded-full opacity-20"
        animate={{ 
          scale: [1, 1.2, 1],
          rotate: [0, 180, 360],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />
    </motion.div>
  );
};

const FeatureCard = ({ icon, title, description }) => (
  <motion.div 
    className="bg-white bg-opacity-80 p-6 rounded-lg shadow-lg flex flex-col items-center w-64"
    whileHover={{ y: -5, boxShadow: "0 10px 20px rgba(0,0,0,0.1)" }}
  >
    <div className="text-mintD mb-4">{icon}</div>
    <h3 className="text-xl font-semibold text-mint mb-2">{title}</h3>
    <p className="text-gray-700">{description}</p>
  </motion.div>
);

export default Hero;



// import React, { useState, useEffect } from 'react';
// import { motion } from 'framer-motion';

// const Hero = () => {
//   const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

//   useEffect(() => {
//     const handleMouseMove = (e) => {
//       setMousePosition({ x: e.clientX, y: e.clientY });
//     };

//     window.addEventListener('mousemove', handleMouseMove);

//     return () => {
//       window.removeEventListener('mousemove', handleMouseMove);
//     };
//   }, []);

//   const calculateEyePosition = (eyeIndex) => {
//     const eyeEl = document.getElementById(`eye-${eyeIndex}`);
//     if (!eyeEl) return { x: 0, y: 0 };

//     const eyeRect = eyeEl.getBoundingClientRect();
//     const eyeCenterX = eyeRect.left + eyeRect.width / 2;
//     const eyeCenterY = eyeRect.top + eyeRect.height / 2;

//     const angle = Math.atan2(mousePosition.y - eyeCenterY, mousePosition.x - eyeCenterX);
//     const distance = Math.min(eyeRect.width / 8, 5);

//     return {
//       x: Math.cos(angle) * distance,
//       y: Math.sin(angle) * distance,
//     };
//   };

//   return (
//     <div className="relative h-screen bg-gray-100 overflow-hidden">
//       <div className="container mx-auto px-4 h-full flex flex-col justify-center items-start">
//         <motion.h1 
//           className="text-6xl md:text-8xl font-bold text-gray-900 mb-6"
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8 }}
//         >
//           Vision<br />Perfected
//         </motion.h1>
        
//         <motion.p 
//           className="text-xl md:text-2xl text-gray-700 mb-8 max-w-md"
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8, delay: 0.2 }}
//         >
//           Experience clarity like never before with our cutting-edge eye care technology and expert team.
//         </motion.p>

//         <motion.button 
//           className="bg-blue-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-blue-700 transition-colors duration-300"
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8, delay: 0.4 }}
//           whileHover={{ scale: 1.05 }}
//           whileTap={{ scale: 0.95 }}
//         >
//           Schedule an Exam
//         </motion.button>
//       </div>

//       {/* Animated eye illustration */}
//       <div className="absolute right-10 top-1/2 transform -translate-y-1/2 w-96 h-96">
//         <svg viewBox="0 0 200 100" className="w-full h-full">
//           <motion.path
//             d="M10,50 Q50,10 100,50 Q150,90 190,50"
//             fill="none"
//             stroke="#4A5568"
//             strokeWidth="4"
//             initial={{ pathLength: 0 }}
//             animate={{ pathLength: 1 }}
//             transition={{ duration: 2, ease: "easeInOut" }}
//           />
//           <g id="eye-1" className="eye">
//             <circle cx="100" cy="50" r="30" fill="white" stroke="#4A5568" strokeWidth="4" />
//             <motion.circle 
//               cx="100" 
//               cy="50" 
//               r="15" 
//               fill="#2B6CB0"
//               animate={calculateEyePosition(1)}
//             />
//           </g>
//         </svg>
//       </div>

//       {/* Abstract shapes */}
//       <motion.div 
//         className="absolute left-10 bottom-10 w-20 h-20 bg-blue-200 rounded-full"
//         animate={{
//           scale: [1, 1.2, 1],
//           rotate: [0, 180, 360],
//         }}
//         transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
//       />
//       <motion.div 
//         className="absolute right-40 top-20 w-16 h-16 bg-gray-300 rounded-lg"
//         animate={{
//           y: [0, -20, 0],
//           rotate: [0, 45, 0],
//         }}
//         transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
//       />
//     </div>
//   );
// };

// export default Hero;