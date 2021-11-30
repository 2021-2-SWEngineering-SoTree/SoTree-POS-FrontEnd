import React, {useEffect} from 'react';
import Td from './Td'
const Tr = ({rowIndex, size, tableData}) => {

    
    let t= parseInt(Math.sqrt(size));

    if((rowIndex+1)*parseInt(Math.sqrt(size)) > size){
        t = size - rowIndex*parseInt(Math.sqrt(size));
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