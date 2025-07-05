import { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  Box,
  CircularProgress,
} from "@mui/material";
import axios from "axios";
import Navbar from "../components/NavBar";

const DoctorDashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = JSON.parse(localStorage.getItem("user"));

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
    fetchAppointments();
  }, []);

  return (
    <>
      <Navbar />
      <Container>
        <Box sx={{ mt: 4, mb: 2 }}>
          <Typography variant="h4" gutterBottom>
            Welcome, Dr. {user?.name || "Doctor"}
          </Typography>
        </Box>

        <Typography variant="h5" sx={{ mt: 4, mb: 2 }}>
          Scheduled Appointments
        </Typography>

        {loading ? (
          <CircularProgress />
        ) : appointments.length === 0 ? (
          <Typography>No appointments scheduled yet.</Typography>
        ) : (
          <Grid container spacing={2}>
            {appointments.map((appt, idx) => (
              <Grid item xs={12} sm={6} md={3} key={idx}>
                <Card>
                  <CardContent>
                    <Typography variant="subtitle1">
                      Patient: {appt?.patient?.name || "N/A"}
                    </Typography>
                    <Typography variant="subtitle2">
                      Date:{" "}
                      {new Date(appt?.appointmentDate).toLocaleDateString()}
                    </Typography>
                    <Typography variant="subtitle2">
                      Time:{" "}
                      {new Date(appt?.appointmentDate).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </Typography>
                    <Typography color="textSecondary">
                      Reason: {appt?.reason || "N/A"}
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

export default DoctorDashboard;
