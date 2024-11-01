import React, { useEffect, useState } from 'react';
import District from './District';
import MockData from '../fileField/MockData.csv';
import './Map.css';

const partyColorMap = {
    "ก้าวไกล": "#F47931",
    "เพื่อไทย": "#E93196",
    "เพื่อไทย": "#ED2728",
    "ภูมิใจไทย": "#232AC9",
    "พลังประชารัฐ": "#235DB5",
    "รวมไทยสร้างชาติ": "#4F64EA",
    "ประชาธิปัตย์": "#23A0DE",
    "ชาติไทยพัฒนา": "#E93196",
    "ประชาชาติ": "#A56F06",
    "ไทยสร้างไทย": "#001B95",
    "เพื่อไทรวมพลัง": "#3E528D",
    "ชาติพัฒนากล้า": "#F9B539",
    "เสรีรวมไทย": "#CAA110",
};

const ProvinceComponent = ({ provinceName, districts, colors, layout }) => (
    <div className={`province ${layout}`}>
        <h3>{provinceName}</h3>
        <div className="districts">
            {districts.map((district, index) => (
                <District key={index} districtNumber={district} color={colors[index]} />
            ))}
        </div>
    </div>
);

const Province = () => {
    const [mockData, setMockData] = useState([]);

    useEffect(() => {
        fetch(MockData)
            .then(response => response.text())
            .then(text => {
                const lines = text.trim().split('\n');
                const headers = lines[0].split(',');

                const data = lines.slice(1).map(line => {
                    const values = line.split(',');
                    return headers.reduce((obj, header, index) => {
                        obj[header.trim()] = values[index].trim();
                        return obj;
                    }, {});
                });

                const transformedData = data.reduce((result, { Province, District, WinnerParty }) => {
                    let provinceEntry = result.find(item => item.provinceName === Province);
                    if (!provinceEntry) {
                        provinceEntry = {
                            provinceName: Province,
                            districts: [],
                            colors: [],
                            layout: ""
                        };
                        result.push(provinceEntry);
                    }
                    provinceEntry.districts.push(parseInt(District, 10));
                    provinceEntry.colors.push(partyColorMap[WinnerParty] || "grey");

                    const districtCount = provinceEntry.districts.length;
                    if (districtCount === 1 || districtCount === 2) provinceEntry.layout = "one-two-district";
                    else if (districtCount === 3) provinceEntry.layout = "three-district";
                    else if ([4, 8, 9, 10, 11].includes(districtCount)) provinceEntry.layout = "four-eight-nine-ten-eleven-district";
                    else if ([5, 6, 7, 16].includes(districtCount)) provinceEntry.layout = "five-six-seven-sixteen-district";
                    else if (districtCount === 33) provinceEntry.layout = "thirtythree-district";

                    return result;
                }, []);

                setMockData(transformedData);
            })
            .catch(error => console.error("Error loading CSV:", error));
    }, []);

    const ranges = [
        mockData.slice(0, 16),
        mockData.slice(16, 36),
        mockData.slice(37, 58),
        mockData.slice(58, 62),
        mockData.slice(62,63),
        mockData.slice(63)
    ];

    return (
        <div className="map-container">
            {ranges.map((range, rangeIndex) => (
                <div key={rangeIndex} className={`province-range range-${rangeIndex + 1}`}>
                    {range.map((item, index) => (
                        <ProvinceComponent
                            key={index}
                            provinceName={item.provinceName}
                            districts={item.districts}
                            colors={item.colors}
                            layout={item.layout}
                        />
                    ))}
                </div>
            ))}
        </div>
    );
};

export default Province;