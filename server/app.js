const express = require("express");
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const appointmentRoutes = require("./routes/appointment");

const app = express();

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/appointments", appointmentRoutes);

module.exports = app;
