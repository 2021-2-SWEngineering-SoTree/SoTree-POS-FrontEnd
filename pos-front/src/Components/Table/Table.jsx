import React from 'react';
import styled from 'styled-components';
import Tr from './Tr';

const TableDiv = styled.table`
    width : 100%;
    border-collapse : collapse;
    height : 100%;
    border : 5px solid #000000;
`;

const Table = () => {
    return (
        <TableDiv>
            {Array(7).fill().map((tr,i)=> 
            <Tr rowIndex={i} />
            )}
        </TableDiv>
    );
};

export default Table;