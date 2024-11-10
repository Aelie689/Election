import React, { useState, useEffect } from "react";
import {
  Typography,
  Grid,
  Card,
  CardContent,
  ToggleButton,
  ToggleButtonGroup,
  TextField,
} from "@mui/material";
import axios from "axios";

// Function to determine the background color based on the party color
const getBackgroundColor = (partyColor) => {
  return partyColor ? `#${partyColor}` : "#CCCCCC";
};

const CandidateInfo = () => {
  const [candidates, setCandidates] = useState([]);
  const [type, setType] = useState("Constituency");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredCandidates, setFilteredCandidates] = useState([]);

  const handleTypeChange = (event, newType) => {
    if (newType !== null) {
      setType(newType);
      setSearchQuery("");
    }
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Fetch data from API
  useEffect(() => {
    axios
      .get("http://localhost:8800/candidates")
      .then((response) => {
        const data = Array.isArray(response.data) ? response.data : [];
        setCandidates(data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  // Filter candidates based on search query and selected type
  useEffect(() => {
    setFilteredCandidates(
      candidates.filter((candidate) =>
        candidate.name?.toLowerCase().includes(searchQuery.toLowerCase()) &&
        candidate.type?.toLowerCase() === type.toLowerCase() // กรองข้อมูลตาม type
      )
    );
  }, [searchQuery, candidates, type]);

  return (
    <div
      style={{
        backgroundColor: "#ffffff",
        minHeight: "100vh",
        padding: "20px",
      }}
    >
      <div
        style={{
          backgroundColor: "#000000",
          padding: "20px",
          borderRadius: "5px",
          marginBottom: "20px",
        }}
      >
        <Typography
          variant="h4"
          gutterBottom
          style={{ color: "#ffffff", textAlign: "center" }}
        >
          Thailand Election Insight
        </Typography>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "10px",
          marginBottom: "20px",
        }}
      >
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
                backgroundColor: getBackgroundColor(candidate.party_color),
                borderRadius: "10px",
                color: "#ffffff",
                padding: "10px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                margin: "10px",
              }}
            >
              <CardContent>
                <Typography variant="body1">
                  ชื่อผู้สมัคร: {candidate.name}
                </Typography>
                <Typography variant="body2">
                  หมายเลข: {candidate.number}
                </Typography>
                <Typography variant="body2">
                  พรรค: {candidate.party_name || "ไม่ระบุ"}
                </Typography>
                <Typography variant="body2">
                  จังหวัด: {candidate.province_name || "ไม่ระบุ"}
                </Typography>
                <Typography variant="body2">
                  วุฒิการศึกษา: {candidate.education}
                </Typography>
                <Typography variant="body2">เพศ: {candidate.gender}</Typography>
                <Typography variant="body2">ช่วงอายุ: {candidate.age}</Typography>
                <Typography variant="body2">
                  อาชีพ: {candidate.occupation}
                </Typography>
                <Typography variant="body2">เขต: {candidate.district}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default CandidateInfo;
