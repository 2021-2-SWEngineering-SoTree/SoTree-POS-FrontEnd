import React from 'react';
import Td from './Td'
const Tr = ({rowIndex, size, data}) => {
    return (
        <tr>
            {Array(Math.sqrt(size)).fill().map((td, i) =>
            <Td rowIndex={rowIndex} cellIndex={i+1} size={size} data ={data} />
            )}
        </tr>
    );
};

export default Tr;