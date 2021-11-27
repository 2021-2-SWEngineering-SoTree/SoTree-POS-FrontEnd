import React from 'react';
import styled from 'styled-components';
import SaleTr from './SaleTr';

const TableDiv = styled.table`
    border-collapse : collapse;
    border : 5px solid #000000;
`;

const SaleTable = ({arr, width, height}) => {
    
    return (
        <>
        <TableDiv style={{width:width, height:height}}>
        {Array(7).fill().map((data,i)=> 
                <SaleTr arr={arr} rowIndex={i}/>
                )}
        </TableDiv> 
        </>
    );
};

export default SaleTable;