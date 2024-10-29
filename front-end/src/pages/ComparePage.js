import { useEffect, useState } from "react";
import { Box, Container, Typography } from "@mui/material";
import PartyListRank from "../components/PartyListRank";
import { fetchDataFromS3 } from "../s3Fetch";

export default function ComparePage() {
  const [data50, setData50] = useState([]);
  const [data54, setData54] = useState([]);
  const [data62, setData62] = useState([]);

  useEffect(() => {
    const fetchElectionData = async () => {
      try {
        const [result50, result54, result62] = await Promise.all([
          fetchDataFromS3("historical-data/2550/result_50.json"),
          fetchDataFromS3("historical-data/2554/result_54.json"),
          fetchDataFromS3("historical-data/2562/result_62.json"),
        ]);

        const updateData = (data) => data.map((party) => ({
          ...party,
          color_code: party.color_code ? `#${party.color_code}` : "#000000",
          total_seat: party.total_seat ?? 0,
        }))
        .sort((a, b) => b.total_seat - a.total_seat);

        setData50(updateData(result50 || []));
        setData54(updateData(result54 || []));
        setData62(updateData(result62 || []));
      } catch (error) {
        console.error("Error loading data:", error);
      }
    };

    fetchElectionData();
  }, []);

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        pt: 6,
        width: "100vw",
      }}
    >
      <ElectionYearBox title="2550" data={data50} primeMinister="Yingluck Shinawatra" partyColor="#ED2728" bgColor="#F5F5F5" boxColor="#FFFFFF" />
      <ElectionYearBox title="2554" data={data54} primeMinister="Prayut Chan-O-cha" partyColor="#235DB5" bgColor="#FFFFFF" boxColor="#F5F5F5" />
      <ElectionYearBox title="2562" data={data62} primeMinister="Prayut Chan-O-cha" partyColor="#235DB5" bgColor="#F5F5F5" boxColor="#FFFFFF" />
    </Container>
  );
}

function ElectionYearBox({ title, data, primeMinister, partyColor, bgColor, boxColor }) {
  return (
    <Box
      sx={{
        background: bgColor,
        display: "flex",
        flexDirection: "column",
        borderRadius: "10px",
        pt: 3,
        px: 3,
        height: "75vh",
      }}
    >
      <Box sx={{ background: boxColor, borderRadius: "10px", px: 15, py: 1.5, textAlign: "center" }}>
        <Typography variant="h6" fontWeight={"bold"}>{title}</Typography>
      </Box>
      <Box sx={{ mt: 2, maxHeight: 500, overflowY: "auto" }}>
        {data.map((party, index) => (
          <PartyListRank key={party.id} data={party} rank={index + 1} />
        ))}
      </Box>
      <Box sx={{ background: boxColor, borderRadius: "10px", mt: 4, mb: 2, pl: 2, display: "flex", justifyContent: "space-between", gap: 1.5 }}>
        <Typography sx={{ width: "70px", whiteSpace: "pre-wrap", textAlign: "center", py: 0.5 }}>Prime Minister</Typography>
        <Box sx={{ background: partyColor, borderRadius: "10px", py: 0.5, display: "flex", justifyContent: "center", alignItems: "center", width: "100%" }}>
          <Typography color="white">{primeMinister}</Typography>
        </Box>
      </Box>
    </Box>
  );
}
