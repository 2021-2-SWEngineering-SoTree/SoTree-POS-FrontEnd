import React from 'react';
import Td from './Td'
const Tr = ({rowIndex, size}) => {
    return (
        <tr>
            {Array(Math.sqrt(size)).fill().map((td, i) =>
            <Td rowIndex={rowIndex} cellIndex={i+1} size={size} />
            )}
        </tr>
    );
};

export default Tr;