const express = require('express');
const router = express.Router();
const addDoctorController = require('../controllers/addDoctorController');

router.post('/', addDoctorController.addDoctor);


module.exports = router;