import React from "react";
import { Card, CardContent, Typography, Box, LinearProgress } from '@mui/material';


const PartyListRank = ({ data }) => {
    return (
      <Card variant="outlined" sx={{ mb: 2, borderRadius: '12px', display: 'flex', alignItems: 'stretch', overflow: 'hidden' }}>
        <Box sx={{ width: 60, height: 'auto', bgcolor: data.barColor, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '8px 0 0 8px', color: '#fff' }}>
          <Typography variant="h6">{data.id}</Typography>
        </Box>
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography variant="h6">{data.partyName}</Typography>
          <Typography variant="body2">{`${data.votes} votes`}</Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 1 }}>
            <Typography variant="body2">District {data.district}</Typography>
            <Typography variant="body2">Raichue {data.raichue}</Typography>
            <Typography variant="body2">Seat {data.seat}</Typography>
          </Box>
          <LinearProgress variant="determinate" value={data.progress} sx={{ mt: 1, height: 10, borderRadius: 5, bgcolor: '#e0e0e0', '& .MuiLinearProgress-bar': { bgcolor: data.barColor } }} />
        </CardContent>
      </Card>
    );
  };
  
  export default PartyListRank;