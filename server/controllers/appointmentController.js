const User = require("../models/User");
const Appointment = require("../models/Appointment");

exports.bookAppointment = async (req, res) => {
  try {
    if (req.user.role !== "patient") {
      return res
        .status(403)
        .json({ message: "Only patients can book appointments" });
    }
    const { provider, appointmentDate, reason } = req.body;
    const providerUser = await User.findOne({
      _id: provider,
      role: "provider",
    });

    if (!providerUser) {
      return res.status(404).json({ message: "Provider not found" });
    }

    const newAppointment = await Appointment.create({
      patient: req.user._id,
      provider: providerUser._id,
      appointmentDate,
      reason,
    });

    res.status(201).json({
      message: "Appointment booked",
      appointment: newAppointment,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to book appointment",
      error: error.message,
    });
  }
};

exports.getMyAppointments = async (req, res) => {
  try {
    let filter = {};

    if (req.user.role === "patient") {
      filter = { patient: req.user._id };
    } else if (req.user.role === "provider") {
      filter = { provider: req.user._id };
    } else {
      return res.status(403).json({ message: "Access denied" });
    }

    const appointments = await Appointment.find(filter)
      .populate("patient", "name email")
      .populate("provider", "name email")
      .sort({ appointmentDate: 1 });

    res.json(appointments);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching appointments", error: error.message });
  }
};

exports.getAllAppointments = async (req, res) => {
  try {
    if (req.user.role !== "provider") {
      return res.status(403).json({ message: "Access denied" });
    }

    const appointments = await Appointment.find().populate(
      "patient",
      "name email"
    );
    res.json(appointments);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching appointments", error: error.message });
  }
};
