import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const AppointmentModal = ({ appointment, onClose, onSave }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    onClick={onClose}
  >
    <motion.div
      initial={{ scale: 0.9, y: 20 }}
      animate={{ scale: 1, y: 0 }}
      exit={{ scale: 0.9, y: 20 }}
      className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full"
      onClick={e => e.stopPropagation()}
    >
      <h2 className="text-2xl font-bold mb-4 text-teal-700">
        Edit Appointment
      </h2>
      <p>
        <strong>Patient:</strong> {appointment.patient}
      </p>
      <p>
        <strong>Date:</strong> {appointment.date}
      </p>
      <p>
        <strong>Time:</strong> {appointment.time}
      </p>
      <p>
        <strong>Reason:</strong> {appointment.reason}
      </p>
      <p>
        <strong>Status:</strong> {appointment.status}
      </p>
      <div className="mt-4 flex justify-end space-x-2">
        <Button
          onClick={onClose}
          variant="outline"
          className="border-teal-500 text-teal-500 hover:bg-teal-50"
        >
          Cancel
        </Button>
        <Button
          onClick={onSave}
          className="bg-teal-600 hover:bg-teal-700 text-white"
        >
          Save Changes
        </Button>
      </div>
    </motion.div>
  </motion.div>
);

export default AppointmentModal;
