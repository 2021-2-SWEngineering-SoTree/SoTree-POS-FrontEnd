import {React, memo} from 'react';
import Tr from './Tr';
import styled from 'styled-components';

const Table = styled.table`
    border-collapse : collapse;
    width: 100%;
    height : 100%;
    border : 5px solid #000000;
`;

const SeatTable = memo(({size}) => {
    return (
        <Table>
            {Array(Math.sqrt(size)).fill().map((tr, i) => <Tr rowIndex={i} size={size}/>)}
        </Table>
    );
});

export default SeatTable;