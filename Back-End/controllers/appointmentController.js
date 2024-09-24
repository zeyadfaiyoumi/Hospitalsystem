const pool = require("../config/db");

// Get all doctors
const getAllDoctors = async (req, res) => {
  try {
    const doctors = await pool.query(
      "SELECT * FROM users WHERE role = 'doctor'"
    );
    res.status(200).json(doctors.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server error" });
  }
};

// Get doctor by ID
const getDoctorById = async (req, res) => {
  const { id } = req.params; // Extract ID from request parameters
  try {
    const doctor = await pool.query(
      "SELECT * FROM users WHERE user_id = $1 AND role = 'doctor'",
      [id]
    );

    if (doctor.rows.length === 0) {
      return res.status(404).json({ error: "Doctor not found" });
    }

    res.status(200).json(doctor.rows[0]); // Return the first (and should be only) doctor found
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server error" });
  }
};

const getAllAppointments = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM appointments");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get appointment by ID
const getAppointmentById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      "SELECT * FROM appointments WHERE appointment_id = $1",
      [id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Appointment not found" });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Create a new appointment
const createAppointment = async (req, res) => {
  const {
    doctor_id,
    appointment_start,
    appointment_end,
    booking_status,
    status,
    notes,
  } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO appointments (doctor_id, appointment_start, appointment_end, booking_status, status, notes) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
      [
        doctor_id,
        appointment_start,
        appointment_end,
        booking_status,
        status,
        notes,
      ]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Update an appointment
const updateAppointment = async (req, res) => {
  const { id } = req.params;
  const {
    doctor_id,
    appointment_start,
    appointment_end,
    booking_status,
    status,
    notes,
  } = req.body;
  try {
    const result = await pool.query(
      "UPDATE appointments SET doctor_id = $1, appointment_start = $2, appointment_end = $3, booking_status = $4, status = $5, notes = $6 WHERE appointment_id = $7 RETURNING *",
      [
        doctor_id,
        appointment_start,
        appointment_end,
        booking_status,
        status,
        notes,
        id,
      ]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Appointment not found" });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Delete an appointment
const deleteAppointment = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      "DELETE FROM appointments WHERE appointment_id = $1 RETURNING *",
      [id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Appointment not found" });
    }
    res.json({ message: "Appointment deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

//   const getAppointmentsByDoctorId = async (req, res) => {
//     const doctorId = parseInt(req.params.doctorId, 10);

//     if (isNaN(doctorId)) {
//       return res.status(400).json({ message: 'Invalid doctor ID' });
//     }

//     try {
//       // Query to fetch appointments for the specific doctor
//       const result = await pool.query(`
//         SELECT
//             appointment_id,
//             appointment_start,
//             appointment_end,
//             booking_status,
//             status AS appointment_status,
//             notes
//         FROM
//             appointments
//         WHERE
//             doctor_id = $1
//         ORDER BY
//             appointment_start;
//       `, [doctorId]);

//       // Check if any appointments were found
//       if (result.rows.length === 0) {
//         return res.status(404).json({ message: 'No appointments found for this doctor' });
//       }

//       // Respond with the list of appointments
//       res.json(result.rows);
//     } catch (error) {
//       console.error('Error fetching appointments for doctor:', error);
//       res.status(500).send('Internal Server Error');
//     }
//   };

const getAppointmentsByDoctorId = async (req, res) => {
  const doctorId = parseInt(req.params.doctorId, 10);

  if (isNaN(doctorId)) {
    return res.status(400).json({ message: "Invalid doctor ID" });
  }

  try {
    // Query to fetch appointments for the specific doctor
    const result = await pool.query(
      `
            SELECT
                appointment_id,
                appointment_start,
                appointment_end,
                booking_status,
                status AS appointment_status,
                notes
            FROM
                appointments
            WHERE
                doctor_id = $1
            ORDER BY
                appointment_start;
        `,
      [doctorId]
    );

    console.log("Query Result:", result.rows); // Add this line to debug

    // Check if any appointments were found
    if (result.rows.length === 0) {
      return res
        .status(404)
        .json({ message: "No appointments found for this doctor" });
    }

    // Respond with the list of appointments
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching appointments for doctor:", error);
    res.status(500).send("Internal Server Error");
  }
};
const getallAppointmentswithDoctorsAndUsers = async (req, res) => {
  try {
    const doctor_id = req.user;
    const appointments = await pool.query(
      `SELECT * FROM appointments 
   JOIN users AS patients ON appointments.patient_id = patients.user_id 
   WHERE appointments.doctor_id = $1 AND appointments.status = 'scheduled'`,
      [doctor_id]
    );
    res.json(appointments.rows);
  } catch (error) {
    console.error("Error getting appointments:", error);
    res.status(500).json({ message: "Error getting appointments" });
  }
};

const getDoctorAppointments = async (req, res) => {
  const doctorId = req.params.doctorId;

  try {
    const result = await pool.query(
      "SELECT * FROM staff_schedules WHERE doctor_id = $1 ORDER BY start_time ASC",
      [doctorId]
    );
    res.status(200).json(result.rows);
  } catch (err) {
    console.error("Error fetching appointments:", err);
    res.status(500).json({ error: "Database query error" });
  }
};

const changeAppiontmentStatus = async (req, res) => {
  const { appointment_id, status } = req.body;
  try {
    const result = await pool.query(
      "UPDATE appointments SET status = $1 WHERE appointment_id = $2 RETURNING *",
      [status, appointment_id]
    );
    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  getAllDoctors,
  getDoctorById,
  getAllAppointments,
  getAppointmentById,
  createAppointment,
  updateAppointment,
  deleteAppointment,
  getAppointmentsByDoctorId,
  getallAppointmentswithDoctorsAndUsers,
  getDoctorAppointments,
  changeAppiontmentStatus,
};
