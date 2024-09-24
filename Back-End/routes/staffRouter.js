const staffController = require("../controllers/staffController");
const express = require("express");
const router = express.Router();
const auth = require("../middlewares/authMiddleware");

router.get("/getStaffSchedule", auth, staffController.getStaffSchedule);
router.delete("/deleteStaffSchedule/:id", staffController.deleteStaffSchedule);
router.post("/addStaffSchedule", auth, staffController.addStaffSchedule);
module.exports = router;
