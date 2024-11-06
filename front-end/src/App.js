import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import CandidateInfo from "./pages/Candidate_Info"; // เพจของคุณ
import { Button } from "@mui/material";
// import "./App.css";
import LogIn from "./pages/LoginPage";
import { UserProvider } from "./context/UserContext";
import { AuthProvider } from "./context/AuthContext";
import NavBar from "./components/NavBar";
import MainPage from "./pages/MainPage";

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
              <Route path="/" element={<MainPage />} />
            </Routes>
          </div>
        </UserProvider>
      </Router>
    </AuthProvider>
  );
}

export default App;
