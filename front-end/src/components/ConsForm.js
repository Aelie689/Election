import * as React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { useUser } from "../context/UserContext";
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

export default function ConsForm({ setResults, consResults }) {
  const { loginUser } = useUser();
  const [provinces, setProvinces] = useState([]);
  const [province, setProvince] = useState(null);
  const [district, setDistrict] = useState("");
  const [number, setNumber] = useState("");
  const [vote, setVote] = useState("");
  const [distInfo, setDistInfo] = useState([]);

  const handleChangeProvince = (event) => {
    const selectedProvince = JSON.parse(event.target.value);
    setProvince(selectedProvince);
    setDistrict(""); // Reset district when province changes
    setNumber(""); // Reset number when province changes
  };

  const handleChangeDistrict = (event) => {
    setDistrict(event.target.value);
    setNumber(""); // Reset number when district changes
  };

  const handleAdd = async (event) => {
    event.preventDefault();

    // Find the matching record in distInfo
    const matchingRecord = distInfo.find(
      (item) =>
        item.province_id === province.id &&
        item.district === district &&
        item.number === number
    );

    if (!matchingRecord) {
      console.error("No matching record found in distInfo");
      return; // Exit if no match is found
    }

    // Extract candidate_id and party_id from the matching record
    const { candidate_id, party_id } = matchingRecord;

    // Create a new record with all required fields
    const newRecord = {
      province_id: province.id,
      province: province.name,
      district,
      number,
      vote,
      candidate_id,
      party_id,
    };

    // Update the items state and reset form
    setResults([...consResults, newRecord]);

    setProvince(null);
    setDistrict("");
    setNumber("");
    setVote("");
  };

  useEffect(() => {
    fetch("http://54.89.150.78:8800/dist-info")
      .then((response) => response.json())
      .then((data) => {
        console.log("District Info:", data);
        setDistInfo(data);
      })
      .catch((error) => console.log("Error fetching constituencies:", error));
  }, []);

  useEffect(() => {
    fetch("http://54.89.150.78:8800/province-name")
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

  // Filter districts based on selected province and ensure they are distinct
  const filteredDistricts = province
    ? Array.from(
        new Set(
          distInfo
            .filter((item) => item.province_id === province.id)
            .map((item) => item.district)
        )
      ).map((district) => ({ district }))
    : [];

  // Filter and order numbers based on selected province and district
  const filteredNumbers =
    province && district
      ? distInfo
          .filter(
            (item) =>
              item.province_id === province.id && item.district === district
          )
          .map((item) => item.number)
          .sort((a, b) => a - b) // Sort numbers in ascending order
      : [];

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
                <TableCell align="right">District</TableCell>
                <TableCell align="right">Number</TableCell>
                <TableCell align="right">Vote</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {consResults.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>{row.province}</TableCell>
                  <TableCell align="right">{row.district}</TableCell>
                  <TableCell align="right">{row.number}</TableCell>
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
              <Grid size={6}>
                <FormControl fullWidth required>
                  <InputLabel>District</InputLabel>
                  <Select
                    value={district}
                    label="District"
                    name="district"
                    onChange={handleChangeDistrict}
                    disabled={!province}
                  >
                    {filteredDistricts.map((item) => (
                      <MenuItem key={item.id} value={item.district}>
                        {item.district}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid size={6}>
                <FormControl fullWidth required>
                  <InputLabel>Number</InputLabel>
                  <Select
                    value={number}
                    label="Number"
                    name="number"
                    onChange={(e) => setNumber(e.target.value)}
                    disabled={!district}
                  >
                    {filteredNumbers.map((num, index) => (
                      <MenuItem key={index} value={num}>
                        {num}
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
