// DoctorAppointments.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDoctorAppointments } from '../features/Doctors/doctorThunksA';

const DoctorAppointments = ({ doctorId }) => {
  const dispatch = useDispatch();

  const { data: appointments, status, error } = useSelector((state) => state.appointments);

  useEffect(() => {
    if (doctorId) {
      dispatch(fetchDoctorAppointments(doctorId));
    }
  }, [dispatch, doctorId]);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Doctor Appointments</h2>

      {status === 'loading' && <p className="text-gray-600">Loading appointments...</p>}
      {status === 'failed' && <p className="text-red-600">Error: {error}</p>}
      {status === 'succeeded' && appointments.length === 0 && (
        <p className="text-gray-600">No appointments found for this doctor.</p>
      )}
      {status === 'succeeded' && appointments.length > 0 && (
        <ul className="space-y-4">
          {appointments.map((appointment) => (
            <li key={appointment.id} className="bg-white p-4 rounded-lg shadow-md">
              <p>
                <span className="font-bold text-gray-700">Start Time:</span> {appointment.start_time}
              </p>
              <p>
                <span className="font-bold text-gray-700">End Time:</span> {appointment.end_time}
              </p>
              <p>
                <span className="font-bold text-gray-700">Patient Name:</span> {appointment.patient_name}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DoctorAppointments;