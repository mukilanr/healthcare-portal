import { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  MenuItem,
  Alert,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "patient", // default
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
    setSuccess("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic client-side validation
    if (!form.name || !form.email || !form.password || !form.confirmPassword) {
      setError("All fields are required.");
      return;
    }

    if (form.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      await axios.post("/api/auth/register", {
        name: form.name,
        email: form.email,
        password: form.password,
        role: form.role,
      });

      setSuccess("Registration successful. Redirecting to login...");
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 6 }}>
        <Typography variant="h4" gutterBottom>
          Register
        </Typography>

        {error && <Alert severity="error">{error}</Alert>}
        {success && <Alert severity="success">{success}</Alert>}

        <form onSubmit={handleSubmit}>
          <TextField
            label="Full Name"
            name="name"
            value={form.name}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Email"
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Password"
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Confirm Password"
            type="password"
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            select
            label="Register as"
            name="role"
            value={form.role}
            onChange={handleChange}
            fullWidth
            margin="normal"
          >
            <MenuItem value="patient">Patient</MenuItem>
            <MenuItem value="provider">Healthcare Provider</MenuItem>
          </TextField>

          <Button
            type="submit"
            variant="contained"
            fullWidth
            color="primary"
            sx={{ mt: 2 }}
          >
            Register
          </Button>
        </form>
        <Button
          variant="text"
          fullWidth
          sx={{ mt: 2 }}
          onClick={() => navigate("/login")}
        >
          Existing User? Login
        </Button>
      </Box>
    </Container>
  );
};

export default Register;
