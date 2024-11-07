import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import CandidateInfo from "./pages/Candidate_Info"; // เพจของคุณ
import { Button } from "@mui/material";
// import "./App.css";
import Map from "./components/Map";
import LogIn from "./pages/LoginPage";
import { UserProvider } from "./context/UserContext";
import { AuthProvider } from "./context/AuthContext";
import NavBar from "./components/NavBar";

function App() {
  return (
    <AuthProvider>
      <Router>
        <UserProvider>
          <div>
            <NavBar />
            <Routes>
              <Route path="/candidate-info" element={<CandidateInfo />} />
              <Route path="/login" element={<LogIn />} />
            </Routes>
            <Map />
          </div>
        </UserProvider>
      </Router>
    </AuthProvider>
  );
}

export default App;
