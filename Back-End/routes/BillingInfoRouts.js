const express = require("express");
const router = express.Router();
const BillingInfoController = require("../controllers/BillingInfoController");

const Auth = require("../middlewares/authMiddleware");

router.get("/Billing", Auth, BillingInfoController.getBillingInfo);

module.exports = router;
