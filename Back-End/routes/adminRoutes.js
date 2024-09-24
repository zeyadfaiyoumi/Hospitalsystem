const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const auth = require("../middlewares/authMiddleware");

router.get('/getAdmin', auth,adminController.getAdmin);
router.get('/getPatient', adminController.getPatient);
router.get('/getDoctor', adminController.getDoctor);
router.get('/getContactMessages', adminController.getContactMessages);
router.put('/ReplyContactMessages/:id', adminController.ReplyContactMessages);
router.delete('/Ban/:id', adminController.BanPatient);
router.post('/LogOutAdmin', adminController.LogOutAdmin);

router.get('/Appointments', adminController.getAppointments);
router.put('/Appointments/:id', adminController.appointments);

module.exports = router;