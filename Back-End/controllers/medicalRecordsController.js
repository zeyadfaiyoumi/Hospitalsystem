const db = require("../config/db");

const addMedicalRecord = async (req, res) => {
  try {
    const { patient_id, doctor_id, diagnosis, treatment, prescription } =
      req.body;
    const newMedicalRecord = await db.query(
      `
      INSERT INTO medical_records (patient_id, doctor_id, diagnosis, treatment, prescription)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *`,
      [patient_id, doctor_id, diagnosis, treatment, prescription]
    );
    res.status(201).json(newMedicalRecord.rows[0]);
  } catch (err) {
    console.error("Error adding medical record:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getMedicalRecords = async (req, res) => {
  try {
    const doctor_id = req.user;
    console.log(doctor_id);
    const medicalRecords = await db.query(
      "SELECT * FROM medical_records JOIN users on medical_records.patient_id = users.user_id where doctor_id = $1",
      [doctor_id]
    );
    res.status(200).json(medicalRecords.rows);
  } catch (err) {
    console.error("Error getting medical records:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

const deleteMedicalRecord = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedMedicalRecord = await db.query(
      "DELETE FROM medical_records WHERE record_id = $1 RETURNING *",
      [id]
    );
    res.status(200).json(deletedMedicalRecord.rows[0]);
  } catch (err) {
    console.error("Error deleting medical record:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

const editMedicalRecord = async (req, res) => {
  try {
    const { record_id, diagnosis, treatment, prescription } = req.body;
    const editedMedicalRecord = await db.query(
      "UPDATE medical_records SET diagnosis = $1, treatment = $2, prescription = $3 WHERE record_id = $4 RETURNING *",
      [diagnosis, treatment, prescription, record_id]
    );
    res.status(200).json(editedMedicalRecord.rows[0]);
  } catch (err) {
    console.error("Error editing medical record:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  addMedicalRecord,
  getMedicalRecords,
  deleteMedicalRecord,
  editMedicalRecord,
};
