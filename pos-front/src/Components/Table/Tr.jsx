import React from 'react';
import Td from './Td';

const Tr = ({rowIndex}) => {
    return (
        <tr>
            {Array(7).fill().map((td, i)=>
            <Td rowIndex={rowIndex}
                cellIndex={i}
                />
            )}
        </tr>
    );
};

export default Tr;