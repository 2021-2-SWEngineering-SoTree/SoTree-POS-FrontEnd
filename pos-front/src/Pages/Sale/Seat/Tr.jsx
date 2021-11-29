import React, {useEffect} from 'react';
import Td from './Td'
const Tr = ({rowIndex, size, tableData}) => {

    
    let t= 4;

    if((rowIndex+1)*4 > size){
        t = size - rowIndex*4;
    }

    return (
        <tr>
            {Array(t).fill().map((td, i) =>
            <Td rowIndex={rowIndex} cellIndex={i} size={size} tableData={tableData} top={"-2rem"} />
            )}
        </tr>
    );
};

export default Tr;