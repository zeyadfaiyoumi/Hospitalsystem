const {
  addMedicalRecord,
  getMedicalRecords,
  deleteMedicalRecord,
  editMedicalRecord,
} = require("../controllers/medicalRecordsController");
const router = require("express").Router();
const auth = require("../middlewares/authMiddleware");

router.post("/add-medical-record", addMedicalRecord);
router.get("/get-medical-records", auth, getMedicalRecords);
router.delete("/delete-medical-record/:id", deleteMedicalRecord);
router.put("/edit-medical-record", editMedicalRecord);
module.exports = router;
