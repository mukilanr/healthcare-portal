const express = require("express");
const router = express.Router();
const {
  bookAppointment,
  getMyAppointments,
  getAllAppointments,
} = require("../controllers/appointmentController");

const authMiddleware = require("../middleware/authMiddleware");

router.post("/book", authMiddleware, bookAppointment);
router.get("/my", authMiddleware, getMyAppointments);
router.get("/all", authMiddleware, getAllAppointments); // Providers only

module.exports = router;
