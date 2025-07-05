import { useState, useEffect } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Alert,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  CircularProgress,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import Navbar from "../components/NavBar";

const BookAppointment = () => {
  const navigate = useNavigate();
  const [appointmentDate, setAppointmentDate] = useState("");
  const [reason, setReason] = useState("");
  const [providerId, setProviderId] = useState("");
  const [providers, setProviders] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [touched, setTouched] = useState(false);
  const [dateError, setDateError] = useState(false);

  const handleChange = (newValue) => {
    setTouched(true);
    if (!newValue || !dayjs(newValue).isValid()) {
      setDateError(true);
    } else {
      setDateError(false);
      setAppointmentDate(newValue.toISOString());
    }
  };

  useEffect(() => {
    const fetchProviders = async () => {
      try {
        const res = await axios.get("/api/users/providers");
        const providersOnly = res.data.filter(
          (user) => user.role === "provider"
        );
        setProviders(providersOnly);
      } catch (err) {
        console.error("Failed to fetch Doctors", err);
        setError("Unable to load Doctors");
      }
    };

    fetchProviders();
  }, []);

  const handleSubmit = async () => {
    setError("");
    setSuccess("");

    if (!appointmentDate || !reason || !providerId) {
      setError("All fields are required");
      return;
    }

    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      await axios.post(
        "/api/appointments/book",
        {
          provider: providerId,
          appointmentDate,
          reason,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSuccess("Appointment booked successfully!");
      setTimeout(() => navigate("/patient-dashboard"), 1500);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to book appointment.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <Container maxWidth="sm">
        <Box sx={{ mt: 8 }}>
          <Typography variant="h4" gutterBottom>
            Book an Appointment
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}
          {success && (
            <Alert severity="success" sx={{ mb: 2 }}>
              {success}
            </Alert>
          )}

          <FormControl fullWidth margin="normal">
            <InputLabel>Doctor</InputLabel>
            <Select
              value={providerId}
              label="Doctor"
              onChange={(e) => setProviderId(e.target.value)}
            >
              {providers.length === 0 ? (
                <MenuItem disabled>Loading...</MenuItem>
              ) : (
                providers.map((provider) => (
                  <MenuItem key={provider._id} value={provider._id}>
                    {provider.name}
                  </MenuItem>
                ))
              )}
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker
                label="Appointment Date & Time"
                value={appointmentDate ? dayjs(appointmentDate) : null}
                onChange={handleChange}
                onError={() => {
                  if (touched) setDateError(true);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    fullWidth
                    error={touched && dateError}
                    helperText={
                      touched && dateError
                        ? "Please select a valid date and time"
                        : ""
                    }
                    onBlur={() => setTouched(true)}
                  />
                )}
              />
            </LocalizationProvider>
          </FormControl>

          <TextField
            label="Reason"
            fullWidth
            margin="normal"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
          />

          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Submit"
            )}
          </Button>
        </Box>
      </Container>
    </>
  );
};

export default BookAppointment;
