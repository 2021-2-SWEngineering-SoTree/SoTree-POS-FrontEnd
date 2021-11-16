import React from 'react';
import Td from './Td'
const Tr = ({rowIndex, size, tableData}) => {
    return (
        <tr>
            {Array(Math.sqrt(size)).fill().map((td, i) =>
            <Td rowIndex={rowIndex} cellIndex={i} size={size} tableData={tableData} top={"-2rem"} />
            )}
        </tr>
    );
};

export default Tr;