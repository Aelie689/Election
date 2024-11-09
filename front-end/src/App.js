import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { Button } from "@mui/material";
// import "./App.css";
import { UserProvider } from "./context/UserContext";
import { AuthProvider } from "./context/AuthContext";
import NavBar from "./components/NavBar";
import MainPage from "./pages/MainPage";
import CandidateInfo from "./pages/Candidate_Info"; 
import LogIn from "./pages/LoginPage";

function App() {
  return (
    <AuthProvider>
      <Router>
        <UserProvider>
          <div>
            <NavBar />
            <Routes>
              <Route path="/" element={<MainPage />} />
              <Route path="/login" element={<LogIn />} />
              <Route path="/candidate-info" element={<CandidateInfo />} />
            </Routes>
          </div>
        </UserProvider>
      </Router>
    </AuthProvider>
  );
}

export default App;
