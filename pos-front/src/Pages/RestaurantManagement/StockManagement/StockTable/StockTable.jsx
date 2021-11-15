import React from 'react';
import styled from 'styled-components';
import Tr from './Tr';

const TableDiv = styled.table`
  width : 100%;
  border-collapse : collapse;
  height : 100%;
  border : 5px solid #000000;
`;


const Table = ({stock, clickedIndex}) => {

    return (
        <TableDiv>
            <tbody>
            {Array(7).fill(undefined, undefined, undefined).map((tr,i)=>
                <Tr key={i} rowIndex={i} stock={stock} clickedIndex={clickedIndex}/>
            )}
            </tbody>
        </TableDiv>
    );
};

export default Table;