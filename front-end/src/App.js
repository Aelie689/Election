import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import CandidateInfo from "./pages/Candidate_Info"; // เพจของคุณ
import TestPage from "./pages/TestPage"; // สมมติว่าเพื่อนคุณมีเพจ Test
import { Button } from "@mui/material";
import "./App.css";
import Map from "./components/Map";

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          {/* เพิ่มลิงก์สำหรับการนำทาง */}
          <nav>
            <Link to="/candidate-info" style={{ margin: '0 10px' }}>Candidate Information</Link>
            <Link to="/test-page" style={{ margin: '0 10px' }}>Test Page</Link>
          </nav>

          <Routes>
            {/* กำหนดเส้นทางไปยังแต่ละหน้า */}
            <Route path="/candidate-info" element={<CandidateInfo />} />
            <Route path="/test-page" element={<TestPage />} />
          </Routes>
        </header>
        <Map />
      </div>
    </Router>
  );
}

export default App;
