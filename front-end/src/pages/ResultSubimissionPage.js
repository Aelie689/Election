import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Typography, Paper, Box, Button, Alert } from "@mui/material";
import Grid from "@mui/material/Grid2";
import ConsForm from "../components/ConsForm";
import PartyForm from "../components/PartyForm";

export default function ResultSubmissionPage() {
  const [consResults, setConsResults] = useState([]);
  const [partyResults, setPartyResults] = useState([]);
  const [successMessage, setSuccessMessage] = useState(false);
  const navigate = useNavigate();

  const handleSubmission = async () => {
    console.log("ConsResults:", consResults);
    console.log("PartyResults:", partyResults);
    
    if (consResults.length === 0 && partyResults.length === 0) {
      return;
    }
    if (consResults.length > 0) {
      try {
        const response = await fetch("http://54.89.150.78:8800/result-submit-constituency", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(consResults),
        });
  
        if (response.ok) {
          console.log("Results submitted successfully");
          setConsResults([]); // Clear table after submission
          setSuccessMessage(true);
        } else {
          console.error("Error submitting results");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
    if (partyResults.length > 0) {
      try {
        const response = await fetch("http://54.89.150.78:8800/result-submit-partylist", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(partyResults),
        });
  
        if (response.ok) {
          console.log("Results submitted successfully");
          setPartyResults([]); // Clear table after submission
          if (successMessage === false) {
            setSuccessMessage(true);
          }
        } else {
          console.error("Error submitting results");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
    
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Paper elevation={3} sx={{ p: 3, height: "400px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <Box textAlign="center" mb={3}>
              <Typography variant="h4" fontWeight="bold">
                Constituency Result Submission
              </Typography>
            </Box>
            {/* Pass consResults as a prop to ConsForm */}
            <ConsForm setResults={setConsResults} consResults={consResults} />
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper elevation={3} sx={{ p: 3, height: "400px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <Box textAlign="center" mb={3}>
              <Typography variant="h4" fontWeight="bold">
                Party List Result Submission
              </Typography>
            </Box>
            <PartyForm setPartyResults={setPartyResults} partyResults={partyResults} />
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Box textAlign="center">
            <Button variant="contained" color="primary" size="large" onClick={handleSubmission}>
              Submit All Results
            </Button>
          </Box>
        </Grid>

        {successMessage && (
          <Grid item xs={12}>
            <Alert severity="success">Results submitted successfully</Alert>
          </Grid>
        )}
      </Grid>
    </Container>
  );
}