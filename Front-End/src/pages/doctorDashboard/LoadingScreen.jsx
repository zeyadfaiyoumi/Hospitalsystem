import React from "react";
import { motion } from "framer-motion";

const LoadingScreen = () => (
  <div className="fixed inset-0 bg-gradient-to-br from-teal-500 to-teal-700 flex items-center justify-center z-50">
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="text-center"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="120"
        height="120"
        viewBox="0 0 100 100"
        className="mx-auto mb-4"
      >
        <motion.path
          d="M20,50 Q30,30 50,30 Q70,30 80,50 Q70,70 50,70 Q30,70 20,50"
          fill="none"
          stroke="#ffffff"
          strokeWidth="4"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.circle
          cx="50"
          cy="50"
          r="10"
          fill="#ffffff"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
        />
      </svg>
      <motion.h2
        className="text-3xl font-bold text-white mb-2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        MediConnect
      </motion.h2>
      <motion.p
        className="text-teal-100 text-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        Preparing your dashboard...
      </motion.p>
    </motion.div>
  </div>
);

export default LoadingScreen;
