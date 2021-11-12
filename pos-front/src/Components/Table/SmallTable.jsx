import React from 'react';
import styled from 'styled-components';
import SmallTr from './SmallTr';

const TableDiv = styled.table`
    width : 78rem;
    border-collapse : collapse;
    height : 35rem;
    border : 5px solid #000000;
`;

const SmallTable = ({menu, getIndex}) => {
    
    return (
        <>
        <TableDiv>
        {Array(7).fill().map((data,i)=> 
                <SmallTr menu={menu} rowIndex={i} getIndex={getIndex} />
                )}
        </TableDiv> 
        </>
    );
};

export default SmallTable;