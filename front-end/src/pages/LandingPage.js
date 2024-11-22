import { useEffect, useState } from "react";
import { Box, Container } from "@mui/material";
import PartyListRank from "../components/PartyListRank";
import Province from "../components/Map";
import partyColors from  "../data/s3/party_color.json"

export default function LandingPage() {
  const [provinceData, setProvinceData] = useState([]);
  const [dataPartyListRank, setDataPartyListRank] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [partyResponse, provinceResponse] = await Promise.all([
          fetch("http://g01-LBC-1208421005.us-east-1.elb.amazonaws.com:8800/get-party-rank"),
          fetch("http://g01-LBC-1208421005.us-east-1.elb.amazonaws.com:8800/get-max-vote-district"),
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
    <Container
      sx={{
        display: "flex",
        flexDirection: "row",
        pt: 4,
        pb: 10,
        gap: 10,
        px: "48px!important",
      }}
    >
      <Container
          sx={{
            background: "#FCFCFC",
            maxHeight: "940",
            borderRadius: "20px",
            boxShadow: 3,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            px: "0!important"
          }}
        >
        <Province data={provinceData} partyColors={partyColors} />
      </Container>

      <Container
        sx={{
          background: "#FCFCFC",
          maxHeight: 940,
          overflowY: "auto",
          borderRadius: "20px",
          boxShadow: 3,
          py: "24px!important",
        }}
      >
        {dataPartyListRank.map((party, index) => (
          <PartyListRank key={party.id} data={party} rank={index + 1} />
        ))}
      </Container>
    </Container>
  );
}
