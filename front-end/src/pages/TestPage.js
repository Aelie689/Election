//import Test from "../components/Test";

//test for party card component
import React from 'react';
import PartyCard from '../components/PartyListRank';
import { Container } from '@mui/material';

export default function TestPage() {
    const mockData = [
        { id: 1, partyName: 'Party Name', votes: 100000, seat: 100, district: 100, raichue: 100, progress: 60, barColor: '#FF5733' },
        { id: 2, partyName: 'Party Name', votes: 100000, seat: 100, district: 100, raichue: 100, progress: 70, barColor: '#FF0000' },
        { id: 3, partyName: 'Party Name', votes: 100000, seat: 100, district: 100, raichue: 100, progress: 80, barColor: '#0000FF' },
        { id: 4, partyName: 'Party Name', votes: 100000, seat: 100, district: 100, raichue: 100, progress: 50, barColor: '#3498DB' },
        { id: 5, partyName: 'Party Name', votes: 100000, seat: 100, district: 100, raichue: 100, progress: 30, barColor: '#9B59B6' },
      ];
    return (
        // <Test />
        <Container maxWidth="sm" sx={{ mt: 4 }}>
            {mockData.map((item) => (
                <PartyCard key={item.id} data={item} />
            ))}
            <div>Sawasdeekubpom</div>
        </Container>
    );
}