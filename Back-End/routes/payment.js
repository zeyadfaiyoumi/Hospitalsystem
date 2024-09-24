const express = require("express");
const auth = require("../middlewares/authMiddleware");
const router = express.Router();
const paymentController = require("../controllers/paymentController");
router.post("/pay", auth, paymentController.createPaymentIntent);
module.exports = router;
