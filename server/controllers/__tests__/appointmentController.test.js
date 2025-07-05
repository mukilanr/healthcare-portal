const {
  bookAppointment,
  getMyAppointments,
} = require("../appointmentController");

const User = require("../../models/User");
const Appointment = require("../../models/Appointment");

jest.mock("../../models/User");
jest.mock("../../models/Appointment");

const mockRes = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe("Appointment Controller", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("bookAppointment", () => {
    it("should book an appointment for a patient", async () => {
      const req = {
        user: { _id: "patient1", role: "patient" },
        body: {
          provider: "provider1",
          appointmentDate: "2025-08-01",
          reason: "Headache",
        },
      };
      const res = mockRes();

      User.findOne.mockResolvedValue({ _id: "provider1", role: "provider" });
      Appointment.create.mockResolvedValue({ _id: "appt123" });

      await bookAppointment(req, res);

      expect(User.findOne).toHaveBeenCalledWith({
        _id: "provider1",
        role: "provider",
      });
      expect(Appointment.create).toHaveBeenCalledWith({
        patient: "patient1",
        provider: "provider1",
        appointmentDate: "2025-08-01",
        reason: "Headache",
      });
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        message: "Appointment booked",
        appointment: { _id: "appt123" },
      });
    });

    it("should not allow non-patients to book", async () => {
      const req = { user: { role: "provider" }, body: {} };
      const res = mockRes();

      await bookAppointment(req, res);

      expect(res.status).toHaveBeenCalledWith(403);
      expect(res.json).toHaveBeenCalledWith({
        message: "Only patients can book appointments",
      });
    });

    it("should return 404 if provider is not found", async () => {
      const req = {
        user: { _id: "patient1", role: "patient" },
        body: { provider: "missingProvider" },
      };
      const res = mockRes();

      User.findOne.mockResolvedValue(null);

      await bookAppointment(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: "Provider not found" });
    });
  });

  describe("getMyAppointments", () => {
    it("should return patient appointments", async () => {
      const req = { user: { _id: "p1", role: "patient" } };
      const res = mockRes();

      Appointment.find.mockReturnValue({
        populate: jest.fn().mockReturnThis(),
        populate: jest.fn().mockReturnThis(),
        sort: jest.fn().mockResolvedValue(["appt1", "appt2"]),
      });

      await getMyAppointments(req, res);

      expect(Appointment.find).toHaveBeenCalledWith({ patient: "p1" });
      expect(res.json).toHaveBeenCalledWith(["appt1", "appt2"]);
    });

    it("should return provider appointments", async () => {
      const req = { user: { _id: "pr1", role: "provider" } };
      const res = mockRes();

      Appointment.find.mockReturnValue({
        populate: jest.fn().mockReturnThis(),
        populate: jest.fn().mockReturnThis(),
        sort: jest.fn().mockResolvedValue(["appt3"]),
      });

      await getMyAppointments(req, res);

      expect(Appointment.find).toHaveBeenCalledWith({ provider: "pr1" });
      expect(res.json).toHaveBeenCalledWith(["appt3"]);
    });

    it("should return 403 for unauthorized roles", async () => {
      const req = { user: { _id: "x", role: "admin" } };
      const res = mockRes();

      await getMyAppointments(req, res);

      expect(res.status).toHaveBeenCalledWith(403);
      expect(res.json).toHaveBeenCalledWith({ message: "Access denied" });
    });
  });
});
