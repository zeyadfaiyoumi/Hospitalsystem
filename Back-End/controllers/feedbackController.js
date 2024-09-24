const pool = require('../config/db');

// Create feedback
const createFeedback = async (req, res) => {
    const { doctor_id, rating, comment } = req.body; // Removed patient_id from body
    const patient_id = req.user; // Use userId from the authenticated request
    try {
        const result = await pool.query(
            'INSERT INTO feedback (patient_id, doctor_id, rating, comment) VALUES ($1, $2, $3, $4) RETURNING *',
            [patient_id, doctor_id, rating, comment]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Error creating feedback:', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
};
// Get all feedback
const getFeedback = async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT f.*, u.name AS patient_name
            FROM feedback f
            JOIN users u ON f.patient_id = u.user_id
        `);
        res.status(200).json(result.rows);
    } catch (error) {
        console.error('Error fetching feedback:', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Get feedback by doctor ID
const getFeedbackByDoctorId = async (req, res) => {
    const { doctorId } = req.params; // Extract doctor ID from request parameters
    try {
        const result = await pool.query(`
            SELECT f.*, u.name AS patient_name
            FROM feedback f
            JOIN users u ON f.patient_id = u.user_id
            WHERE f.doctor_id = $1
        `, [doctorId]);

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'No feedback found for this doctor' });
        }

        res.status(200).json(result.rows); // Return all feedback found for the doctor
    } catch (error) {
        console.error('Error fetching feedback:', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
};


// Export the controller functions
module.exports = {
    createFeedback,
    getFeedback,
    getFeedbackByDoctorId
};
