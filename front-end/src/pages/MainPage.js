import { useEffect, useState } from "react";
import { Box, Container } from "@mui/material";
import PartyListRank from "../components/PartyListRank";
import Map from "../components/Map";

export default function MainPage() {
  const [dataPartyListRank, setDataPartyListRank] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8800/get-party-rank")
      .then((response) => response.json())
      .then((data) => {
        const updatedData = data.map((party) => ({
          ...party,
          color_code: party.color_code ? `#${party.color_code}` : "#000000", // Add # if color_code exists, otherwise default
          total_seat: party.total_seat ?? 0, // Set default total_seat to 0 if null or undefined
        }));
        setDataPartyListRank(updatedData);
      })
      .catch((error) => {
        console.log("Error fetching data:", error);
      });
  }, []);

  return (
    <Box sx={{ display: "flex", flexDirection: "row", pt: 4 }}>
      <Container maxWidth="lg" sx={{background: "pink" }}>
        <Map />
      </Container>

      <Container
        maxWidth="lg"
        sx={{
          pt: 4,
          background: "blue",
          maxHeight: 700, // Set maximum height
          overflowY: "auto", // Enable vertical scrolling
        }}
      >
        {dataPartyListRank.map((party, index) => (
          <PartyListRank key={party.id} data={party} rank={index + 1} />
        ))}
      </Container>
    </Box>
  );
}
