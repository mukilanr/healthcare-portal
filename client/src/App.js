import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import PatientDashboard from "./pages/PatientDashboard";
import Register from "./pages/Register";
import BookAppointment from "./pages/BookAppointment";
import PrivateRoute from "./components/PrivateRoute";
import DoctorDashboard from "./pages/DoctorDashboard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/patient-dashboard"
          element={
            <PrivateRoute>
              <PatientDashboard />
            </PrivateRoute>
          }
        />

        <Route
          path="/book-appointment"
          element={
            <PrivateRoute>
              <BookAppointment />
            </PrivateRoute>
          }
        />

        <Route
          path="/doctor-dashboard"
          element={
            <PrivateRoute>
              <DoctorDashboard />
            </PrivateRoute>
          }
        />

        <Route path="*" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
