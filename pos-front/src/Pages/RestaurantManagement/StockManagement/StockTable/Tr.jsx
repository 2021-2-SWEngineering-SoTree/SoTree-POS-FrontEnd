import React from 'react';
import Td from './Td';

const Tr = ({rowIndex, stock, clickedIndex}) => {
    return (
        <tr>
            {Array(7).fill(undefined, undefined, undefined).map((td, i)=>
                <Td key={i} rowIndex={rowIndex}
                    cellIndex={i}
                    stock={stock}
                    clickedIndex={clickedIndex}
                />
            )}
        </tr>
    );
};

export default Tr;