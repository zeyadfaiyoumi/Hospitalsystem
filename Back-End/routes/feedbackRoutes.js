const express = require('express');
const router = express.Router();
const feedbackController = require('../controllers/feedbackController');
const auth =require("../middlewares/authMiddleware")
// Create feedback
router.post('/',auth, feedbackController.createFeedback);

// Get all feedback
router.get('/', feedbackController.getFeedback);

// Get feedback by doctor ID
router.get('/:doctorId',feedbackController.getFeedbackByDoctorId);

module.exports = router;
