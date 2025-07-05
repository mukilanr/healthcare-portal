import { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Card,
  CardContent,
  Button,
  Grid,
  Box,
  CircularProgress,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/NavBar";

const PatientDashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchAppointments = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("/api/appointments/my", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAppointments(res.data);
    } catch (error) {
      console.error("Error fetching appointments:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
    fetchAppointments();
  }, []);

  const handleBookClick = () => {
    navigate("/book-appointment");
  };

  return (
    <>
      <Navbar />
      <Container>
        <Box sx={{ mt: 4, mb: 2 }}>
          <Typography variant="h4" gutterBottom>
            {user ? `Welcome, ${user.name}` : "Welcome"}
          </Typography>
          <Button variant="contained" color="primary" onClick={handleBookClick}>
            Book New Appointment
          </Button>
        </Box>

        <Typography variant="h5" sx={{ mt: 4, mb: 2 }}>
          Upcoming Appointments
        </Typography>

        {loading ? (
          <CircularProgress />
        ) : appointments.length === 0 ? (
          <Typography>No upcoming appointments.</Typography>
        ) : (
          <Grid container spacing={2}>
            {appointments.map((appt, idx) => (
              <Grid item xs={12} sm={6} md={3} key={idx}>
                <Card>
                  <CardContent>
                    <Typography variant="subtitle1">
                      Date:{" "}
                      {new Date(appt.appointmentDate).toLocaleDateString()}
                    </Typography>
                    <Typography variant="subtitle2">
                      Time:{" "}
                      {new Date(appt.appointmentDate).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </Typography>
                    <Typography color="textSecondary">
                      Reason: {appt.reason || "N/A"}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </>
  );
};

export default PatientDashboard;
