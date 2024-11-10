import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { Button } from "@mui/material";
// import "./App.css";
import { UserProvider } from "./context/UserContext";
import { AuthProvider } from "./context/AuthContext";
import NavBar from "./components/NavBar";
import CandidateInfo from "./pages/CandidatePage"; 
import LogIn from "./pages/LoginPage";
import LandingPage from "./pages/LandingPage";
import ComparePage from "./pages/ComparePage";

function App() {
  return (
    <AuthProvider>
      <Router>
        <UserProvider>
          <div>
            <NavBar />
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<LogIn />} />
              <Route path="/candidate-info" element={<CandidateInfo />} />
              <Route path="/history" element={<ComparePage />} />
            </Routes>
          </div>
        </UserProvider>
      </Router>
    </AuthProvider>
  );
}

export default App;
