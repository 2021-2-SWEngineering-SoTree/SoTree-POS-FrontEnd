import React from 'react';
import styled from 'styled-components';
import SmallTr from './SmallTr';

const TableDiv = styled.table`
    border-collapse : collapse;
    border : 5px solid #000000;
`;

const SmallTable = ({menu, getIndex, width, height}) => {
    
    return (
        <>
        <TableDiv style={{width:width, height:height}}>
        {Array(7).fill().map((data,i)=> 
                <SmallTr menu={menu} rowIndex={i} getIndex={getIndex} />
                )}
        </TableDiv> 
        </>
    );
};

export default SmallTable;