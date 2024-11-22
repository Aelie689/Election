import * as React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import { useAuth } from "../context/AuthContext";
import Grid from "@mui/material/Grid2";
import FormControl from "@mui/material/FormControl";
import {
  Table,
  TableContainer,
  TableBody,
  TableCell,
  TableRow,
  TableHead,
  Paper,
  Button,
  InputLabel,
  Select,
  MenuItem,
  TextField,
} from "@mui/material";
import { useEffect } from "react";

export default function PartyForm({ setPartyResults, partyResults}) {
  const { loginUser } = useUser();
  const [provinces, setProvinces] = useState([]);
  const [province, setProvince] = useState(null);
  const [parties, setParties] = useState([]);
  const [party, setParty] = useState(null);
  const [vote, setVote] = useState("");

  const handleChangeProvince = (event) => {
    const selectedProvince = JSON.parse(event.target.value);
    setProvince(selectedProvince);
  };

  const handleChangeParty = (event) => {
    const selectedParty = JSON.parse(event.target.value);
    setParty(selectedParty);
  };

  const handleAdd = async (event) => {
    event.preventDefault();

    const newRecord = {
      province_id: province.id,
      province: province.name,
      party_id: party.id,
      party: party.name,
      vote,
    };

    setPartyResults([...partyResults, newRecord]);

    setProvince(null);
    setParty(null);
    setVote("");
  };

  useEffect(() => {
    console.log(partyResults);
  }, [partyResults]);
    
  useEffect(() => {
    fetch("http://g01-LBC-1208421005.us-east-1.elb.amazonaws.com:8800/party-name")
      .then((response) => response.json())
      .then((data) => {
        const sortedParties = data.sort((a, b) =>
          a.name.localeCompare(b.name, "th")
      );
      setParties(sortedParties);
    })
      .catch((error) => console.log("Error fetching results:", error));
  }, []);

  useEffect(() => {
    fetch("http://g01-LBC-1208421005.us-east-1.elb.amazonaws.com:8800/province-name")
      .then((response) => response.json())
      .then((data) => {
        // Sort provinces by Thai alphabetical order
        const sortedProvinces = data.sort((a, b) =>
          a.name.localeCompare(b.name, "th")
        );
        setProvinces(sortedProvinces);
      })
      .catch((error) => console.log("Error fetching provinces:", error));
  }, []);

  return (
    <Box sx={{ display: "flex", flexDirection: "row" }}>
      <Container maxWidth="lg" sx={{ padding: 1, mt: 2 }}>
        <TableContainer
          component={Paper}
          sx={{ maxHeight: "300px", overflowY: "auto" }}
        >
          <Table stickyHeader sx={{ minWidth: 650 }} aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell>Province</TableCell>
                <TableCell align="right">Party</TableCell>
                <TableCell align="right">Vote</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {partyResults.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>{row.province}</TableCell>
                  <TableCell align="right">{row.party}</TableCell>
                  <TableCell align="right">{row.vote}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>

      <Container maxWidth="lg" sx={{ pt: 4 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box component="form" noValidate onSubmit={handleAdd}>
            <Grid container spacing={2}>
              <Grid size={12}>
                <FormControl fullWidth required>
                  <InputLabel>Province</InputLabel>
                  <Select
                    value={province ? JSON.stringify(province) : ""}
                    label="Province"
                    name="province"
                    onChange={handleChangeProvince}
                  >
                    {provinces.map((item) => (
                      <MenuItem key={item.id} value={JSON.stringify(item)}>
                        {item.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid size={12}>
                <FormControl fullWidth required>
                  <InputLabel>Party</InputLabel>
                  <Select
                    value={party ? JSON.stringify(party) : ""}
                    label="Party"
                    name="Party"
                    onChange={handleChangeParty}
                  >
                    {parties.map((item) => (
                      <MenuItem key={item.id} value={JSON.stringify(item)}>
                        {item.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid size={12}>
                <TextField
                  required
                  fullWidth
                  type="number"
                  label="Vote"
                  value={vote}
                  onChange={(e) => setVote(e.target.value)}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 5, mb: 2, height: 50 }}
            >
              Add
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
