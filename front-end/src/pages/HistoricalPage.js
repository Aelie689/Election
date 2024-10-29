import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Box, Button, Container, Typography } from "@mui/material";
import PartyListRank from "../components/PartyListRank";
import Province from "../components/Map";
import { fetchDataFromS3 } from "../s3Fetch"; 

// Define S3 keys for each year's data
const YEAR_DATA_KEYS = {
  50: {
    provinceData: "historical-data/2550/result_dist_50.json",
    partyListRankData: "historical-data/2550/result_50.json"
  },
  54: {
    provinceData: "historical-data/2554/result_dist_54.json",
    partyListRankData: "historical-data/2554/result_54.json"
  },
  62: {
    provinceData: "historical-data/2562/result_dist_62.json",
    partyListRankData: "historical-data/2562/result_62.json"
  }
};

export default function HistoricalPage() {
  const [year, setYear] = useState(62); // Initial year (2562)
  const [provinceData, setProvinceData] = useState([]);
  const [dataPartyListRank, setDataPartyListRank] = useState([]);

  // Function to load data based on selected year
  const loadDataByYear = async (selectedYear) => {
    const { provinceData: provinceKey, partyListRankData: partyKey } = YEAR_DATA_KEYS[selectedYear];

    try {
      const [provinceData, partyListRankData] = await Promise.all([
        fetchDataFromS3(provinceKey),
        fetchDataFromS3(partyKey)
      ]);

      setProvinceData(provinceData || []);
      setDataPartyListRank(
        (partyListRankData || [])
          .map((party) => ({
            ...party,
            color_code: party.color_code ? `#${party.color_code}` : "#000000",
            total_seat: party.total_seat ?? 0,
          }))
          .sort((a, b) => b.total_seat - a.total_seat)
      );
    } catch (error) {
      console.error("Error loading data:", error);
    }
  };

  // Update data when year changes
  useEffect(() => {
    loadDataByYear(year);
  }, [year]);

  return (
    <Container>
      <Container
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          pt: 6,
          px: "48px!important",
        }}
      >
        <Box sx={{ display: "flex", gap: 5 }}>
          {[50, 54, 62].map((y) => (
            <Button
              key={y}
              onClick={() => setYear(y)}
              sx={{
                background: year === y ? "#000000" : "#F5F5F5",
                color: year === y ? "#FFFFFF" : "#000000",
                fontWeight: "bold",
                fontSize: "20px",
                px: 8,
              }}
            >
              25{y}
            </Button>
          ))}
        </Box>
        <Button
          sx={{
            background: "#848484",
            fontWeight: "bold",
            fontSize: "20px",
            px: 10,
            color: "white",
          }}
        >
          <Link
            to="/compare-history"
            style={{ textDecoration: "none", color: "white" }}
          >
            Compare
          </Link>
        </Button>
      </Container>

      {/* Display content for the selected year */}
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
        <Container sx={{ px: "0!important" }}>
          <Province data={provinceData} />
        </Container>

        <Container
          sx={{
            background: "#FCFCFC",
            maxHeight: 840,
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
    </Container>
  );
}
