import { useEffect, useState } from "react";
import { Box, Container } from "@mui/material";
import PartyListRank from "../components/PartyListRank";
import Province from '../components/Map';

export default function LandingPage() {
  const [provinceData, setProvinceData] = useState([]);
  const [dataPartyListRank, setDataPartyListRank] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [partyResponse, provinceResponse] = await Promise.all([
          fetch("http://localhost:8800/get-party-rank"),
          fetch("http://localhost:8800/get-max-vote-district")
        ]);
  
        const partyData = await partyResponse.json();
        const updatedPartyData = partyData.map((party) => ({
          ...party,
          color_code: party.color_code ? `#${party.color_code}` : "#000000",
          total_seat: party.total_seat ?? 0,
        }));
  
        const provinceData = await provinceResponse.json();
  
        setDataPartyListRank(updatedPartyData);
        setProvinceData(provinceData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    fetchData();
  }, []);
  

  return (
    <Box sx={{ display: "flex", flexDirection: "row", pt: 4 }}>
      <Container maxWidth="lg" sx={{background: "pink" }}>
          <Province data={provinceData} />
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
