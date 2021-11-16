import {React, memo} from 'react';
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
    return (
        <Table>
            {Array(Math.sqrt(size)).fill().map((tr, i) => <Tr rowIndex={i} size={size} tableData={tableData}/>)}
        </Table>
    );
});

export default SeatTable;