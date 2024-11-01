import React from 'react'

const District = ({ districtNumber, color  }) => (
    <span className="circle" style={{ backgroundColor: color }}>{districtNumber}</span>
);

export default District