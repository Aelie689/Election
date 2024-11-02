import React, { useState, useEffect } from "react";
import {
  Typography,
  Grid,
  Card,
  CardContent,
  ToggleButton,
  ToggleButtonGroup,
  TextField
} from "@mui/material";
import Papa from "papaparse";

// Function to generate a random color from a predefined set of colors
const getRandomColor = () => {
  const colors = ['#001B95', '#ED2728', '#F47931']; // Blue, Red, and Orange
  return colors[Math.floor(Math.random() * colors.length)];
};

const CandidateInfo = () => {
  const [candidates, setCandidates] = useState([]);
  const [type, setType] = useState("Constituency");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredCandidates, setFilteredCandidates] = useState([]);

  const loadCSVData = (url, setData) => {
    Papa.parse(url, {
      download: true,
      header: true,
      complete: (result) => {
        setData(result.data);
      },
    });
  };

  const handleTypeChange = (event, newType) => {
    if (newType !== null) {
      setType(newType);
      setSearchQuery(""); // Clear search query when switching types
    }
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Filter candidates based on search query
  useEffect(() => {
    setFilteredCandidates(
      candidates.filter((candidate) =>
        candidate["ชื่อผู้สมัคร"]?.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [searchQuery, candidates]);

  // Load CSV data based on type
  useEffect(() => {
    if (type === "Constituency") {
      loadCSVData(process.env.PUBLIC_URL + "/fileField/Constituency66.csv", setCandidates);
    } else {
      loadCSVData(process.env.PUBLIC_URL + "/fileField/Party66.csv", setCandidates);
    }
  }, [type]);

  return (
    <div style={{ backgroundColor: "#ffffff", minHeight: "100vh", padding: "20px" }}>
      <div style={{ backgroundColor: "#000000", padding: "20px", borderRadius: "5px", marginBottom: "20px" }}>
        <Typography variant="h4" gutterBottom style={{ color: "#ffffff", textAlign: "center" }}>
          Thailand Election Insight
        </Typography>
      </div>

      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "10px", marginBottom: "20px" }}>
        <TextField
          label="Search by Name"
          variant="outlined"
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <ToggleButtonGroup
          color="primary"
          value={type}
          exclusive
          onChange={handleTypeChange}
          aria-label="Candidate Type"
        >
          <ToggleButton value="Constituency">Constituency</ToggleButton>
          <ToggleButton value="Party-list">Party-list</ToggleButton>
        </ToggleButtonGroup>
      </div>

      <Grid container spacing={2} justifyContent="center">
        {filteredCandidates.map((candidate, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card
              style={{
                backgroundColor: getRandomColor(), // Apply random color from blue, red, orange
                borderRadius: '10px',
                color: '#ffffff',
                padding: '10px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                margin: '10px'
              }}
            >
              <CardContent>
                {type === "Constituency" ? (
                  <>
                    <Typography variant="body1">ชื่อผู้สมัคร: {candidate["ชื่อผู้สมัคร"]}</Typography>
                    <Typography variant="body2">พรรค: {candidate["พรรค"]}</Typography>
                    <Typography variant="body2">จังหวัด: {candidate["จังหวัด"]}</Typography>
                    <Typography variant="body2">เขต: {candidate["เขต"]}</Typography>
                    <Typography variant="body2">หมายเลข: {candidate["หมายเลข"]}</Typography>
                    <Typography variant="body2">วุฒิการศึกษา: {candidate["วุฒิการศึกษา"]}</Typography>
                    <Typography variant="body2">เพศ: {candidate["เพศ"]}</Typography>
                    <Typography variant="body2">ช่วงอายุ: {candidate["ช่วงอายุ"]}</Typography>
                    <Typography variant="body2">อาชีพ: {candidate["อาชีพ"]}</Typography>
                  </>
                ) : (
                  <>
                    <Typography variant="body1">ชื่อผู้สมัคร: {candidate["ชื่อผู้สมัคร"]}</Typography>
                    <Typography variant="body2">พรรค: {candidate["พรรค"]}</Typography>
                    <Typography variant="body2">หมายเลข: {candidate["หมายเลข"]}</Typography>
                    <Typography variant="body2">ลำดับในบัญชี: {candidate["ลำดับในบัญชี"]}</Typography>
                    <Typography variant="body2">การศึกษาสูงสุด: {candidate["การศึกษาสูงสุด"]}</Typography>
                    <Typography variant="body2">เพศ: {candidate["เพศ"]}</Typography>
                    <Typography variant="body2">ช่วงอายุ: {candidate["ช่วงอายุ"]}</Typography>
                    <Typography variant="body2">อาชีพ: {candidate["อาชีพ"]}</Typography>
                  </>
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default CandidateInfo;
