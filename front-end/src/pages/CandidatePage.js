import React, { useState, useEffect } from "react";
import {
  Typography,
  Grid,
  Card,
  CardContent,
  ToggleButton,
  ToggleButtonGroup,
  TextField,
  Button,
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
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const limit = 33; // จำนวนข้อมูลต่อหน้า

  const handleTypeChange = (event, newType) => {
    if (newType !== null) {
      setType(newType);
      setSearchQuery("");
      setCurrentPage(1); // Reset page to 1 when changing type
    }
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1); // Reset page to 1 when searching
  };

  // Fetch data from API
  useEffect(() => {
    axios
      .get("http://g01-LBC-1208421005.us-east-1.elb.amazonaws.com:8800/candidates", {
        params: { limit, offset: (currentPage - 1) * limit, type },
      })
      .then((response) => {
        const { data, totalItems } = response.data;
        setCandidates(data);

        // คำนวณจำนวนหน้าทั้งหมด
        setTotalPages(Math.ceil(totalItems / limit));
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, [currentPage, type]);

  // Filter candidates based on search query
  useEffect(() => {
    setFilteredCandidates(
      candidates.filter((candidate) =>
        candidate.name?.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [searchQuery, candidates]);

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

      {/* Sticky search and filter bar */}
      <div
        style={{
          position: "sticky",
          top: 0,
          zIndex: 1000,
          backgroundColor: "#ffffff",
          padding: "10px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
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
                <Typography variant="body1" style={{ fontWeight: "bold" }}>
                  ชื่อผู้สมัคร:
                  <span style={{ fontWeight: "normal" }}> {candidate.name}</span>
                </Typography>
                <Typography variant="body1" style={{ fontWeight: "bold" }}>
                  หมายเลข:
                  <span style={{ fontWeight: "normal" }}>
                    {type === "Party-list" ? candidate.order : candidate.number}
                  </span>
                </Typography>
                <Typography variant="body1" style={{ fontWeight: "bold" }}>
                  พรรค:
                  <span style={{ fontWeight: "normal" }}>
                    {" "}
                    {candidate.party_name || "ไม่ระบุ"}
                  </span>
                </Typography>

                {type !== "Party-list" && (
                  <>
                    <Typography variant="body1" style={{ fontWeight: "bold" }}>
                      จังหวัด:
                      <span style={{ fontWeight: "normal" }}>
                        {" "}
                        {candidate.province_name || "ไม่ระบุ"}
                      </span>
                    </Typography>
                    <Typography variant="body1" style={{ fontWeight: "bold" }}>
                      เขต:
                      <span style={{ fontWeight: "normal" }}> {candidate.district}</span>
                    </Typography>
                  </>
                )}

                <Typography variant="body1" style={{ fontWeight: "bold" }}>
                  วุฒิการศึกษา:
                  <span style={{ fontWeight: "normal" }}> {candidate.education}</span>
                </Typography>
                <Typography variant="body1" style={{ fontWeight: "bold" }}>
                  เพศ:
                  <span style={{ fontWeight: "normal" }}> {candidate.gender}</span>
                </Typography>
                <Typography variant="body1" style={{ fontWeight: "bold" }}>
                  ช่วงอายุ:
                  <span style={{ fontWeight: "normal" }}> {candidate.age}</span>
                </Typography>
                <Typography variant="body1" style={{ fontWeight: "bold" }}>
                  อาชีพ:
                  <span style={{ fontWeight: "normal" }}> {candidate.occupation}</span>
                </Typography>
              </CardContent>


            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Pagination Controls */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "20px",
        }}
      >
        <Button
          onClick={() => {
            setCurrentPage((prev) => Math.max(prev - 1, 1));
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          disabled={currentPage === 1}
        >
          Previous
        </Button>
        <Typography style={{ margin: "0 10px" }}>
          Page {currentPage} of {totalPages}
        </Typography>
        <Button
          onClick={() => {
            setCurrentPage((prev) => Math.min(prev + 1, totalPages));
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          disabled={currentPage === totalPages}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default CandidateInfo;
