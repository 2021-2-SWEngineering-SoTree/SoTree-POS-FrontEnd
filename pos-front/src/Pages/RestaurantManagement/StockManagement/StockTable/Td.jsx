import React, {memo, useEffect, useState} from 'react';
import styled from 'styled-components';

const StockCell = styled.td`
    width : 14%;
    height : 11vh;
    border : 1px solid #000000;
`;

const Stock = styled.button`
    width:100%;
    height:100%;
    background-color:#ffffff;
    border : 0px;
    &:focus {
    background: #7D7272;
    }
`;

const Td =  memo(({rowIndex, cellIndex, stock, clickedIndex}) => {
    
    let index = rowIndex*7 + cellIndex;

    const stockCellOnClickHandler = (e) => {
        e.preventDefault();
        console.log("Click Stock Cell : ", index);
        clickedIndex(index);
    };


    return (
        <StockCell id = {rowIndex*7 + cellIndex+1} onClick = {(e)=>stockCellOnClickHandler(e)}>
            <Stock>
                <div id = {rowIndex*7 + cellIndex+1} style={{display: 'flex', flexDirection:'column'}}>
                    <div id = {rowIndex*7 + cellIndex+1} style={{marginBottom : '1.3rem'}}>
                        <b id = {rowIndex*7 + cellIndex+1}>{rowIndex*7 + cellIndex+1 > stock.length ? null : stock[rowIndex*7 + cellIndex].stockName}</b>
                    </div>
                    <div id = {rowIndex*7 + cellIndex+1}>
                    {rowIndex*7 + cellIndex+1 > stock.length ? null : stock[rowIndex*7 + cellIndex].quantity + "인분"}
                    </div>
                </div>
            </Stock>
        </StockCell>
    );

});

export default Td;