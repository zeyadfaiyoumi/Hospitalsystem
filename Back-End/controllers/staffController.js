const db = require("../config/db");

const getStaffSchedule = async (req, res) => {
  try {
    const doctorId = req.user;
    const schedule = await db.query(
      `SELECT * FROM staff_schedules WHERE doctor_id = $1`,
      [doctorId]
    );
    res.json(schedule.rows);
  } catch (error) {
    console.error("Error getting staff schedule:", error);
    res.status(500).json({ message: "Error getting staff schedule" });
  }
};

const deleteStaffSchedule = async (req, res) => {
  try {
    const scheduleId = req.params.id;
    await db.query(`DELETE FROM staff_schedules WHERE schedule_id = $1`, [
      scheduleId,
    ]);
    res.json({ message: "Schedule deleted" });
  } catch (error) {
    console.error("Error deleting staff schedule:", error);
    res.status(500).json({ message: "Error deleting staff schedule" });
  }
};

const addStaffSchedule = async (req, res) => {
  try {
    const doctorId = req.user;
    const { startTime, endTime } = req.body;
    console.log(startTime, endTime);
    const schedule = await db.query(
      `INSERT INTO staff_schedules (doctor_id, start_time, end_time) VALUES ($1, $2, $3) RETURNING *`,
      [doctorId, startTime, endTime]
    );
    res.json(schedule.rows);
  } catch (error) {
    console.error("Error adding staff schedule:", error);
    res.status(500).json({ message: "Error adding staff schedule" });
  }
};

module.exports = { getStaffSchedule, deleteStaffSchedule, addStaffSchedule };
