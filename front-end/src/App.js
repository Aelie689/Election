import React from "react";
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import { UserProvider } from "./context/UserContext";
import { AuthProvider } from "./context/AuthContext";
import NavBar from "./components/NavBar";
import ResultSubmissionPage from "./pages/ResultSubimissionPage";
import CandidateInfo from "./pages/CandidatePage";
import LogIn from "./pages/LoginPage";
import LandingPage from "./pages/LandingPage";
import ComparePage from "./pages/ComparePage";
import HistoricalPage from "./pages/HistoricalPage";
import PrivateRoute from "./components/PrivateRoute";

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
              <Route path="/history" element={<HistoricalPage />} />
              <Route path="/compare-history" element={<ComparePage />} />
              <Route
                path="/result-submission"
                element={
                  <PrivateRoute>
                    <ResultSubmissionPage />
                  </PrivateRoute>
                }
              />
            </Routes>
          </div>
        </UserProvider>
      </Router>
    </AuthProvider>
  );
}

export default App;