import React, { useEffect, useState } from 'react';
import District from './District';
import './Map.css';

const ProvinceComponent = ({ provinceName, districts, colors, layout }) => (
    <div className={`province ${layout}`}>
        <h3 className='province-name'>{provinceName}</h3>
        <div className="districts">
            {districts.map((district, index) => (
                <District key={index} districtNumber={district} color={colors[index]} />
            ))}
        </div>
    </div>
);

const Province = ({ data, partyColors }) => {
    
    const customProvinceOrder = [
        "แม่ฮ่องสอน", "เชียงใหม่", "เชียงราย", "พะเยา", "น่าน", "ลำปาง", "แพร่","อุตรดิตถ์", "ลำพูน", "สุโขทัย",
        "กำแพงเพชร", "พิจิตร", "พิษณุโลก", "ตาก", "นครสวรรค์", "เพชรบูรณ์", "เลย","หนองคาย", "อุดรธานี", "บึงกาฬ",
        "นครพนม", "หนองบัวลำภู", "ขอนแก่น", "สกลนคร", "มุกดาหาร", "ชัยภูมิ", "กาฬสินธุ์","อำนาจเจริญ", "ยโสธร", "นครราชสีมา",
        "มหาสารคาม", "ร้อยเอ็ด", "อุบลราชธานี", "บุรีรัมย์", "สุรินทร์", "ศรีสะเกษ", "อุทัยธานี","ชัยนาท", "ลพบุรี", "สิงห์บุรี",
        "นครนายก", "ปราจีนบุรี", "สระแก้ว", "กาญจนบุรี", "อ่างทอง","สระบุรี", "สุพรรณบุรี", "พระนครศรีอยุธยา", "ปทุมธานี", "ฉะเชิงเทรา",
        "จันทบุรี", "นครปฐม", "นนทบุรี", "สมุทรสาคร", "สมุทรปราการ","ชลบุรี", "ระยอง", "ตราด", "ราชบุรี", "สมุทรสงคราม",
        "เพชรบุรี", "ประจวบคีรีขันธ์", "กรุงเทพมหานคร", "ระนอง", "ชุมพร","นครศรีธรรมราช", "พัทลุง","สงขลา", "ยะลา", "ปัตตานี",
        "พังงา", "สุราษฎร์ธานี", "ภูเก็ต", "กระบี่", "ตรัง","สตูล", "นราธิวาส"
    ];

    const transformedData = data.reduce((result, { province_name, district, party_name }) => {
        let provinceEntry = result.find(item => item.provinceName === province_name);
        if (!provinceEntry) {
            provinceEntry = { provinceName: province_name, districts: [], colors: [], layout: "" };
            result.push(provinceEntry);
        }
        provinceEntry.districts.push(district);
        provinceEntry.colors.push(partyColors[party_name] || "black");

        const districtCount = provinceEntry.districts.length;
        if (districtCount === 1 || districtCount === 2) provinceEntry.layout = "one-two-district";
        else if (districtCount === 3) provinceEntry.layout = "three-district";
        else if ([4, 8, 9, 10, 11, 12].includes(districtCount)) provinceEntry.layout = "four-eight-nine-ten-eleven-twelve-district";
        else if ([5, 6, 7, 14, 15, 16].includes(districtCount)) provinceEntry.layout = "five-six-seven-fourteen-fifteen-sixteen-district";
        else if ([30, 33].includes(districtCount)) provinceEntry.layout = "thirty-thirtythree-district";
        else provinceEntry.layout = "five-six-seven-fourteen-fifteen-sixteen-district";

        return result;
    }, []);

    transformedData.sort((a, b) => {
        const indexA = customProvinceOrder.indexOf(a.provinceName);
        const indexB = customProvinceOrder.indexOf(b.provinceName);
        return indexA - indexB;
    });

    const ranges = [
        transformedData.slice(0, 16),
        transformedData.slice(16, 36),
        transformedData.slice(37, 58),
        transformedData.slice(58, 62),
        transformedData.slice(62,63),
        transformedData.slice(63)
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