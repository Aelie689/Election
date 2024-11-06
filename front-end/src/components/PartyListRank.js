import React from "react";
import { Card, CardContent, Typography, Box, LinearProgress } from '@mui/material';

const PartyListRank = ({ data, rank }) => {  // Add rank as a prop
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}> {/* Center the card */}
        <Card 
          variant="outlined" 
          sx={{ 
            borderRadius: '12px', 
            display: 'flex', 
            alignItems: 'stretch', 
            overflow: 'hidden', 
            width: 400 ,
            height: 120
          }}
        >
          <Box 
            sx={{ 
              width: 60, 
              height: 'auto', 
              bgcolor: data.color_code, 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              borderRadius: '8px 0 0 8px', 
              color: '#fff' 
            }}
          >
            <Typography variant="h5" sx={{ fontWeight: 'bold' }}>{rank}</Typography> {/* Display rank */}
          </Box>
          <CardContent sx={{ flexGrow: 1, px: 3, py: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>{data.party_name}</Typography>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '90px' }}>
                <Typography variant="h6" sx={{ mr: 0.5 }}>Seat</Typography>
                <Typography variant="h6" sx={{ fontWeight: 'bold', textAlign: 'right', minWidth: '30px' }}>{data.total_seat}</Typography>
              </Box>
            </Box>
            <Typography variant="body1">{`${data.total_vote.toLocaleString()} votes`}</Typography>
            <LinearProgress 
              variant="determinate" 
              value={(data.total_seat / 500) * 100} 
              sx={{ 
                mt: 1, 
                height: 18, 
                borderRadius: 5, 
                bgcolor: '#e0e0e0', 
                '& .MuiLinearProgress-bar': { bgcolor: data.color_code } 
              }} 
            />
          </CardContent>
        </Card>
      </Box>
    );
  };
  
export default PartyListRank;