import {React, memo, useState, useEffect} from 'react';
import Tr from './Tr';
import styled from 'styled-components';

const Table = styled.table`
    border-collapse : collapse;
    width: 100%;
    height : 100%;
    border : 5px solid #000000;
    table-layout : fixed;
    word-break : break-all;
`;

const SeatTable = memo(({size, tableData}) => {

    useEffect(()=>{
        console.log("size : "+size);
        console.log("sqrt : "+parseInt(Math.sqrt(20)));
    },[])

    let t = parseInt(Math.sqrt(size));
    if(size%parseInt(Math.sqrt(size))!=0) t++;

    return (
        <Table>
            {Array(parseInt(t)).fill().map((tr, i) => <Tr rowIndex={i} size={size} tableData={tableData}/>)}
        </Table>
    );
});

export default SeatTable;