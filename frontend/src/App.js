import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import ReportIssue from "./pages/ReportIssue";
import TrackIssues from "./pages/TrackIssues";
import About from "./pages/About";
import Login from "./pages/Login"; // Add Login import
import Signup from "./pages/Signup"; // Add Signup import
import { AuthProvider } from "./context/AuthContext";
import AdminDashboard from "./pages/AdminDashboard";
import MyReports from "./pages/MyReports";
import NotFound from "./pages/NotFound";
// Remove bootstrap import if no longer needed anywhere
// import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/report" element={<ReportIssue />} />
          <Route path="/track" element={<TrackIssues />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} /> {/* Add Login route */}
          <Route path="/signup" element={<Signup />} /> {/* Add Signup route */}
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/myreports" element={<MyReports />} /> {/* Add MyReports route */}
          <Route path="*" element={<NotFound />} /> {/* Catch-all route for 404 */}
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
