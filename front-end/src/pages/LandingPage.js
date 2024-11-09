import React, { useEffect, useState } from 'react';
import Province from '../components/Map';

const LandingPage = () => {
    const [provinceData, setProvinceData] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8800/get-max-vote-district")
            .then((response) => response.json())
            .then((data) => {
                setProvinceData(data);
            })
            .catch((error) => console.error("Error fetching data:", error));
    }, []);

    return (
        <div>
            <Province data={provinceData} />
        </div>
    );
};

export default LandingPage;